'use client'
import React from 'react';
import { useParams } from 'next/navigation';
import { MafiaScenarios } from '../dataMafiaScenarios';
import Image from 'next/image'
import './checkbox.css';
import Link from 'next/link';
import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react'

const Page = () => {
    const useparams = useParams();
    const st: string = useparams.senarioName as string;
    const s = decodeURIComponent(st);

    const [isOpen, setIsOpen] = useState(true)

    const [selectRoule, setSelectRoule] = useState<string[]>([])

    const [scenarioObject, setScenarioObject] = useState(MafiaScenarios.find((item) => item.title === s))

    return (
        <div className='flex flex-wrap justify-center my-5 h-screen '>
            {scenarioObject && scenarioObject.rules.map((item: any, index: number) =>
            (<div className="checkbox-wrapper-16" key={index}>
                <label className="checkbox-wrapper">
                    <input className="checkbox-input" type="checkbox" onChange={() => selectRoule.push(item.ruleName)} />
                    <span className="checkbox-tile">
                        <div className="card">
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
            <button onClick={startGame} type="button" className="button mt-6">
                <div className="button-top">start</div>
                <div className="button-bottom"></div>
                <div className="button-base"></div>
            </button>
            <button className='' onClick={openDialog}> addPlayer
            </button>
            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={openDialog}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg text-center font-medium leading-6 text-gray-900"
                                    >
                                        لطفا بازیکن دلخواه خود را اضافه کنید
                                    </Dialog.Title>
                                    <div className="mt-2 flex flex-col justify-center items-center">
                                        <div className="coolinput">
                                            <label for="input" class="text">Player Name:</label>
                                            <input type="text" placeholder="Write here..." name="input" className="input" />
                                        </div>
                                        <div>
                                            <div className="radio-input">
                                                <div className="info">
                                                    <span className="question">What does CSS stand for?</span>
                                                </div>
                                                <input type="radio" id="value-1" name="value-radio" value="value-1" />
                                                <label for="value-1">Computer Style Sheets</label>
                                                <input type="radio" id="value-2" name="value-radio" value="value-2" />
                                                <label for="value-2">Cascading Style Sheets</label>

                                                <span className="result success">Congratulations!</span>
                                                <span className="result error">Mafia</span>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="mt-4 flex justify-center">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={addPlayer}
                                        >
                                            Got it, thanks!
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div >
    )

    function startGame() {
        console.log(selectRoule);

    }
    function openDialog() {
        setIsOpen(!isOpen)
        console.log(selectRoule);

    }
    function addPlayer() {
        setIsOpen(!isOpen)
        console.log(selectRoule);

    }
}

export default Page