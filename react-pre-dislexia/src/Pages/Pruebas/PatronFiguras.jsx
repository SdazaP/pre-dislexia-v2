import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ejercicios = [
  {
    id: 1,
    patron: [
      { backgroundColor: "yellow" },
      { backgroundColor: "red", borderRadius: "50%" },
      { backgroundColor: "yellow" },
    ],
    vacio: { backgroundColor: "red", borderRadius: "50%" },
    opciones: [
      { backgroundColor: "yellow", borderRadius: "50%" },
      {
        backgroundColor: "red",
        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
      },
      { backgroundColor: "red", borderRadius: "50%" },
      { backgroundColor: "red" },
      { backgroundColor: "yellow" },
    ],
  },
  {
    id: 2,
    patron: [
      { backgroundColor: "red", borderRadius: "50%" },
      { backgroundColor: "yellow" },
      { backgroundColor: "red", borderRadius: "50%" },
    ],
    vacio: { backgroundColor: "yellow" },
    opciones: [
      { backgroundColor: "red", borderRadius: "50%" },
      { backgroundColor: "yellow" },
      { backgroundColor: "red" },
      { backgroundColor: "yellow", borderRadius: "50%" },
      { backgroundColor: "red" },
    ],
  },
  {
    id: 3,
    patron: [
      { backgroundColor: "red", width: "3rem", height: "3rem" },
      { backgroundColor: "red", width: "4rem", height: "4rem" },
      { backgroundColor: "red", width: "2rem", height: "2rem" },
      { backgroundColor: "red", width: "4rem", height: "4rem" },
    ],
    vacio: { backgroundColor: "red", width: "3rem", height: "3rem" },
    opciones: [
      { backgroundColor: "red", width: "3rem", height: "3rem" },
      { backgroundColor: "red", borderRadius: "50%" },
      {
        backgroundColor: "red",
        clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
      },
      { backgroundColor: "red", width: "4rem", height: "4rem" },
      {
        backgroundColor: "red",
        borderRadius: "50%",
        width: "2rem",
        height: "2rem",
      },
    ],
  },
  {
    id: 4,
    patron: [
      { backgroundColor: "red", borderRadius: "50%" },
      { backgroundColor: "red", borderRadius: "50%" },
      { backgroundColor: "red", borderRadius: "50%" },
    ],
    vacio: { backgroundColor: "red", borderRadius: "50%" },
    opciones: [
      { backgroundColor: "yellow" },
      { backgroundColor: "blue" },
      { backgroundColor: "red", borderRadius: "50%" },
      { backgroundColor: "lightblue" },
      { backgroundColor: "white", borderRadius: "50%" },
    ],
  },
  {
    id: 5,
    patron: [
      {
        backgroundColor: "blue",
        clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
      },
      {
        backgroundColor: "blue",
        clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
        width: "4rem",
        height: "4rem",
      },
      {
        backgroundColor: "blue",
        clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
      },
    ],
    vacio: {
      backgroundColor: "blue",
      clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
      width: "4rem",
      height: "4rem",
    },
    opciones: [
      {
        backgroundColor: "blue",
        clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
      },
      {
        backgroundColor: "blue",
        clipPath: "polygon(50% 0%, 25% 100%, 75% 100%)",
        width: "4rem",
        height: "4rem",
      },
      {
        backgroundColor: "blue",
        clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
        width: "2rem",
        height: "2rem",
      },
      { backgroundColor: "blue", width: "4rem", height: "4rem" },
      {
        backgroundColor: "blue",
        clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)",
        width: "4rem",
        height: "4rem",
      },
    ],
  },
  {
    id: 6,
    patron: [
      { backgroundColor: "red", borderRadius: "50%" },
      { backgroundColor: "black", borderRadius: "50%" },
      { backgroundColor: "yellow", borderRadius: "50%" },
      { backgroundColor: "black", borderRadius: "50%" },
    ],
    vacio: { backgroundColor: "red", borderRadius: "50%" },
    opciones: [
      { backgroundColor: "yellow", borderRadius: "50%" },
      { backgroundColor: "red", borderRadius: "50%" },
      { backgroundColor: "black", borderRadius: "50%" },
      { backgroundColor: "blue", borderRadius: "50%" },
      { backgroundColor: "red" },
    ],
  },
  {
    id: 7,
    patron: [
      { backgroundColor: "yellow", borderRadius: "50%" },
      { backgroundColor: "blue", borderRadius: "50%" },
      { backgroundColor: "red", borderRadius: "50%" },
      { backgroundColor: "green", borderRadius: "50%" },
    ],
    vacio: { backgroundColor: "orange", borderRadius: "50%" },
    opciones: [
      { backgroundColor: "yellow", borderRadius: "50%" },
      { backgroundColor: "blue", borderRadius: "50%" },
      { backgroundColor: "red", borderRadius: "50%" },
      { backgroundColor: "green", borderRadius: "50%" },
      { backgroundColor: "orange", borderRadius: "50%" },
    ],
  },
  {
    id: 8,
    patron: [{ backgroundColor: 'green', width: '3rem', height: '3rem' }, { backgroundColor: 'green', width: '3.5rem', height: '3.5rem' }, { backgroundColor: 'green', width: '4rem', height: '4rem' }, { backgroundColor: 'green', width: '4.5rem', height: '4.5rem' }],
    vacio: { backgroundColor: 'green', width: '5rem', height: '5rem' },
    opciones: [
      { backgroundColor: 'green', width: '3.5rem', height: '3.5rem' },
      { backgroundColor: 'green', width: '5rem', height: '5rem' },
      { backgroundColor: 'green', width: '4rem', height: '4rem' },
      { backgroundColor: 'green', width: '4.5rem', height: '4.5rem' },
      { backgroundColor: 'green', width: '3rem', height: '3rem' },
    ],
  },
  {
    id: 9,
    patron: [
      { backgroundColor: "blue", borderRadius: "50%" },
      { backgroundColor: "red", width: "4rem", height: "4rem" },
      { backgroundColor: "yellow", width: "3.5rem", height: "3.5rem" },
      {
        backgroundColor: "green",
        borderRadius: "50%",
        width: "3.5rem",
        height: "3.5rem",
      },
    ],
    vacio: { backgroundColor: "blue", borderRadius: "50%" },
    opciones: [
      { backgroundColor: "blue", borderRadius: "50%" },
      { backgroundColor: "red", width: "4rem", height: "4rem" },
      { backgroundColor: "yellow", width: "3.5rem", height: "3.5rem" },
      {
        backgroundColor: "green",
        borderRadius: "50%",
        width: "3.5rem",
        height: "3.5rem",
      },
      { backgroundColor: "purple", width: "3.5rem", height: "3.5rem" },
    ],
  },
  {
    id: 10,
    patron: [
      { backgroundColor: "orange", borderRadius: "50%" },
      {
        backgroundColor: "purple",
        borderRadius: "50%",
        width: "3.5rem",
        height: "3.5rem",
      },
      { backgroundColor: "pink", width: "4rem", height: "4rem" },
      { backgroundColor: "teal", width: "3.5rem", height: "3.5rem" },
    ],
    vacio: { backgroundColor: "blue", width: "3.5rem", height: "3.5rem" },
    opciones: [
      { backgroundColor: "orange", borderRadius: "50%" },
      {
        backgroundColor: "purple",
        borderRadius: "50%",
        width: "2.5rem",
        height: "2.5rem",
      },
      { backgroundColor: "pink", width: "4rem", height: "4rem" },
      { backgroundColor: "teal", width: "3.5rem", height: "3.5rem" },
      { backgroundColor: "blue", width: "3.5rem", height: "3.5rem" },
    ],
  },
];

// Función para mezclar las opciones
const shuffleArray = (array) => {
  let shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

export default function PatronFiguras() {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [droppedAnswer, setDroppedAnswer] = useState(null);
  const [canProceed, setCanProceed] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setShuffledOptions(shuffleArray(ejercicios[currentExerciseIndex].opciones));
    setDroppedAnswer(null);
    setCanProceed(false);
  }, [currentExerciseIndex]);

  const handleDragStart = (e, style) => {
    e.dataTransfer.setData("application/json", JSON.stringify(style));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("application/json"));
    setDroppedAnswer(data);
    setCanProceed(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleNextExercise = () => {
    if (droppedAnswer) {
      const isCorrect =
        JSON.stringify(droppedAnswer) ===
        JSON.stringify(ejercicios[currentExerciseIndex].vacio);
      console.log(
        `Ejercicio ${ejercicios[currentExerciseIndex].id}: ${
          isCorrect ? "Correcto" : "Incorrecto"
        }`
      );

      if (currentExerciseIndex === ejercicios.length - 1) {
        navigate("/siguiente-prueba-url");
      } else {
        setCurrentExerciseIndex((prevIndex) => prevIndex + 1);
      }
    } else {
      alert(
        "Por favor, arrastra una figura al espacio vacío antes de continuar."
      );
    }
  };

  const currentExercise = ejercicios[currentExerciseIndex];

  return (
    <div className="py-12 px-4 md:px-8 flex flex-col items-center justify-center bg-gray-50">
      <div className="p-6 md:p-10 w-full max-w-2xl text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Ejercicio de Patrones
        </h1>
        <h3 className="text-lg md:text-xl text-gray-600 mb-4">
          <strong>Instrucciones:</strong> Completa el espacio vacío arrastrando
          la figura que creas correcta.
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          Nota: Para avanzar debes dar una respuesta.
        </p>

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">
            Ejercicio {currentExercise.id}
          </h2>

          <div className="flex flex-col items-center gap-6">
            <div className="flex justify-center items-center gap-4 p-4 rounded-lg bg-gray-200/50">
              {currentExercise.patron.map((slot, index) => (
                <div
                  key={index}
                  className="pattern-slot min-w-[3rem] min-h-[3rem]"
                  style={{ ...slot }}
                ></div>
              ))}
              <div
                className="pattern-slot border-2 border-dashed border-gray-400 flex items-center justify-center min-w-[3rem] min-h-[3rem] bg-transparent"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                style={droppedAnswer}
              ></div>
            </div>

            <div className="options-container flex justify-center flex-wrap gap-4 mt-8">
              {shuffledOptions.map((option, index) => (
                <div
                  key={index}
                  className="option cursor-pointer shadow-md hover:scale-110 transition-transform duration-200 min-w-[3rem] min-h-[3rem]"
                  draggable
                  onDragStart={(e) => handleDragStart(e, option)}
                  style={option}
                ></div>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <button
              onClick={handleNextExercise}
              className={`w-full md:w-auto px-6 py-3 font-bold rounded-full text-white transition-all duration-300 min-w-[3rem] min-h-[3rem] ${
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
  );
}
