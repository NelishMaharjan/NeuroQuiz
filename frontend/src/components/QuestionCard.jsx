import React from "react";

const QuestionCard = ({ question, selectedOption, onSelect, isDisabled }) => {
  if (!question) return null;

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 leading-tight tracking-tight">
          {question.questionText}
        </h2>
      </div>

      <div className="grid gap-4">
        {question.options && question.options.map((opt, i) => {
          const isSelected = selectedOption === opt;
          const isCorrect = opt === question.correctAnswer;
          const showResult = isDisabled; // If disabled, it means an answer was chosen or time ran out

          let buttonClass = "bg-white border-slate-200 text-slate-600 hover:border-slate-900 hover:bg-slate-50";
          
          if (showResult) {
            if (isCorrect) {
              buttonClass = "bg-emerald-50 border-emerald-500 text-emerald-700 shadow-lg shadow-emerald-100";
            } else if (isSelected && !isCorrect) {
              buttonClass = "bg-red-50 border-red-500 text-red-700 shadow-lg shadow-red-100";
            } else {
              buttonClass = "bg-white border-slate-100 text-slate-300 opacity-60";
            }
          }

          return (
            <button
              key={i}
              disabled={isDisabled}
              onClick={() => onSelect(opt)}
              className={`group relative p-6 rounded-3xl border-2 text-left transition-all duration-200 font-bold text-sm md:text-base ${buttonClass} active:scale-[0.98]`}
            >
              <div className="flex items-center justify-between">
                <span>{opt}</span>
                {showResult && isCorrect && (
                  <span className="w-6 h-6 bg-emerald-500 text-white rounded-full flex items-center justify-center text-[10px]">
                    ✓
                  </span>
                )}
                {showResult && isSelected && !isCorrect && (
                  <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-[10px]">
                    ✕
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionCard;
