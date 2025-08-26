import { useState } from "react";
import Layout from "../Layouts/Layout";

export default function CatalogoInstituciones() {
  // Datos de ejemplo (reemplazar con datos reales de la API después)
  const [instituciones] = useState([
    {
      id: 1,
      nombre: "UBR de Tepexi de Rodríguez",
      logo: "https://res.cloudinary.com/dmx716lyu/image/upload/v1755650879/ubr-tepexi_t61ujd.png",
      descripcion:
        "La UBR Tepexi de Rodríguez es una área asignada para la rehabilitación biopsicosocial, con el objetivo principal de brindar a los usuarios una atención con personal capacitado para una rehabilitación total o parcial, con un trato digno y humano.",
      numero: "No disponible",
      correo: "No disponible",
      ubicacion:
        "Av. Tecnológico 15, San Sebastián, 74690 Tepexi de Rodríguez, Pue.",
      calificacion: 5.0,
      opiniones: 3,
    },
    // Se pueden agregar más instituciones aquí
  ]);

  return (
    <Layout>
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Catálogo de Instituciones
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Encuentra instituciones especializadas en el tratamiento y apoyo
              de la dislexia
            </p>
          </div>

          {/* Catálogo de Instituciones */}
          <div className="space-y-8">
            {instituciones.length > 0 ? (
              instituciones.map((institucion) => (
                <div
                  key={institucion.id}
                  className="bg-white overflow-hidden"
                >
                  <div className="p-8">
                    <div className="flex flex-col lg:flex-row gap-8">
                      <div className="lg:w-1/4 text-center">
                        <div className="rounded-2xl p-6">
                          <h3 className="text-xl font-bold  mb-4">
                            {institucion.nombre}
                          </h3>
                          <img
                            src={institucion.logo}
                            alt={`Logo ${institucion.nombre}`}
                            className="w-32 h-32 object-contain mx-auto mb-4 rounded-lg"
                          />
                        </div>
                      </div>

                      {/* Información y Contacto */}
                      <div className="lg:w-2/4">
                        <div className="mb-6">
                          <h4 className="text-lg font-semibold mb-3">
                            Información
                          </h4>
                          <p className="leading-relaxed">
                            {institucion.descripcion}
                          </p>
                        </div>

                        <div>
                          <h4 className="text-lg font-semibold text-gray-800 mb-3">
                            Contacto
                          </h4>
                          <div className="space-y-2">
                            <p>
                              <span className="font-medium">Tel:</span>{" "}
                              {institucion.numero}
                            </p>
                            <p>
                              <span className="font-medium">Email:</span>{" "}
                              {institucion.correo !== "No disponible" ? (
                                <a
                                  href={`mailto:${institucion.correo}`}
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  {institucion.correo}
                                </a>
                              ) : (
                                <span>{institucion.correo}</span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Ubicación */}
                      <div className="lg:w-1/4">
                        <div className="p-6 h-full">
                          <h4 className="text-lg font-semibold mb-4">
                            Ubicación
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="bg-white rounded-2xl p-8">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    No hay instituciones disponibles
                  </h3>
                  <p className="text-gray-600">
                    Próximamente se agregarán más instituciones al catálogo.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
