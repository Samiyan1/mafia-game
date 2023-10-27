import React from 'react'
import { useState, Fragment } from 'react';
import './rozeMoarefe.css';

function Timer() {

    const [time, setTime] = useState({
        sec: 0,
        min: 0,
    });

    const [intervalId, setIntervalId] = useState<any>();

    const updateTimer = () => {
        setTime((prev) => {
            let newTime = { ...prev };
            // update sec and see if we need to increase min
            if (newTime.sec < 59) newTime.sec += 1;
            else {
                newTime.min += 1;
                newTime.sec = 0;
            }
            // min has increased in *newTime* by now if it was updated, see if it has crossed 59
            if (newTime.min === 60) {
                newTime.min = 0;
            }

            return newTime;
        });
    };

    const pauseOrResume = () => {
        if (!intervalId) {
            let id :any= setInterval(updateTimer, 1000);
            setIntervalId(id);
        } else {
            clearInterval(intervalId);
            setIntervalId("");
        }
    };

    const reset = () => {
        clearInterval(intervalId);
        setTime({
            sec: 0,
            min: 0,
        });
    };

    return (
        <div className="App flex justify-evenly items-center">
            <button className='bg-black w-20 mx-3' onClick={reset}>reset</button>
            <h2 className='w-[10vw]'>{`${time.min < 10 ? 0 : ""}${time.min} : ${time.sec < 10 ? 0 : ""}${time.sec}`}</h2>
            <label className="container">
                <button className='w-20' onClick={pauseOrResume}>
                    <input checked={true} type="checkbox" />
                    <svg viewBox="0 0 384 512" height="1em" xmlns="http://www.w3.org/2000/svg" className="play"><path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z"></path></svg>
                    <svg viewBox="0 0 320 512" height="1em" xmlns="http://www.w3.org/2000/svg" className="pause"><path d="M48 64C21.5 64 0 85.5 0 112V400c0 26.5 21.5 48 48 48H80c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H48zm192 0c-26.5 0-48 21.5-48 48V400c0 26.5 21.5 48 48 48h32c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48H240z"></path></svg>
                </button>

            </label>
        </div>
    )
}

export default Timer
