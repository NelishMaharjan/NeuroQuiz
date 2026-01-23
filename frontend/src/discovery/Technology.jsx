import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Technology = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const questions = [
    {
      questionText: "Which company created the iPhone?",
      options: ["Microsoft", "Google", "Apple", "Samsung"],
      answer: "Apple",
    },
    {
      questionText: "What does 'CPU' stand for?",
      options: ["Central Process Unit", "Computer Personal Unit", "Central Processing Unit", "Central Processor Unifier"],
      answer: "Central Processing Unit",
    },
    {
      questionText: "Which programming language is often used for web styling?",
      options: ["Python", "CSS", "Java", "C++"],
      answer: "CSS",
    },
    {
      questionText: "What is the main function of a Firewall?",
      options: ["Speed up internet", "Monitor network traffic", "Cool down servers", "Storage management"],
      answer: "Monitor network traffic",
    },
  ];

  const handleAnswerOptionClick = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans p-6 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Tech Grid Overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '30px 30px' }}>
      </div>

      <button 
        onClick={() => navigate("/")}
        className="absolute top-8 left-8 z-10 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-blue-600 transition flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        Back to Hub
      </button>

      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md border border-slate-200/60 rounded-[2.5rem] p-8 md:p-12 shadow-2xl shadow-blue-500/5 relative z-10">
        {showScore ? (
          <div className="text-center space-y-8 py-4">
            <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-100" />
                <circle cx="64" cy="64" r="58" stroke="currentColor" strokeWidth="8" fill="transparent" 
                        strokeDasharray={364.4} 
                        strokeDashoffset={364.4 - (364.4 * score) / questions.length} 
                        className="text-blue-600 transition-all duration-1000 ease-out" 
                        strokeLinecap="round" />
              </svg>
              <span className="absolute text-2xl font-black">{Math.round((score / questions.length) * 100)}%</span>
            </div>
            
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">System Check Complete</h2>
              <p className="text-slate-500 font-medium">Results: {score} correct / {questions.length} total</p>
            </div>

            <button 
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto px-10 py-4 bg-blue-600 text-white text-sm font-bold rounded-2xl hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200 transition-all active:scale-95"
            >
              Reboot Quiz
            </button>
          </div>
        ) : (
          <>
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-500/10 text-blue-600 rounded-xl flex items-center justify-center text-lg">💻</div>
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600">Technology v2.0</p>
                    <p className="text-xs text-slate-400 font-medium">Question {currentQuestion + 1} of {questions.length}</p>
                </div>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900">
                {questions[currentQuestion].questionText}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerOptionClick(option)}
                  className="group w-full text-left px-6 py-5 rounded-2xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50/30 transition-all duration-200 flex items-center justify-between"
                >
                  <span className="font-bold text-slate-600 group-hover:text-blue-900 transition-colors">{option}</span>
                  <div className="h-2 w-2 rounded-full bg-slate-200 group-hover:bg-blue-500 group-hover:scale-150 transition-all"></div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Technology;