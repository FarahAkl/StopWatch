import React, { useEffect, useState, useRef } from "react";

export default function Stopwatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeRef = useRef(0);

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setElapsedTime(Date.now() - startTimeRef.current);
      }, 10);
    }

    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  const start = () => {
    setIsRunning(true);
    startTimeRef.current = Date.now() - elapsedTime;
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setElapsedTime(0);
    setIsRunning(false);
  };

  const FormatTime = () => {
    let hours = Math.floor(elapsedTime / (1000 * 60 * 60));
    let minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
    let seconds = Math.floor((elapsedTime / 1000) % 60);
    let millisec = Math.floor((elapsedTime % 1000) / 10);
    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    millisec = String(millisec).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}:${millisec}`;
  };
  return (
    <div className="stopwatch">
      <div className="display">{FormatTime()}</div>
      <div className="controls">
        <button className="start-btn" onClick={start}>
          Start
        </button>
        <button className="reset-btn" onClick={reset}>
          Reset
        </button>
        <button className="stop-btn" onClick={stop}>
          Stop
        </button>
      </div>
    </div>
  );
}
