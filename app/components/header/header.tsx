import React from 'react'
import './header.css';
export default function Header(props: { div?: any, action?: any, value1: string, value2: string, value3: string, value4: string, value5: string, className?: string }) {
    return (
        <header className={`bg-black sticky top-0 z-30 w-full flex justify-evenly flex-row items-center ${props.className}`}>
            <button onClick={props.action} className=" w-full flex justify-center">
                <div className="header flex justify-evenly font-[Titr]">
                    {props.div}
                    <b>{props.value5}<span>{props.value4}</span>{props.value3}<span>{props.value2}</span>{props.value1}</b>
                </div>

            </button>
        </header>

    )
}
