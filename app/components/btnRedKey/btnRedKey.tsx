import React from 'react'
import './btnRedKey.css';
export default function BtnRedKey(props: { action: any, value: any, className: string, color: string }) {
    if (props.color === 'green') {
        return (
            <div className={`flex ${props.className}`}>
                <button onClick={props.action} type="button" className="btn-submit my-3">
                    <div className="button-top ">{props.value}</div>
                    <div className="button-bottom bg-[#012510]"></div>
                    <div className="button-base"></div>
                </button>
            </div>
        )
    } else if (props.color === 'red') {
        return (
            <div className={`flex ${props.className}`}>
                <button onClick={props.action} type="button" className="btn-submit my-3">
                    <div className="button-top">{props.value}</div>
                    <div className="button-bottom bg-[#6b092a]"></div>
                    <div className="button-base"></div>
                </button>
            </div>
        )
    } else if (props.color === 'blue') {
        return (
            <div className={`flex ${props.className}`}>
                <button onClick={props.action} type="button" className="btn-submit my-3">
                    <div className="button-top bg-gradient-radial ">{props.value}</div>
                    <div className="button-bottom bg-[#000545] "></div>
                    <div className="button-base"></div>
                </button>
            </div>
        )
    }

}
