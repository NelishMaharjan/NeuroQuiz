import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Science = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const questions = [
    { questionText: "Which planet is known as the 'Red Planet'?", options: ["Venus", "Mars", "Jupiter", "Saturn"], answer: "Mars" },
    { questionText: "What is the chemical symbol for Gold?", options: ["Gd", "Ag", "Au", "Fe"], answer: "Au" },
    { questionText: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Quartz"], answer: "Diamond" },
    { questionText: "Which gas do plants absorb for photosynthesis?", options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], answer: "Carbon Dioxide" },
    { questionText: "What is the powerhouse of the cell?", options: ["Nucleus", "Ribosome", "Mitochondria", "Vacuole"], answer: "Mitochondria" },
    { questionText: "How many bones are in the adult human body?", options: ["186", "206", "216", "256"], answer: "206" },
    { questionText: "What is the nearest star to Earth?", options: ["Sirius", "Alpha Centauri", "The Sun", "Proxima Centauri"], answer: "The Sun" },
    { questionText: "Which element has the atomic number 1?", options: ["Helium", "Hydrogen", "Lithium", "Oxygen"], answer: "Hydrogen" },
    { questionText: "What is the speed of light?", options: ["300,000 km/s", "150,000 km/s", "1,000,000 km/s", "500,000 km/s"], answer: "300,000 km/s" },
    { questionText: "What is the boiling point of water at sea level?", options: ["90°C", "100°C", "110°C", "120°C"], answer: "100°C" },
    { questionText: "Which organ is responsible for pumping blood?", options: ["Lungs", "Brain", "Heart", "Liver"], answer: "Heart" },
    { questionText: "What do bees collect to make honey?", options: ["Pollen", "Water", "Nectar", "Sap"], answer: "Nectar" },
    { questionText: "Who developed the theory of relativity?", options: ["Isaac Newton", "Nikola Tesla", "Albert Einstein", "Marie Curie"], answer: "Albert Einstein" },
    { questionText: "What is the most abundant gas in Earth's atmosphere?", options: ["Oxygen", "Carbon Dioxide", "Hydrogen", "Nitrogen"], answer: "Nitrogen" },
    { questionText: "Which planet is the largest in our solar system?", options: ["Earth", "Saturn", "Jupiter", "Neptune"], answer: "Jupiter" },
    { questionText: "What is the center of an atom called?", options: ["Electron", "Proton", "Neutron", "Nucleus"], answer: "Nucleus" },
    { questionText: "What type of energy is stored in a battery?", options: ["Kinetic", "Chemical", "Thermal", "Nuclear"], answer: "Chemical" },
    { questionText: "Which metal is liquid at room temperature?", options: ["Silver", "Iron", "Mercury", "Copper"], answer: "Mercury" },
    { questionText: "How many states of matter are commonly recognized?", options: ["2", "3", "4", "5"], answer: "4" }, // Solid, Liquid, Gas, Plasma
    { questionText: "What is the study of mushrooms called?", options: ["Mycology", "Biology", "Phycology", "Botany"], answer: "Mycology" },
    { questionText: "What force keeps us on the ground?", options: ["Magnetism", "Friction", "Gravity", "Inertia"], answer: "Gravity" },
    { questionText: "What part of the plant conducts photosynthesis?", options: ["Roots", "Stem", "Leaf", "Flower"], answer: "Leaf" },
    { questionText: "Which planet has the most moons?", options: ["Mars", "Jupiter", "Saturn", "Uranus"], answer: "Saturn" },
    { questionText: "What is the pH of pure water?", options: ["5", "6", "7", "8"], answer: "7" },
    { questionText: "What do you call a scientist who studies rocks?", options: ["Biologist", "Geologist", "Chemist", "Astronomer"], answer: "Geologist" },
    { questionText: "Which vitamin is produced when skin is exposed to sunlight?", options: ["Vit A", "Vit B", "Vit C", "Vit D"], answer: "Vit D" },
    { questionText: "What is the chemical formula for table salt?", options: ["NaCl", "H2O", "CO2", "KCl"], answer: "NaCl" },
    { questionText: "Which part of the ear helps with balance?", options: ["Eardrum", "Cochlea", "Semicircular canals", "Stirrup"], answer: "Semicircular canals" },
    { questionText: "What is the main component of glass?", options: ["Clay", "Sand", "Coal", "Salt"], answer: "Sand" },
    { questionText: "Which blood type is the universal donor?", options: ["A+", "B-", "O-", "AB+"], answer: "O-" },
    { questionText: "What is the smallest unit of life?", options: ["Atom", "Molecule", "Cell", "Organ"], answer: "Cell" },
    { questionText: "What is the atmospheric layer closest to Earth?", options: ["Stratosphere", "Mesosphere", "Exosphere", "Troposphere"], answer: "Troposphere" },
    { questionText: "Which animal is the largest mammal in the world?", options: ["Elephant", "Blue Whale", "Giraffe", "Orca"], answer: "Blue Whale" },
    { questionText: "What is the primary source of energy for Earth?", options: ["The Moon", "The Sun", "Wind", "Nuclear Core"], answer: "The Sun" },
    { questionText: "What scale is used to measure earthquakes?", options: ["Celsius", "Richter", "Kelvin", "Ampere"], answer: "Richter" },
    { questionText: "How many teeth does an adult human typically have?", options: ["28", "30", "32", "34"], answer: "32" },
    { questionText: "What is the process of a liquid turning into a gas?", options: ["Freezing", "Condensation", "Evaporation", "Sublimation"], answer: "Evaporation" },
    { questionText: "Which part of the eye controls the light entering?", options: ["Retina", "Iris", "Cornea", "Optic Nerve"], answer: "Iris" },
    { questionText: "What is the second most common element in the universe?", options: ["Hydrogen", "Oxygen", "Helium", "Carbon"], answer: "Helium" },
    { questionText: "What is the name of the galaxy we live in?", options: ["Andromeda", "Milky Way", "Sombrero", "Triangulum"], answer: "Milky Way" }
  ];

  const handleAnswerClick = (option) => {
    if (selectedAnswer) return; // Prevent multiple clicks

    const correct = option === questions[currentQuestion].answer;
    setSelectedAnswer(option);
    setIsCorrect(correct);

    if (correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans p-6 flex flex-col items-center justify-center">
      <button onClick={() => navigate("/")} className="absolute top-8 left-8 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition">
        ← Back to Home
      </button>

      <div className="w-full max-w-2xl bg-white border border-slate-200/60 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50">
        {showScore ? (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl mx-auto">🧬</div>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900">Quiz Complete!</h2>
            <p className="text-slate-500 font-medium">Final Score: <span className="text-emerald-600 font-bold">{score} / {questions.length}</span></p>
            <button onClick={() => window.location.reload()} className="px-8 py-3 bg-slate-900 text-white text-sm font-bold rounded-2xl hover:bg-slate-800 transition">Play Again</button>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">Science Module</span>
                <span className="text-sm font-bold text-slate-300">{currentQuestion + 1} of {questions.length}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight text-slate-900">{questions[currentQuestion].questionText}</h2>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {questions[currentQuestion].options.map((option, index) => {
                const isThisSelected = selectedAnswer === option;
                const isThisCorrect = option === questions[currentQuestion].answer;
                
                let buttonStyle = "border-slate-100 bg-slate-50/50 text-slate-700";
                if (selectedAnswer) {
                  if (isThisCorrect) buttonStyle = "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm shadow-emerald-100";
                  else if (isThisSelected) buttonStyle = "border-red-500 bg-red-50 text-red-700";
                }

                return (
                  <button
                    key={index}
                    disabled={!!selectedAnswer}
                    onClick={() => handleAnswerClick(option)}
                    className={`w-full text-left px-6 py-4 rounded-2xl border transition-all duration-300 flex justify-between items-center font-semibold ${buttonStyle}`}
                  >
                    {option}
                    {selectedAnswer && isThisCorrect && <span className="text-emerald-600 text-sm font-bold">✓ Correct</span>}
                    {isThisSelected && !isThisCorrect && <span className="text-red-600 text-sm font-bold">✕ Wrong</span>}
                  </button>
                );
              })}
            </div>

            {selectedAnswer && (
              <button
                onClick={handleNextQuestion}
                className="mt-8 w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all animate-in fade-in slide-in-from-bottom-2 duration-300"
              >
                {currentQuestion + 1 === questions.length ? "See Results" : "Next Question →"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Science;