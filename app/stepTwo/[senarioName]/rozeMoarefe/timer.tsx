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
            let id: any = setInterval(updateTimer, 1000);
            setIntervalId(id);
        }


    };
    const pause = () => {
        clearInterval(intervalId);
        setIntervalId("");
    };

    const reset = () => {
        clearInterval(intervalId);
        setTime({
            sec: 0,
            min: 0,
        });
    };

    return (
        <div className="App flex flex-row justify-evenly items-center w-full">
            <h2 className='mr-1 w-[40%] text-center'>{`${time.min < 10 ? 0 : ""}${time.min} : ${time.sec < 10 ? 0 : ""}${time.sec}`}</h2>
            <div className="audio-player w-[40%]">
                <div className="player-controls">
                    <div className="buttons ">
                        <button onClick={reset} className="skip-btn mx-2"><svg viewBox="0 0 16 16" className="bi bi-skip-backward-fill" fill="#000" height="18" width="18" xmlns="http://www.w3.org/2000/svg"> <path d="M.5 3.5A.5.5 0 0 0 0 4v8a.5.5 0 0 0 1 0V8.753l6.267 3.636c.54.313 1.233-.066 1.233-.697v-2.94l6.267 3.636c.54.314 1.233-.065 1.233-.696V4.308c0-.63-.693-1.01-1.233-.696L8.5 7.248v-2.94c0-.63-.692-1.01-1.233-.696L1 7.248V4a.5.5 0 0 0-.5-.5z"></path> </svg></button>
                        <button onClick={pauseOrResume} className="play-btn mx-2"><svg viewBox="0 0 16 16" className="bi bi-play-fill" fill="#000" height="20" width="20" xmlns="http://www.w3.org/2000/svg"> <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"></path> </svg></button>
                        <button onClick={pause} className="pause-btn mx-2"><svg viewBox="0 0 16 16" className="bi bi-pause-fill" fill="#000" height="20" width="20" xmlns="http://www.w3.org/2000/svg" > <path fill="#000" d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5zm5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5z"></path> </svg></button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Timer
