import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../../Layouts/Layout";

export default function Registro() {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(true);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    aceptaTerminos: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validaciones
    if (!formData.nombre.trim() || !formData.email.trim()) {
      setErrorMessage("Por favor completa todos los campos");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setErrorMessage("Por favor ingresa un email válido");
      return;
    }

    // Mostrar modal de privacidad
    setShowPrivacyModal(true);
    setErrorMessage("");
  };

  const handleAcceptPrivacy = () => {
    setShowPrivacyModal(false);
    navigate("/evaluacion/pre-inicio");
  };

  const handleRejectPrivacy = () => {
    setShowPrivacyModal(false);
    setErrorMessage("Debes aceptar los términos y condiciones para continuar");
  };

  const handleCloseInfoModal = () => {
    setShowInfoModal(false);
  };

  return (
    <Layout>
      <div className="min-h-screen py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 max-w-6xl mx-auto">
            {/* Antes de iniciar */}
            <div className="lg:w-1/2">
              <div className="p-8 text-center lg:text-left">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                  Antes de iniciar
                </h1>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Por favor, ingresa tu nombre y correo para poder iniciar las
                  pruebas.
                  <br />
                  Al finalizar se enviará un correo con tus resultados y los
                  términos aceptados.
                </p>

                <div className="bg-blue-50 rounded-xl p-6">
                  <h3 className="font-semibold text-blue-800 mb-3">
                    ¿Qué necesitas?
                  </h3>
                  <ul className="text-left space-y-2 text-blue-700">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      Un alias para el estudiante
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      Email válido para recibir resultados
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
                      Aceptar los términos de privacidad
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Formulario */}
            <div className="lg:w-1/2">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="nombre"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Alias:
                    </label>
                    <input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleInputChange}
                      className="w-full bg-gray-100 bg-opacity-50 rounded-lg border border-gray-300 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-200 text-base outline-none text-gray-700 py-3 px-4 leading-8 transition-colors duration-200 ease-in-out"
                      placeholder="Ingresa un alias para el estudiante"
                      required
                    />
                  </div>

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
                      placeholder="Email de registro"
                      required
                    />
                  </div>

                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <p className="text-sm text-blue-700 text-center">
                      Al hacer clic en "Iniciar Pruebas", se le mostrarán los
                      términos y condiciones que deberá aceptar para continuar
                      con la evaluación.
                    </p>
                  </div>

                  {errorMessage && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <p className="text-red-600 text-sm">{errorMessage}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Iniciar Pruebas
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Inicio*/}
        {showInfoModal && (
          <div className="fixed inset-0 flex items-center justify-center p-4 bg-white text-lg">
            <div className="bg-white max-w-2xl w-full mx-4">
              <div className="px-6 py-4">
                <h3 className="text-3xl md:text-4xl font-bold text-center">
                  Información Importante
                </h3>
              </div>
              <div className="px-6 py-4">
                <div className="prose prose-blue max-w-none">
                  <p className="mb-4 leading-relaxed text-2xl text-center">
                    <strong>Bienvenido al sistema de evaluación de dislexia.</strong>
                  </p>
                  
                  <p className="mb-4 leading-relaxed">
                    Las pruebas están diseñadas para ser realizadas por niños de 1ro y
                    2do grado de primaria bajo supervisión de un adulto.
                  </p>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                    <p className="text-yellow-700">
                      <strong>⚠️ Importante:</strong> Los resultados obtenidos son un 
                      <strong> pre-diagnóstico</strong> y <strong>no sustituyen</strong> la evaluación 
                      de un profesional especializado en dislexia.
                    </p>
                  </div>

                  <ul className="list-disc list-inside mb-4 space-y-2">
                    <li>Las pruebas son confidenciales y seguras</li>
                    <li>Los datos se utilizan únicamente para generar el pre-diagnóstico</li>
                    <li>Al finalizar recibirás los resultados por correo electrónico</li>
                    <li>Es necesario aceptar los términos y condiciones para continuar</li>
                  </ul>
                </div>
              </div>

              <div className="px-6 py-4">
                <div className="flex justify-center">
                  <button
                    onClick={handleCloseInfoModal}
                    className="bg-blue-600 hover:from-blue-700 hover:scale-105 text-white font-medium py-2 px-8 rounded-full transition-all duration-300"
                  >
                    Entendido, continuar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal de Privacidad */}
        {showPrivacyModal && (
          <div className="fixed inset-0 bg-white bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
              
              <div className="px-6 py-4 border-b sticky top-0 bg-white">
                <h3 className="text-2xl font-bold">
                  Términos y Condiciones - Aviso de Privacidad
                </h3>
              </div>

              <div className="px-6 py-4">
                <div className="prose prose-blue max-w-none">
                  <h4 className="text-lg font-semibold mb-3">
                    1. Recopilación de Información
                  </h4>
                  <p className="mb-4">
                    La información que proporcione en este formulario (alias y
                    correo electrónico) será almacenada en nuestra base de datos
                    junto con las respuestas de las pruebas. Esta información se
                    utiliza exclusivamente para:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>Generar un pre-diagnóstico de dislexia</li>
                    <li>
                      Enviar los resultados al correo electrónico proporcionado
                    </li>
                    <li>Mejorar nuestros servicios de evaluación</li>
                  </ul>

                  <h4 className="text-lg font-semibold mb-3">
                    2. Uso de la Información
                  </h4>
                  <p className="mb-4">
                    Su información personal no será compartida con terceros ni
                    utilizada para fines comerciales. Los datos se mantendrán de
                    forma confidencial y segura.
                  </p>

                  <h4 className="text-lg font-semibold mb-3">
                    3. Derechos del Usuario
                  </h4>
                  <p className="mb-4">
                    Usted tiene derecho a solicitar acceso, rectificación,
                    cancelación u oposición al tratamiento de sus datos
                    personales. Para ejercer estos derechos, puede contactarnos
                    a través del correo electrónico proporcionado en nuestro
                    sitio.
                  </p>

                  <h4 className="text-lg font-semibold mb-3">
                    4. Almacenamiento y Seguridad
                  </h4>
                  <p className="mb-4">
                    Los datos se almacenan en servidores seguros y se
                    implementan medidas de seguridad para proteger su
                    información contra accesos no autorizados.
                  </p>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                    <p className="text-yellow-700">
                      <strong>Importante:</strong> Al hacer clic en "Acepto",
                      usted confirma que ha leído y entendido estos términos y
                      da su consentimiento para el tratamiento de sus datos
                      según lo descrito anteriormente. Se enviará una copia de
                      estos términos a su correo electrónico.
                    </p>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 border-t bg-white sticky bottom-0">
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
                  <p className="text-sm">
                    Fecha de aceptación: {new Date().toLocaleDateString()}
                  </p>
                  <div className="flex space-x-3">
                    <button
                      onClick={handleRejectPrivacy}
                      className="px-6 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-full transition-colors"
                    >
                      Rechazar
                    </button>
                    <button
                      onClick={handleAcceptPrivacy}
                      className="bg-blue-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-2 px-6 rounded-full transition-all duration-300"
                    >
                      Acepto los Términos
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Banner */}
        <div className="container mx-auto px-4 my-8">
          <img
            src="https://res.cloudinary.com/dmx716lyu/image/upload/v1755546463/Banner_t61ujd.jpg"
            alt="Header Image"
            className="w-full max-w-4xl mx-auto h-auto rounded-lg shadow-md"
          />
        </div>
      </div>
    </Layout>
  );
}