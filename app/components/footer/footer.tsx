import React from 'react'
import './footer.css';
import Image from 'next/image';

export default function Footer(props: { action: any, src: any, className: string }) {
    return (
        <footer onClick={props.action} className={`${props.className} bg-black w-screen fixed bottom-0 cursor-pointer flex flex-col items-center footer`}>
            <Image
                src={props.src}
                alt="Vercel Logo"
                className="mb-4 sticky bottom-0 logo z-20 pt-2"
                width={100}
                height={100}
                priority
            />
        </footer>
    )
}
