import React, { useEffect, useState } from "react";

const Timer = ({ duration, onTimeUp, resetTrigger }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [resetTrigger, duration]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, onTimeUp]);

  const percentage = (timeLeft / duration) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-2">
        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Time Remaining</span>
        <span className={`text-sm font-black transition-colors ${timeLeft < 5 ? "text-red-500 animate-pulse" : "text-slate-900"}`}>
          {timeLeft}s
        </span>
      </div>
      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
        <div 
          className={`h-full transition-all duration-1000 ease-linear rounded-full ${
            timeLeft < 5 ? "bg-red-500" : "bg-slate-900"
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default Timer;
