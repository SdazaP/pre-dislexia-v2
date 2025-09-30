import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PreInicio() {
  const navigate = useNavigate();
  const [isStarting, setIsStarting] = useState(false);

  const handleStartTest = () => {
    setIsStarting(true);
    setTimeout(() => {
      navigate('/evaluacion/cuestionario-padres');
    }, 500);
  };

  const handleExit = () => {
    navigate('/evaluacion/registro');
  };

  return (

      <div className="py-2">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl overflow-hidden">
            
            <div className="bg-blue-600 text-white py-8 px-6 text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Antes de Iniciar las Pruebas
              </h1>
              <div className="w-20 h-1 bg-blue-300 mx-auto rounded-full"></div>
            </div>

            {/* Contenido */}
            <div className="p-8">
              {/* Alerta */}
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-lg mb-8">
                <div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                      Importante para Tutores
                    </h3>
                    <p className="text-yellow-700">
                      Recuerda que debes dar seguimiento al niño/niña en cada actividad, 
                      ya que pueden surgir dudas durante las pruebas.
                    </p>
                  </div>
                </div>
              </div>

              {/* Instrucciones */}
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <p>
                    <strong className="text-blue-600">No ayudes a responder:</strong> 
                    {' '}Tu rol es de guía, no de responder por el niño. Si ayudas a responder, 
                    el pre-diagnóstico será incorrecto.
                  </p>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <p>
                    <strong className="text-blue-600">Consulta profesional:</strong> 
                    {' '}Te invitamos a que asistas con un psicólogo especializado 
                    para obtener un diagnóstico más completo y preciso.
                  </p>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <p>
                    <strong className="text-blue-600">Modo horizontal:</strong> 
                    {' '}Si estás usando un teléfono, gira la pantalla a posición 
                    horizontal para una mejor visualización de las pruebas.
                  </p>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-bold">4</span>
                  </div>
                  <p>
                    <strong className="text-blue-600">Ambiente tranquilo:</strong> 
                    {' '}Asegúrate de que el niño esté en un ambiente tranquilo 
                    y sin distracciones durante las pruebas.
                  </p>
                </div>
              </div>

              {/* Advertencia Móvil */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-8 md:hidden">
                <div className="flex items-center">
                  <span className="text-blue-600 text-xl mr-3">📱</span>
                  <p className="text-blue-700 text-sm">
                    <strong>Gira tu teléfono:</strong> Para mejor visualización, 
                    colócalo en posición horizontal.
                  </p>
                </div>
              </div>
            </div>

            {/* Footer*/}
            <div className="px-8 py-6 border-t">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={handleStartTest}
                  disabled={isStarting}
                  className={`bg-blue-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center ${
                    isStarting ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {isStarting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Iniciando...
                    </>
                  ) : (
                    'Iniciar Pruebas'
                  )}
                </button>

                <button
                  onClick={handleExit}
                  disabled={isStarting}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}