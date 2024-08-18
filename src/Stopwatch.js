import React, { useState, useRef, useEffect } from 'react';
import './Stopwatch.css';

const Stopwatch = () => {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef(null);

    const startTimer = () => {
        if (!isRunning) {
            setIsRunning(true);
            const startTime = Date.now() - time;
            timerRef.current = setInterval(() => {
                setTime(Date.now() - startTime);
            }, 10); 
        }
    };

    const pauseTimer = () => {
        if (isRunning) {
            clearInterval(timerRef.current);
            setIsRunning(false);
        }
    };

    const resetTimer = () => {
        clearInterval(timerRef.current);
        setIsRunning(false);
        setTime(0);
    };

    useEffect(() => {
        return () => clearInterval(timerRef.current);
    }, []);

    const formatTime = (time) => {
        const totalMilliseconds = Math.floor((time % 1000) / 10); 
        const totalSeconds = Math.floor(time / 1000);
        const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
        const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
        const seconds = String(totalSeconds % 60).padStart(2, '0');
        const milliseconds = String(totalMilliseconds).padStart(2, '0');
        return `${hours}:${minutes}:${seconds}.${milliseconds}`;
    };

    return (
        <div className="stopwatch-container">
            <h1 className="title">Stopwatch</h1>
            <div className="stopwatch">
                <div className="display">{formatTime(time)}</div>
                <div className="buttons">
                    <button onClick={startTimer} disabled={isRunning}>Start</button>
                    <button onClick={pauseTimer} disabled={!isRunning}>Pause</button>
                    <button onClick={resetTimer}>Reset</button>
                </div>
            </div>
        </div>
    );
};

export default Stopwatch;
