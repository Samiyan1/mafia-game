import React from 'react'
import './btnRedKey.css';
export default function BtnRedKey(props:{ action: any, value: any ,className :string}) {
    return (
        <div className={`flex ${props.className}`}>
            <button onClick={props.action} type="button" className="btn-submit my-3">
                <div className="button-top ">{props.value}</div>
                <div className="button-bottom"></div>
                <div className="button-base"></div>
            </button>
        </div>
    )
}
