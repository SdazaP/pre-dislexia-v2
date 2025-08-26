import { useState } from "react";
import Layout from "../Layouts/Layout";

export default function Contacto() {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    asunto: "",
    otroAsunto: "",
    mensaje: "",
  });

  const [showOtroAsunto, setShowOtroAsunto] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Mostrar/ocultar campo "otro asunto"
    if (name === "asunto") {
      setShowOtroAsunto(value === "otro");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log("Datos del formulario:", formData);
    alert("Mensaje enviado con éxito");
  };

  return (
    <Layout>
      <section className="body-font relative min-h-screen">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12">
            {/* Información de Contacto */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="bg-white">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Contáctanos
                </h1>
                <p className="text-lg mb-8 leading-relaxed">
                  Tu opinión es importante para nosotros. <br />
                  Contáctanos llenando este formulario.
                </p>

                <div className="flex justify-center lg:justify-start mb-8">
                  <img
                    src="https://res.cloudinary.com/dmx716lyu/image/upload/v1755650869/chat_t61ujd.png"
                    alt="Chat illustration"
                    className="w-48 h-48 object-contain"
                  />
                </div>

                {/* Información de contacto */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800">Email</h3>
                    <a
                      href="mailto:contacto@dislexiakids.com"
                      className="text-blue-600 hover:text-blue-800"
                    >
                      contacto@dislexiakids.com
                    </a>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Dirección</h3>
                    <p className="text-gray-600">
                      I.T.S de Tepexi de Rodríguez
                      <br />
                      Puebla, México
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Formulario de Contacto */}
            <div className="lg:w-1/2">
              <div className="bg-white">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Nombre */}
                  <div>
                    <label
                      htmlFor="nombre"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Nombre:
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className="w-full bg-gray-100 bg-opacity-50 rounded-lg border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-3 px-4 leading-8 transition-colors duration-200 ease-in-out"
                      placeholder="Nombre de contacto"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-gray-100 bg-opacity-50 rounded-lg border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-3 px-4 leading-8 transition-colors duration-200 ease-in-out"
                      placeholder="Email de contacto"
                      required
                    />
                  </div>

                  {/* Asunto */}
                  <div>
                    <label
                      htmlFor="asunto"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Asunto:
                    </label>
                    <select
                      id="asunto"
                      name="asunto"
                      value={formData.asunto}
                      onChange={handleInputChange}
                      className="w-full bg-gray-100 bg-opacity-50 rounded-lg border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-3 px-4 leading-8 transition-colors duration-200 ease-in-out"
                      required
                    >
                      <option value="">Selecciona un asunto</option>
                      <option value="duda">Duda</option>
                      <option value="sugerencia">Sugerencia</option>
                      <option value="queja">Queja</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>

                  {/* Otro Asunto (condicional) */}
                  {showOtroAsunto && (
                    <div>
                      <label
                        htmlFor="otroAsunto"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Por favor especifica:
                      </label>
                      <input
                        type="text"
                        id="otroAsunto"
                        name="otroAsunto"
                        value={formData.otroAsunto}
                        onChange={handleInputChange}
                        className="w-full bg-gray-100 bg-opacity-50 rounded-lg border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-3 px-4 leading-8 transition-colors duration-200 ease-in-out"
                        placeholder="Especifica tu asunto"
                      />
                    </div>
                  )}

                  {/* Mensaje */}
                  <div>
                    <label
                      htmlFor="mensaje"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Mensaje:
                    </label>
                    <textarea
                      id="mensaje"
                      name="mensaje"
                      value={formData.mensaje}
                      onChange={handleInputChange}
                      rows="5"
                      className="w-full bg-gray-100 bg-opacity-50 rounded-lg border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-3 px-4 leading-8 transition-colors duration-200 ease-in-out resize-none"
                      placeholder="Describe tu motivo"
                      required
                    ></textarea>
                  </div>

                  {/* Botón de Enviar */}
                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      Enviar Mensaje
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
