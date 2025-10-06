import { useState, useEffect } from "react";
import Layout from "../Layouts/Layout";
import {BASE_URL} from "../context/BASE_URL"

export default function CatalogoInstituciones() {
  // Estado para almacenar las instituciones, el estado de carga y el estado de error
  const [instituciones, setInstituciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función asíncrona para obtener los datos de la API
    const fetchInstituciones = async () => {
      try {
        // Realiza la llamada GET
        const response = await fetch(BASE_URL + '/api/instituciones');
        
        // Verifica si la respuesta es exitosa
        if (!response.ok) {
          throw new Error('Error al cargar los datos');
        }
        
        const data = await response.json();
        setInstituciones(data); // Actualiza el estado con los datos de la API
        setLoading(false); // Desactiva el estado de carga
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message); // Almacena el mensaje de error
        setLoading(false); // Desactiva el estado de carga
      }
    };

    fetchInstituciones(); // Llama a la función al montar el componente
  }, []); // El array vacío [] asegura que se ejecute solo una vez

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
            {loading ? (
              <p className="text-center text-gray-600">Cargando instituciones...</p>
            ) : error ? (
              <p className="text-center text-red-600">Error al cargar el catálogo: {error}</p>
            ) : instituciones.length > 0 ? (
              instituciones.map((institucion) => (
                <div
                  key={institucion._id}
                  className="bg-white rounded-lg overflow-hidden"
                >
                  <div className="p-8 text-lg md:text-xl">
                    <div className="flex flex-col lg:flex-row gap-8">
                      {/* Logo y Nombre */}
                      <div className="lg:w-1/4 text-center">
                        <div className="rounded-2xl p-6">
                          <h3 className="text-xl font-bold mb-4">
                            {institucion.nombre}
                          </h3>
                          <img
                            src={institucion.imagen} 
                            alt={`Logo ${institucion.nombre}`}
                            className="h-full object-contain mx-auto mb-4 rounded-lg"
                          />
                        </div>
                      </div>

                      {/* Información y Contacto */}
                      <div className="lg:w-2/4">
                        <div className="mb-6">
                          <h4 className="font-semibold mb-3">
                            Información
                          </h4>
                          <p className="leading-relaxed text-justify">
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
                              {institucion.telefono}
                            </p>
                            <p>
                              <span className="font-medium">Email:</span>{" "}
                              <a
                                href={`mailto:${institucion.correo}`}
                                className="text-blue-600 hover:text-blue-800"
                              >
                                {institucion.correo} 
                              </a>
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
                          <div dangerouslySetInnerHTML={{ __html: institucion.ubicacion }} /> 
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <div className="bg-white rounded-2xl p-8 shadow-md">
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