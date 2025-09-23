import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Define los datos de los ejercicios de manera estática por ahora
const ejercicios = [
  {
    id: 1,
    imagen: "/images/paleta.png",
    palabraCorrecta: "Paleta",
    opciones: ["Paleta", "Palteta", "Pelata"],
  },
  {
    id: 2,
    imagen: "/images/camisa.png",
    palabraCorrecta: "Camisa",
    opciones: ["Camisa", "Camiisa", "Camasa"],
  },
  {
    id: 3,
    imagen: "/images/bicicleta.png",
    palabraCorrecta: "Bicicleta",
    opciones: ["Bicicleta", "Bicicelta", "Bicleata"],
  },
  {
    id: 4,
    imagen: "/images/helicoptero.png",
    palabraCorrecta: "Helicóptero",
    opciones: ["Helicóptero", "Heliicopteero", "Helicopteoro"],
  },
  {
    id: 5,
    imagen: "/images/sombrero.png",
    palabraCorrecta: "Sombrero",
    opciones: ["Sombrero", "Sombreno", "Sobermro"],
  },
  {
    id: 6,
    imagen: "/images/piscina.png",
    palabraCorrecta: "Piscina",
    opciones: ["Piscina", "Pisciana", "Piciina"],
  },
  {
    id: 7,
    imagen: "/images/cangrejo.png",
    palabraCorrecta: "Cangrejo",
    opciones: ["Cangrejo", "Carngrejo", "Cangejo"],
  },
  {
    id: 8,
    imagen: "/images/jirafa.png",
    palabraCorrecta: "Jirafa",
    opciones: ["Jirafa", "Jifara", "Giraafa"],
  },
  {
    id: 9,
    imagen: "/images/zapato.png",
    palabraCorrecta: "Zapato",
    opciones: ["Zapato", "Zappato", "Sapatto"],
  },
  {
    id: 10,
    imagen: "/images/pelota.png",
    palabraCorrecta: "Pelota",
    opciones: ["Pelota", "Peolta", "Pelotda"],
  },
];

// Función para mezclar las palabras en un orden aleatorio
const shuffleArray = (array) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export default function PalabraImagen() {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [droppedWord, setDroppedWord] = useState("");
  const [canProceed, setCanProceed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShuffledOptions(shuffleArray(ejercicios[currentExerciseIndex].opciones));
    setDroppedWord("");
    setCanProceed(false);
  }, [currentExerciseIndex]);

  const handleDragStart = (e, word) => {
    e.dataTransfer.setData("text/plain", word);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData("text/plain");
    setDroppedWord(data);
    setCanProceed(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleNextExercise = () => {
    if (droppedWord) {
      const isCorrect =
        droppedWord === ejercicios[currentExerciseIndex].palabraCorrecta;
      console.log(
        `Ejercicio ${ejercicios[currentExerciseIndex].id}: ${
          isCorrect ? "Correcto" : "Incorrecto"
        }`
      );

      if (currentExerciseIndex === ejercicios.length - 1) {
        navigate("/siguiente-prueba-url"); // Cambia por tu URL real
      } else {
        setCurrentExerciseIndex((prevIndex) => prevIndex + 1);
      }
    } else {
      alert("Por favor, arrastra una palabra antes de continuar.");
    }
  };

  const currentExercise = ejercicios[currentExerciseIndex];

  return (
    <div className=" px-4 md:px-8 flex flex-col items-center justify-center bg-gray-50">
      <div className="p-6 md:p-10 w-full max-w-5xl">
        {/* Títulos e instrucciones */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Unir Palabras con Imágenes
          </h1>
          <h3 className="text-lg md:text-xl text-gray-600 mt-2">
            <strong>Instrucciones:</strong> Arrastra la palabra al cuadro de
            abajo.
          </h3>
          <p className="text-sm text-gray-500 mt-2">
            Nota: Para avanzar debes dar una respuesta.
          </p>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
            Ejercicio {currentExercise.id}
          </h2>

          <div className="flex flex-col md:flex-row md:space-x-8 items-center md:items-start">
            <div className="flex-1 flex flex-col items-center justify-center space-y-4 mb-8 md:mb-0">
              <div className="exercise-image">
                <img
                  src={currentExercise.imagen}
                  alt={currentExercise.palabraCorrecta}
                  className="w-64 h-64 object-cover rounded-lg shadow-lg"
                />
              </div>

              <div
                className="dropzone bg-gray-200 border-2 border-dashed border-gray-400 rounded-md p-4 w-64 h-20 flex items-center justify-center text-3xl text-gray-700 font-semibold"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {droppedWord || "Arrastra aquí"}
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center md:items-start space-y-8 md:p-6 md:border-l border-gray-200">
              <div className="exercise-words w-full grid grid-cols-1 sm:grid-cols-3 gap-2 justify-items-center">
                {shuffledOptions.map((word, index) => (
                  <div
                    key={index}
                    className="word bg-blue-500 text-white font-bold py-3 px-2 text-xl md:text-lg rounded-md cursor-pointer shadow-md hover:bg-blue-600 transition-colors w-full text-center"
                    draggable
                    onDragStart={(e) => handleDragStart(e, word)}
                  >
                    {word}
                  </div>
                ))}
              </div>

              <div className="mt-auto w-full md:w-auto">
                <button
                  onClick={handleNextExercise}
                  className={`w-full md:w-auto px-6 py-3 font-bold text-lg rounded-md text-white transition-all duration-300 ${
                    canProceed
                      ? "bg-green-500 hover:bg-green-600 shadow-lg"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                  disabled={!canProceed}
                >
                  {currentExerciseIndex === ejercicios.length - 1
                    ? "Finalizar prueba"
                    : "Siguiente"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
