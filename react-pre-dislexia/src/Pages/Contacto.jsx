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
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage({ type: '', text: '' });

    // Preparar datos para enviar
    const datosEnvio = {
      nombre: formData.nombre,
      email: formData.email,
      asunto: formData.asunto === 'otro' ? formData.otroAsunto : formData.asunto,
      mensaje: formData.mensaje
    };

    try {
      const response = await fetch('http://localhost:3000/api/contacto', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datosEnvio)
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Mensaje enviado correctamente' });
        // Limpiar formulario
        setFormData({
          nombre: "",
          email: "",
          asunto: "",
          otroAsunto: "",
          mensaje: "",
        });
        setShowOtroAsunto(false);
      } else {
        setMessage({ type: 'error', text: data.error || 'Error al enviar el mensaje' });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ type: 'error', text: 'Error de conexión. Intenta nuevamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <section className="body-font relative min-h-screen">
        <div className="container px-5 py-10 mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12">
            {/* Información de Contacto */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <div className="bg-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Contáctanos
                </h1>
                <p className="text-lg mb-8 leading-relaxed">
                  Tu opinión es importante para nosotros. <br />
                  Contáctanos llenando este formulario.
                </p>

                <div className="flex justify-center lg:justify-start mb-8">
                  <img
                    src="https://res.cloudinary.com/dmx716lyu/image/upload/v1756768950/chat_xskcwn.png"
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
            <div className="w-full lg:w-1/2">
              <div className="bg-white rounded-lg p-6 shadow-lg">
                {/* Mensajes de estado */}
                {message.text && (
                  <div className={`mb-6 p-4 rounded-lg ${
                    message.type === 'success' 
                      ? 'bg-green-100 text-green-700 border border-green-200' 
                      : 'bg-red-100 text-red-700 border border-red-200'
                  }`}>
                    {message.text}
                  </div>
                )}

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
                      disabled={isLoading}
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
                      disabled={isLoading}
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
                      disabled={isLoading}
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
                        required={showOtroAsunto}
                        disabled={isLoading}
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
                      disabled={isLoading}
                    ></textarea>
                  </div>

                  {/* Botón de Enviar */}
                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className={`w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl ${
                        isLoading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      {isLoading ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Enviando...
                        </div>
                      ) : (
                        'Enviar Mensaje'
                      )}
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