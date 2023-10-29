import React from 'react'
import './btnMoreDetail.css';
export default function BtnMoreDetail(props: { action: any, value: any, className: string }) {
    return (
            <button onClick={props.action} className={`shadow__btn ${props.className}`}>
                <p>{props.value}</p>
                <svg stroke-width="4" stroke="currentColor" viewBox="0 0 24 24" fill="none" className="h-6 w-6" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3" stroke-linejoin="round" stroke-linecap="round"></path>
                </svg>
            </button>
    )
}
