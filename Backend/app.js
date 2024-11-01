const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Ruta para la raíz
app.get('/', (req, res) => {
    res.send('Bienvenido a la API del backend!');
});

// Rutas de la API
app.get('/api', (req, res) => {
    res.json({ message: 'Hola desde el backend!' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
