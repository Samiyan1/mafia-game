'use client'
import React from 'react';
import { useParams } from 'next/navigation';
import { MafiaScenarios } from '../dataMafiaScenarios';
import Image from 'next/image'
import './checkbox.css';
import Link from 'next/link';

const Page = () => {
    const useparams = useParams();
    const st: string = useparams.senarioName as string;
    const s = decodeURIComponent(st);

    const scenarioObject = (MafiaScenarios.find((item) => item.title === s))

    return (
        <div className='flex flex-wrap justify-center my-5 h-screen '>
            {scenarioObject && scenarioObject.rules.map((item: any, index: number) =>
            (<div className="checkbox-wrapper-16" key={index}>
                <label className="checkbox-wrapper">
                    <input className="checkbox-input" type="checkbox" />
                    <span className="checkbox-tile">
                        <div className="card" key={index}>
                            <div className="card-border-top">
                            </div>
                            <div className="img">
                                <Image
                                    src={item.image}
                                    width={500}
                                    height={500}
                                    alt="Picture of the author"></Image>
                            </div>
                            <span> {item.ruleName}</span>
                            <p className="job"> {item.description}</p>
                            <div><button> جزییات
                            </button></div>
                        </div>
                    </span>
                </label>
            </div>)
            )}
            <Link className='mt-6' href={''}>
                <button type="button" className="button">
                    <div className="button-top">start</div>
                    <div className="button-bottom"></div>
                    <div className="button-base"></div>
                </button>
            </Link>
        </div>
    )
}

export default Page