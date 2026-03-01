import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Geography = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const questions = [
    { questionText: "Which is the largest continent by land area?", options: ["Africa", "North America", "Asia", "Europe"], answer: "Asia" },
    { questionText: "What is the capital city of Japan?", options: ["Seoul", "Beijing", "Tokyo", "Bangkok"], answer: "Tokyo" },
    { questionText: "Which river is the longest in the world?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], answer: "Nile" },
    { questionText: "Which country is home to the Great Barrier Reef?", options: ["Belize", "Australia", "Maldives", "Philippines"], answer: "Australia" },
    { questionText: "Which mountain is the highest in the world?", options: ["K2", "Mount Everest", "Kangchenjunga", "Lhotse"], answer: "Mount Everest" },
    { questionText: "What is the smallest country in the world?", options: ["Monaco", "Nauru", "Vatican City", "San Marino"], answer: "Vatican City" },
    { questionText: "Which desert is the largest hot desert on Earth?", options: ["Gobi", "Sahara", "Kalahari", "Arabian"], answer: "Sahara" },
    { questionText: "Which ocean is the largest by surface area?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" },
    { questionText: "What is the capital of France?", options: ["Lyon", "Marseille", "Paris", "Bordeaux"], answer: "Paris" },
    { questionText: "Which country has the most natural lakes?", options: ["USA", "Russia", "Canada", "Norway"], answer: "Canada" },
    { questionText: "What is the capital of Brazil?", options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"], answer: "Brasília" },
    { questionText: "In which country can you find the ancient city of Petra?", options: ["Egypt", "Jordan", "Iraq", "Turkey"], answer: "Jordan" },
    { questionText: "What is the largest island in the world?", options: ["Australia", "Greenland", "New Guinea", "Borneo"], answer: "Greenland" },
    { questionText: "Which European country is shaped like a boot?", options: ["Spain", "Greece", "Italy", "Portugal"], answer: "Italy" },
    { questionText: "What is the capital of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], answer: "Canberra" },
    { questionText: "Which country is known as the Land of the Rising Sun?", options: ["China", "South Korea", "Japan", "Thailand"], answer: "Japan" },
    { questionText: "Which sea is the saltiest on Earth?", options: ["Red Sea", "Dead Sea", "Mediterranean Sea", "Caribbean Sea"], answer: "Dead Sea" },
    { questionText: "What is the capital of Canada?", options: ["Toronto", "Vancouver", "Montreal", "Ottawa"], answer: "Ottawa" },
    { questionText: "Which African country has the most pyramids?", options: ["Egypt", "Sudan", "Libya", "Ethiopia"], answer: "Sudan" },
    { questionText: "What is the capital of Iceland?", options: ["Reykjavik", "Oslo", "Helsinki", "Copenhagen"], answer: "Reykjavik" },
    { questionText: "Which US state is the largest by area?", options: ["Texas", "California", "Alaska", "Montana"], answer: "Alaska" },
    { questionText: "Which canal connects the Atlantic and Pacific Oceans?", options: ["Suez Canal", "Panama Canal", "Corinth Canal", "Kiel Canal"], answer: "Panama Canal" },
    { questionText: "What is the capital of Egypt?", options: ["Alexandria", "Giza", "Cairo", "Luxor"], answer: "Cairo" },
    { questionText: "In which continent is the Amazon Rainforest located?", options: ["Africa", "Asia", "South America", "North America"], answer: "South America" },
    { questionText: "What is the capital of Italy?", options: ["Florence", "Milan", "Rome", "Venice"], answer: "Rome" },
    { questionText: "Which country has the largest population in the world?", options: ["China", "India", "USA", "Indonesia"], answer: "India" },
    { questionText: "What is the capital of Russia?", options: ["Saint Petersburg", "Kazan", "Novosibirsk", "Moscow"], answer: "Moscow" },
    { questionText: "Mount Kilimanjaro is located in which country?", options: ["Kenya", "Uganda", "Tanzania", "Ethiopia"], answer: "Tanzania" },
    { questionText: "What is the capital of Germany?", options: ["Munich", "Frankfurt", "Hamburg", "Berlin"], answer: "Berlin" },
    { questionText: "Which is the smallest continent?", options: ["Europe", "Antarctica", "Australia", "South America"], answer: "Australia" },
    { questionText: "What is the capital of Spain?", options: ["Barcelona", "Seville", "Madrid", "Valencia"], answer: "Madrid" },
    { questionText: "The city of Timbuktu is located in which country?", options: ["Mali", "Niger", "Chad", "Mauritania"], answer: "Mali" },
    { questionText: "What is the capital of South Korea?", options: ["Busan", "Incheon", "Daegu", "Seoul"], answer: "Seoul" },
    { questionText: "Which line divides the Earth into Northern and Southern Hemispheres?", options: ["Prime Meridian", "Equator", "Tropic of Cancer", "Tropic of Capricorn"], answer: "Equator" },
    { questionText: "What is the capital of Thailand?", options: ["Phuket", "Bangkok", "Chiang Mai", "Pattaya"], answer: "Bangkok" },
    { questionText: "Which country shares the longest border with the United States?", options: ["Mexico", "Canada", "Russia", "Cuba"], answer: "Canada" },
    { questionText: "What is the capital of Argentina?", options: ["Santiago", "Lima", "Buenos Aires", "Bogotá"], answer: "Buenos Aires" },
    { questionText: "Which is the only country that is also a continent?", options: ["Russia", "Canada", "Australia", "Brazil"], answer: "Australia" },
    { questionText: "What is the capital of Turkey?", options: ["Istanbul", "Izmir", "Antalya", "Ankara"], answer: "Ankara" },
    { questionText: "Which river flows through London?", options: ["Seine", "Danube", "Thames", "Rhine"], answer: "Thames" }
  ];

  const handleAnswerClick = (option) => {
    if (selectedAnswer) return;
    setSelectedAnswer(option);
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans pt-32 pb-12 px-6 flex flex-col items-center">
      
      <div className="w-full max-w-2xl bg-white border border-slate-200/60 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-slate-200/40 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-900/5" />
        
        {showScore ? (
          <div className="text-center space-y-6 py-8">
            <div className="w-20 h-20 bg-indigo-50 text-indigo-600 rounded-3xl rotate-12 flex items-center justify-center text-3xl mx-auto mb-4 border border-indigo-100">🌍</div>
            <h2 className="text-4xl font-bold tracking-tight">Expedition Over</h2>
            <p className="text-slate-500 font-medium">Results: <span className="text-indigo-600 font-bold">{score} / {questions.length}</span></p>
            <button onClick={() => window.location.reload()} className="w-full py-4 bg-indigo-600 text-white text-sm font-bold rounded-2xl hover:bg-indigo-700 transition shadow-lg">New Expedition</button>
          </div>
        ) : (
          <>
            <div className="mb-12">
              <div className="flex justify-between items-center mb-8">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`h-1 w-8 rounded-full ${i <= (currentQuestion % 5) ? 'bg-indigo-500' : 'bg-slate-100'}`} />
                  ))}
                </div>
                <span className="text-[10px] font-black text-slate-300 uppercase">Q: {currentQuestion + 1} / {questions.length}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold leading-tight tracking-tight">{questions[currentQuestion].questionText}</h2>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {questions[currentQuestion].options.map((option, index) => {
                const isCorrect = option === questions[currentQuestion].answer;
                const isSelected = selectedAnswer === option;
                
                let stateClass = "border-slate-100 bg-slate-50/50";
                if (selectedAnswer) {
                  if (isCorrect) stateClass = "border-indigo-500 bg-indigo-50 text-indigo-700 ring-1 ring-indigo-500";
                  else if (isSelected) stateClass = "border-red-500 bg-red-50 text-red-700 ring-1 ring-red-500";
                }

                return (
                  <button
                    key={index}
                    disabled={!!selectedAnswer}
                    onClick={() => handleAnswerClick(option)}
                    className={`w-full text-left px-6 py-5 rounded-2xl border transition-all duration-300 flex items-center gap-4 group ${stateClass}`}
                  >
                    <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border transition-colors ${isSelected ? 'bg-white border-transparent' : 'bg-white border-slate-200 text-slate-400'}`}>
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="font-bold">{option}</span>
                  </button>
                );
              })}
            </div>

            {selectedAnswer && (
              <button
                onClick={handleNext}
                className="mt-8 w-full py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all animate-in fade-in slide-in-from-bottom-2"
              >
                {currentQuestion + 1 === questions.length ? "Finish Journey" : "Continue Journey →"}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Geography;