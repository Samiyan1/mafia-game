import React from 'react'
import './footer.css';
import Image from 'next/image';

export default function Footer(props: { action?: any, src?: any, className?: string, div?: any }) {
    return (
        <footer onClick={props.action ? props.action : null} className={`${props.className ? props.className : null} btn w-screen fixed bottom-0 cursor-pointer flex flex-col items-center footer`}>
            {props.div ? props.div : null}
            <Image
                src={props.src ? props.src : '/logoWhite.png'}
                alt="Vercel Logo"
                className="mb-4 sticky bottom-0 logo z-20 pt-2"
                width={100}
                height={100}
                priority
            />
        </footer>
    )
}
