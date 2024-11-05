import React from "react";

const Listado = () => {
  return (
    <section
      className="container p-4 mx-auto flex flex-col"
      style={{ minHeight: "87vh" }}
    >
      <div className="p-8 rounded-lg shadow-lg w-full mx-auto ">
        <div>
          <div className="flex flex-col items-center gap-y-4 sm:flex-row sm:justify-between sm:items-start">
            <div className="flex flex-col justify-center items-start">
              <div className="flex flex-row items-center gap-x-3">
                <h2 className=" font-medium py-2 text-xl font-medium font-serif font-bold text-blue">
                  Estuadiantes Registrados
                </h2>
              </div>
            </div>

            <div className="w-80">
              <div className="flex items-center">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 mx-3 text-blue "
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </span>

                <input
                  type="text"
                  placeholder="Busqueda por Nombre"
                  className="w-full py-2.5 text-gray-700 placeholder-gray-400/70 bg-white border border-blue rounded-lg pl-11 pr-5  focus:border-DarkSlate focus:ring-emerald-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between flex-1">
            <div className="flex flex-col mt-6">
              <div className="-mx-4 -my-2 overflow-x-auto ">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-blue dark:border-blue md:rounded-lg bg-blue">
                    <table className="min-w-full divide-y divide-blue dark:divide-blue">
                      <thead className="bg-DarkSlate dark:bg-gray-800">
                        <tr>
                          <th
                            scope="col"
                            className="px-3 py-3.5 text-sm font-normal text-left rtl:text-right text-white "
                          >
                            <div className="flex justify-center items-center gap-x-3 ">
                              <button>
                                <span>Nombre Completo</span>
                              </button>
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-white"
                          >
                            <div className="flex justify-center items-center gap-x-3">
                              <button>
                                <span> Nº Cédula</span>
                              </button>
                            </div>
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-3 text-sm font-normal text-left rtl:text-right text-white"
                          >
                            <div className="flex justify-center items-center gap-x-2">
                              <button>
                                <span>Fecha y Hora Entrada</span>
                              </button>
                            </div>
                          </th>

                          <th
                            scope="col"
                            className="px-6 py-4 text-sm font-normal text-left rtl:text-right text-white "
                          >
                            <div className="flex justify-center items-center gap-x-2">
                              <button>
                                <span> Fecha y Hora Salida</span>
                              </button>
                            </div>
                          </th>

                          <th
                            scope="col"
                            className="px-6 py-4 text-sm font-normal text-left rtl:text-right text-white"
                          >
                            <div className="flex justify-center items-center gap-x-2">
                              <button>
                                <span>Programas</span>
                              </button>
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-4 text-sm font-normal text-left rtl:text-right text-white"
                          >
                            <div className="flex justify-center items-center gap-x-2">
                              <button>
                                <span>Fecha Inicio</span>
                              </button>
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-4 text-sm font-normal text-left rtl:text-right text-white"
                          >
                            <div className="flex justify-center items-center gap-x-2">
                              <button>
                                <span>Fecha Final</span>
                              </button>
                            </div>
                          </th>

                          <th
                            scope="col"
                            className="px-4 py-4 text-sm font-normal text-left rtl:text-right text-white"
                          >
                            <div className="flex justify-center items-center gap-x-2">
                              <button>
                                <span>Acción</span>
                              </button>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-blue dark:divide-blue dark:bg-blue">
                        <React.Fragment>
                          <tr>
                            <td className="px-12 py-4 text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                              <div class="flex flex-col justify-center items-center gap-x-2">
                                <span>Luna Bedoya Cuenca</span>
                              </div>
                            </td>

                            <td className="px-12 py-4 text-sm text-gray-500 dark:text-gray-200 whitespace-nowrap">
                              <div className="w-full inline-flex justify-center items-center gap-x-3">
                                <span>1113979779</span>
                              </div>
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-200 whitespace-nowrap">
                              <div className="w-full inline-flex justify-center items-center gap-x-3">
                                <span>07:00 a.m 05-11-2024</span>
                              </div>
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-200 whitespace-nowrap">
                              <div className="w-full inline-flex justify-center items-center gap-x-3">
                                <span>0:00 p.m 05-11-2024</span>
                              </div>
                            </td>

                            <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              <div className="w-full inline-flex justify-center items-center gap-x-3">
                                <span>Sistemas</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              <div className="w-full inline-flex justify-center items-center gap-x-3">
                                <span>24-10-2024</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              <div className="w-full inline-flex justify-center items-center gap-x-3">
                                <span>22-02-2025</span>
                              </div>
                            </td>

                            <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              <div className="w-full inline-flex justify-center items-center gap-x-3">
                                <div className="flex justify-center items-center px-3 py-1 rounded-full gap-x-2 ">
                                  <button>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="size-5"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                      />
                                    </svg>
                                  </button>
                                  <button>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="size-5"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-12 py-4 text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                              <div class="flex flex-col justify-center items-center gap-x-2">
                                <span>Luna Bedoya Cuenca</span>
                              </div>
                            </td>

                            <td className="px-12 py-4 text-sm text-gray-500 dark:text-gray-200 whitespace-nowrap">
                              <div className="w-full inline-flex justify-center items-center gap-x-3">
                                <span>1113979779</span>
                              </div>
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-200 whitespace-nowrap">
                              <div className="w-full inline-flex justify-center items-center gap-x-3">
                                <span>07:00 a.m 05-11-2024</span>
                              </div>
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-200 whitespace-nowrap">
                              <div className="w-full inline-flex justify-center items-center gap-x-3">
                                <span>0:00 p.m 05-11-2024</span>
                              </div>
                            </td>

                            <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              <div className="w-full inline-flex justify-center items-center gap-x-3">
                                <span>Sistemas</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              <div className="w-full inline-flex justify-center items-center gap-x-3">
                                <span>24-10-2024</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              <div className="w-full inline-flex justify-center items-center gap-x-3">
                                <span>22-02-2025</span>
                              </div>
                            </td>

                            <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              <div className="w-full inline-flex justify-center items-center gap-x-3">
                                <div className="flex justify-center items-center px-3 py-1 rounded-full gap-x-2 ">
                                  <button>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="size-5"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                      />
                                    </svg>
                                  </button>
                                  <button>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="size-5"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td className="px-12 py-4 text-sm font-medium text-gray-700 dark:text-gray-300 whitespace-nowrap">
                              <div class="flex flex-col justify-center items-center gap-x-2">
                                <span>Luna Bedoya Cuenca</span>
                              </div>
                            </td>

                            <td className="px-12 py-4 text-sm text-gray-500 dark:text-gray-200 whitespace-nowrap">
                              <div className="w-full inline-flex justify-center items-center gap-x-3">
                                <span>1113979779</span>
                              </div>
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-200 whitespace-nowrap">
                              <div className="w-full inline-flex justify-center items-center gap-x-3">
                                <span>07:00 a.m 05-11-2024</span>
                              </div>
                            </td>

                            <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-200 whitespace-nowrap">
                              <div className="w-full inline-flex justify-center items-center gap-x-3">
                                <span>0:00 p.m 05-11-2024</span>
                              </div>
                            </td>

                            <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              <div className="w-full inline-flex justify-center items-center gap-x-3">
                                <span>Sistemas</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              <div className="w-full inline-flex justify-center items-center gap-x-3">
                                <span>24-10-2024</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              <div className="w-full inline-flex justify-center items-center gap-x-3">
                                <span>22-02-2025</span>
                              </div>
                            </td>

                            <td className="px-6 py-4 text-sm font-medium text-gray-700 dark:text-gray-200 whitespace-nowrap">
                              <div className="w-full inline-flex justify-center items-center gap-x-3">
                                <div className="flex justify-center items-center px-3 py-1 rounded-full gap-x-2 ">
                                  <button>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="size-5"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                      />
                                    </svg>
                                  </button>
                                  <button>
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      strokeWidth={1.5}
                                      stroke="currentColor"
                                      className="size-5"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                            </td>
                          </tr>
                        </React.Fragment>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Listado;
