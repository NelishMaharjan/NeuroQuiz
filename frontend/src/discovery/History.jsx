import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const questions = [
    {
      questionText: "Who was the first President of the United States?",
      options: ["Thomas Jefferson", "Abraham Lincoln", "George Washington", "John Adams"],
      answer: "George Washington",
    },
    {
      questionText: "In which year did the Titanic sink?",
      options: ["1912", "1905", "1923", "1898"],
      answer: "1912",
    },
    {
      questionText: "Which ancient civilization built the Great Pyramid of Giza?",
      options: ["Romans", "Mayans", "Greeks", "Egyptians"],
      answer: "Egyptians",
    },
    {
      questionText: "The 'Renaissance' period began in which European country?",
      options: ["France", "Italy", "Germany", "Spain"],
      answer: "Italy",
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
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans p-6 flex flex-col items-center justify-center">
      {/* Back Navigation */}
      <button 
        onClick={() => navigate("/")}
        className="absolute top-8 left-8 text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-slate-900 transition flex items-center gap-2"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
        Back to Home
      </button>

      <div className="w-full max-w-2xl bg-white border border-slate-200/60 rounded-[2.5rem] p-8 md:p-12 shadow-xl shadow-slate-200/50 relative overflow-hidden">
        {/* Subtle Decorative Icon in Background */}
        <div className="absolute -top-6 -right-6 text-9xl opacity-[0.03] pointer-events-none rotate-12">
          📜
        </div>

        {showScore ? (
          <div className="text-center space-y-6 py-8">
            <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-4">
              🏛️
            </div>
            <h2 className="text-4xl font-bold tracking-tight">Timeline Ended</h2>
            <p className="text-slate-500 font-medium">
              You mastered <span className="text-slate-900 font-bold">{score}</span> out of {questions.length} historical facts.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <button 
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-slate-900 text-white text-sm font-bold rounded-2xl hover:bg-slate-800 transition shadow-lg shadow-slate-200"
              >
                Restart Quiz
              </button>
              <button 
                onClick={() => navigate("/")}
                className="px-8 py-3 bg-white border border-slate-200 text-slate-900 text-sm font-bold rounded-2xl hover:bg-slate-50 transition"
              >
                Exit
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-600 bg-amber-500/10 px-3 py-1.5 rounded-lg border border-amber-500/10">
                  History Module
                </span>
                <div className="flex gap-1">
                    {questions.map((_, index) => (
                        <div 
                            key={index} 
                            className={`h-1.5 w-6 rounded-full transition-all duration-500 ${index <= currentQuestion ? 'bg-amber-500' : 'bg-slate-100'}`}
                        />
                    ))}
                </div>
              </div>
              <h2 className="text-2xl md:text-4xl font-bold leading-[1.1] tracking-tight text-slate-900">
                {questions[currentQuestion].questionText}
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerOptionClick(option)}
                  className="w-full text-left px-8 py-5 rounded-[1.5rem] border border-slate-100 bg-slate-50/30 hover:bg-white hover:border-amber-200 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 group flex justify-between items-center"
                >
                  <span className="font-bold text-slate-600 group-hover:text-slate-900 transition-colors">{option}</span>
                  <div className="w-5 h-5 rounded-full border-2 border-slate-200 group-hover:border-amber-500 transition-colors flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-transparent group-hover:bg-amber-500 transition-all scale-0 group-hover:scale-100"></div>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default History;