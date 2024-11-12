import React, { useState, useEffect } from "react";

export const Huellero = () => {
  const [asistencia, setAsistencia] = useState([]);
  const [registroActivo, setRegistroActivo] = useState(null);
  const id_huella = 1; // ID del estudiante simulado

  // Función para verificar si ya existe un registro activo
  const verificarRegistroActivo = async () => {
    try {
      const response = await fetch("http://localhost:5000/verificar_asistencia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id_huella }), // Enviamos el ID del estudiante
      });

      const data = await response.json();

      // Si hay un registro activo, lo almacenamos
      if (response.ok && data) {
        setRegistroActivo(data);
      } else {
        setRegistroActivo(null); // Si no hay un registro activo, seteamos null
      }
    } catch (error) {
      console.error("Error al verificar el registro activo:", error);
    }
  };

  // Efecto para verificar el estado de la asistencia cuando se monta el componente
  useEffect(() => {
    verificarRegistroActivo(); // Llamamos a la función para verificar el registro activo
  }, []);

  // Función para manejar el registro de asistencia (entrada o salida)
  const handleRegistroAsistencia = async () => {
    try {
      let response;
      if (registroActivo) {
        // Si ya hay un registro activo (entrada), registramos la salida
        const nuevaAsistencia = {
          id_huella,
          entrada: registroActivo.fecha_hora_entrada, // Conservamos la hora de entrada
          salida: new Date().toISOString(), // Registramos la hora de salida en formato ISO
        };

        // Enviar la solicitud POST para registrar la salida
        response = await fetch("http://localhost:5000/add_Asistencia", {
          method: "POST", // Asegúrate de usar el método POST
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nuevaAsistencia), // Convertimos los datos a JSON
        });

        // Procesamos la respuesta
        const data = await response.json();

        if (response.ok) {
          // Actualizamos el estado con la nueva salida
          setAsistencia((prevAsistencia) => [
            ...prevAsistencia.filter((reg) => reg.id_asistencia !== data.id_asistencia),
            data, // Añadimos la respuesta del backend con la salida
          ]);
          setRegistroActivo(null); // Reseteamos el estado de registro activo
        } else {
          console.error(data.message);
        }
      } else {
        // Si no hay un registro activo, registramos la entrada
        const nuevoRegistro = {
          id_huella, // Asociamos el ID del estudiante
          entrada: new Date().toISOString(), // Registramos la hora de entrada en formato ISO
        };

        // Enviar la solicitud POST para registrar la entrada
        response = await fetch("http://localhost:5000/add_Asistencia", {
          method: "POST", // Asegúrate de usar el método POST
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nuevoRegistro), // Convertimos los datos a JSON
        });

        // Procesamos la respuesta
        const data = await response.json();

        if (response.ok) {
          // Guardamos el registro de entrada
          setRegistroActivo(data); // Guardamos el registro de entrada
          setAsistencia((prevAsistencia) => [...prevAsistencia, data]);
        } else {
          console.error(data.message);
        }
      }
    } catch (error) {
      console.error("Error al registrar asistencia:", error);
    }
  };

  return (
    <div className="huellero-container flex flex-col items-center justify-center space-y-6 p-8">
      <h2 className="text-2xl font-semibold text-indigo-700">Registro de Asistencia</h2>

      {/* Área del huellero */}
      <div
        className="huellero-area w-64 h-64 bg-indigo-100 rounded-full flex items-center justify-center cursor-pointer border-4 border-indigo-600 shadow-xl transition-transform transform hover:scale-105"
        onClick={handleRegistroAsistencia}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          className="h-16 w-16 text-indigo-600"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* Mensaje de instrucción */}
      <p className="text-md text-gray-600">
        {registroActivo ? "Haz clic nuevamente para registrar la salida." : "Haz clic en el huellero para registrar tu entrada."}
      </p>

      {/* Lista de asistencia */}
      <div className="asistencia-list w-full max-w-md mt-6">
        <h3 className="font-semibold text-gray-700">Registros de Asistencia:</h3>
        <ul className="mt-4 space-y-2">
          {asistencia.map((registro) => (
            <li key={registro.id_asistencia} className="flex justify-between text-sm text-gray-600 border-b pb-2">
              <span>
                <strong>Entrada:</strong> {new Date(registro.fecha_hora_entrada).toLocaleString()}
              </span>
              {registro.fecha_hora_salida && (
                <span>
                  <strong>Salida:</strong> {new Date(registro.fecha_hora_salida).toLocaleString()}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
