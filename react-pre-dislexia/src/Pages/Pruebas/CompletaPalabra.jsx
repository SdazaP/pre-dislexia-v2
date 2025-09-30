import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// Asegúrate de que la ruta a useDiagnostico sea correcta
import { useDiagnostico } from '../../context/context'; 

// Define los datos de los ejercicios de manera estática
const ejercicios = [
  { id: 1, imagen: "/images/paleta.png", partes: ["", "le", "ta"], silabas: ["pua", "pa", "qa"], silabaCorrecta: "pa" },
  { id: 2, imagen: "/images/camisa.png", partes: ["ca", "", "sa"], silabas: ["sa", "mi", "ma"], silabaCorrecta: "mi" },
  { id: 3, imagen: "/images/bicicleta.png", partes: ["bi", "", "cleta"], silabas: ["ci", "si", "mi"], silabaCorrecta: "ci" },
  { id: 4, imagen: "/images/helicoptero.png", partes: ["he", "", "cop", "tero"], silabas: ["li", "ti", "pi"], silabaCorrecta: "li" },
  { id: 5, imagen: "/images/sombrero.png", partes: ["som", "bre", ""], silabas: ["ro", "bo", "do"], silabaCorrecta: "ro" },
  { id: 6, imagen: "/images/piscina.png", partes: ["pis", "", "na"], silabas: ["si", "ci", "li"], silabaCorrecta: "ci" },
  { id: 7, imagen: "/images/cangrejo.png", partes: ["can", "gre", ""], silabas: ["go", "jo", "lo"], silabaCorrecta: "jo" },
  { id: 8, imagen: "/images/jirafa.png", partes: ["", "ra", "fa"], silabas: ["fi", "gi", "ji"], silabaCorrecta: "ji" },
  { id: 9, imagen: "/images/zapato.png", partes: ["za", "", "to"], silabas: ["pa", "qa", "ca"], silabaCorrecta: "pa" },
  { id: 10, imagen: "/images/pelota.png", partes: ["", "lo", "ta"], silabas: ["pe", "qe", "que"], silabaCorrecta: "pe" }
];

// Función para mezclar las sílabas en un orden aleatorio
const shuffleArray = (array) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export default function CompletaPalabra() {
  const { updateResultados } = useDiagnostico(); // Hook para guardar resultados
  
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [shuffledSyllables, setShuffledSyllables] = useState([]);
  const [droppedSyllable, setDroppedSyllable] = useState('');
  const [canProceed, setCanProceed] = useState(false);
  const [respuestas, setRespuestas] = useState(Array(ejercicios.length).fill(null)); // Array para guardar las respuestas de cada ejercicio
  
  const navigate = useNavigate();
  const startTimeRef = useRef(null); // Referencia para el inicio del tiempo

  // 1. Inicializar el tiempo al montar el componente
  useEffect(() => {
    startTimeRef.current = Date.now();
  }, []);

  // 2. Lógica para manejar el cambio de ejercicio
  useEffect(() => {
    // Mezcla las sílabas del ejercicio actual al cambiar de ejercicio
    setShuffledSyllables(shuffleArray(ejercicios[currentExerciseIndex].silabas));
    setDroppedSyllable('');
    setCanProceed(false);

    // Si ya existe una respuesta guardada, cárgala
    if (respuestas[currentExerciseIndex]) {
        setDroppedSyllable(respuestas[currentExerciseIndex]);
        setCanProceed(true);
    }
  }, [currentExerciseIndex]);

  const handleDragStart = (e, syllable) => {
    e.dataTransfer.setData('text/plain', syllable);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    
    // Guarda la respuesta temporalmente en el estado local
    setDroppedSyllable(data);
    setCanProceed(true);
    
    // Almacena la respuesta en el array de respuestas
    setRespuestas(prevRespuestas => {
        const newRespuestas = [...prevRespuestas];
        newRespuestas[currentExerciseIndex] = data;
        return newRespuestas;
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // 3. Función central para avanzar y consolidar datos
  const handleNextExercise = () => {
    if (!droppedSyllable) {
        alert("Por favor, arrastra una sílaba antes de continuar.");
        return;
    }

    // Si es el último ejercicio, finaliza y guarda los resultados totales
    if (currentExerciseIndex === ejercicios.length - 1) {
        
        // a. Calcular aciertos
        let aciertos = 0;
        ejercicios.forEach((ejercicio, index) => {
            if (respuestas[index] === ejercicio.silabaCorrecta) {
                aciertos++;
            }
        });
        
        // b. Calcular el tiempo total en segundos
        const endTime = Date.now();
        const tiempoTranscurrido = Math.round((endTime - startTimeRef.current) / 1000); // en segundos
        
        console.log(`Prueba 4 (Completa Palabra) finalizada. Aciertos: ${aciertos}, Tiempo: ${tiempoTranscurrido}s`);
        
        // c. GUARDA RESULTADOS FINALES EN EL CONTEXTO
        updateResultados('prueba4', { aciertos: aciertos, tiempo: tiempoTranscurrido });

        // d. Navegar al componente de resumen/envío final (asumimos que es el último paso)
        navigate("/evaluacion/pre-reporte"); 
        
    } else {
        // Pasa al siguiente ejercicio
        setCurrentExerciseIndex(prevIndex => prevIndex + 1);
    }
  };

  const currentExercise = ejercicios[currentExerciseIndex];

  return (
      <div className="min-h-screen py-12 px-4 md:px-8 flex flex-col items-center justify-center bg-gray-50">
          <div className="bg-white rounded-xl shadow-2xl p-6 md:p-10 w-full max-w-xl text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Completa la Palabra</h1>
              <h3 className="text-lg md:text-xl text-gray-600 mb-4">
                  <strong>Instrucciones:</strong> Arrastra la sílaba que hace falta.
              </h3>
              <p className="text-sm text-gray-500 mb-6">Nota: Para avanzar debes dar una respuesta.</p>
              
              <div className="border-t border-gray-200 pt-6">
                  <h2 className="text-2xl font-bold text-blue-600 mb-6">Ejercicio {currentExercise.id} de {ejercicios.length}</h2>
                  
                  <div className="flex flex-col items-center gap-6 md:flex-row">
                      {/* Contenedor de la palabra */}
                      <div className="flex justify-center gap-2">
                          {currentExercise.partes.map((parte, index) => (
                              <div
                                  key={index}
                                  className={`
                                      word-slot 
                                      bg-gray-200 
                                      rounded-md 
                                      p-6 
                                      h-16 
                                      flex 
                                      items-center 
                                      justify-center 
                                      text-2xl
                                      font-semibold 
                                      min-w-[4rem]
                                      ${parte === "" ? 'border-2 border-dashed border-gray-400' : 'bg-gray-300'}
                                  `}
                                  onDragOver={parte === "" ? handleDragOver : undefined}
                                  onDrop={parte === "" ? handleDrop : undefined}
                              >
                                  {parte || droppedSyllable || 'Arrastra aquí'}
                              </div>
                          ))}
                      </div>
                      
                      {/* Imagen del ejercicio */}
                      <div className="exercise-image flex-shrink-0">
                          <img 
                              src={currentExercise.imagen} 
                              alt={`Imagen Ejercicio ${currentExercise.id}`} 
                              className="w-48 h-48 object-contain rounded-lg shadow-lg"
                          />
                      </div>
                  </div>

                  {/* Sílabas para arrastrar */}
                  <div className="syllables-container flex justify-center gap-4 mt-8 flex-wrap">
                      {shuffledSyllables.map((syllable, index) => (
                          <div
                              key={index}
                              className="syllable bg-blue-500 text-white font-bold h-16 p-4 rounded-md cursor-pointer shadow-md hover:bg-blue-600 transition-colors text-2xl"
                              draggable
                              onDragStart={(e) => handleDragStart(e, syllable)}
                          >
                              {syllable}
                          </div>
                      ))}
                  </div>

                  <div className="mt-8">
                      <button
                          onClick={handleNextExercise}
                          className={`w-full md:w-auto px-6 py-3 font-bold rounded-md text-white transition-all duration-300 text-lg ${
                              canProceed 
                                  ? 'bg-green-500 hover:bg-green-600 shadow-lg' 
                                  : 'bg-gray-400 cursor-not-allowed'
                          }`}
                          disabled={!canProceed}
                      >
                          {currentExerciseIndex === ejercicios.length - 1 ? 'Finalizar prueba' : 'Siguiente'}
                      </button>
                  </div>
              </div>
          </div>
      </div>
  );
}