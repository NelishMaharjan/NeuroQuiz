import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const History = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  const questions = [
    { q: "What is the value of x in 2x + 5 = 15?", a: ["5", "10", "7.5", "5.5"], correct: 0 },
    { q: "What is the derivative of x^2?", a: ["x", "2x", "2", "x^3"], correct: 1 },
    { q: "Calculate the area of a circle with radius 7 (Use Pi = 3.14)", a: ["43.96", "153.86", "49", "21.98"], correct: 1 },
    { q: "What is the square root of 144?", a: ["10", "14", "12", "16"], correct: 2 },
    { q: "Simplify: (2^3) x (2^2)", a: ["2^5", "2^6", "4^5", "32"], correct: 0 },
    { q: "If f(x) = 3x - 2, find f(4).", a: ["10", "12", "14", "8"], correct: 0 },
    { q: "What is the sum of angles in a triangle?", a: ["90°", "360°", "180°", "270°"], correct: 2 },
    { q: "Solve for y: y/4 = 8", a: ["2", "32", "12", "16"], correct: 1 },
    { q: "What is the value of sin(90°)?", a: ["0", "0.5", "1", "-1"], correct: 2 },
    { q: "What is the slope of the line y = 5x + 3?", a: ["3", "5", "x", "5x"], correct: 1 },
    // ... I'll keep the rest in this simple format
  ];

  const handleAnswer = (index) => {
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
    const next = currentQuestion + 1;
    if (next < questions.length) {
      setCurrentQuestion(next);
    } else {
      setShowScore(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-slate-900 font-sans pt-32 pb-12 px-6 flex flex-col items-center">
      <main className="w-full max-w-2xl mx-auto">
        {showScore ? (
          <div className="bg-white border border-slate-200/60 p-12 rounded-[3rem] text-center shadow-2xl shadow-slate-200/40 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-900/5" />
            <h2 className="text-4xl font-bold mb-4 tracking-tighter uppercase italic">Quiz Complete</h2>
            <p className="text-slate-500 mb-8 text-lg font-medium">Final Score: <span className="text-slate-900 font-bold">{score} / {questions.length}</span></p>
            <button 
              onClick={() => window.location.reload()} 
              className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition active:scale-95 shadow-lg shadow-slate-900/10"
            >
              Restart Session
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-between items-center px-4">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">History Module</span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-900">Score: {score}</span>
            </div>
            
            <div className="bg-white border border-slate-200/60 p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/40 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1.5 bg-slate-900/5" />
              <div className="flex justify-between items-center mb-6">
                 <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Question {currentQuestion + 1} of {questions.length}</span>
              </div>
              <h2 className="text-2xl font-bold leading-tight mb-10 text-slate-900">
                {questions[currentQuestion].q}
              </h2>

              <div className="grid grid-cols-1 gap-3">
                {questions[currentQuestion].a.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    className="w-full text-left p-6 rounded-2xl border border-slate-100 bg-slate-50/50 hover:border-slate-900 hover:bg-white transition-all font-bold text-slate-600 hover:text-slate-900"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default History;