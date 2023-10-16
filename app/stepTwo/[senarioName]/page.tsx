'use client'
import React from 'react';
import { useParams } from 'next/navigation';
import { MafiaScenarios } from '../dataMafiaScenarios';
import Image from 'next/image'
import './checkbox.css';
import Link from 'next/link';
import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux';
import { addPlayer } from '@/app/redux/reducers/counterSlice';
import PlusSvg from '../../../public/plus-svgrepo-com.svg';

const Page = () => {

    //get state
    const selector = useSelector(addPlayer);
    const playerState = selector.payload.playersSlice.players;

    //get url
    const useparams = useParams();
    const st: string = useparams.senarioName as string;
    const s = decodeURIComponent(st);

    //states
    let exteraPlayerTeam: string = '';
    const [isOpen, setIsOpen] = useState(false);
    const [selectRoule, setSelectRoule] = useState<string[]>([])
    const [ExteraPlayerName, setExteraPlayerName] = useState<string>('')
    const [scenarioObject, setScenarioObject] = useState(MafiaScenarios.find((item) => item.title === s))
    const [addExteraPlayer, setAddExteraPlayer] = useState(
        {
            ruleName: '',
            playerName: '',
            description: '',
            image: '/image/unknowPlayer/.jpg',
            team: '',
        },
    );

    const startGame = () => {
        console.log(selectRoule);

    }
    const openDialog = () => {
        setIsOpen(!isOpen)
        console.log(selectRoule);

    }

    const eventAddPlayer = () => {

        setAddExteraPlayer({
            ruleName: exteraPlayerTeam,
            playerName: ExteraPlayerName,
            description: exteraPlayerTeam === 'Mafia' ? 'به مافیا کمک کن' : "به شهر کمک کن",
            image: '/image/unknowPlayer/.jpg',
            team: exteraPlayerTeam,
        },);
        
        let newScenarioObject :any = scenarioObject ;
        newScenarioObject.rules.push(addExteraPlayer); 
        setScenarioObject(newScenarioObject);
        setIsOpen(!isOpen);
        console.log(scenarioObject)


    }



    return (
        <>
            <p className="z-9 fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 py-3 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">نقشه های مورد نظر خود را انتخاب نمایید <span>{playerState.length}</span></p>

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
            </div>
            <div className='flex mt-10 justify-center'>
                <button onClick={startGame} type="button" className="button">
                    <div className="button-top">start</div>
                    <div className="button-bottom"></div>
                    <div className="button-base"></div>
                </button>
                <div className="group relative">
                    <button onClick={startGame} type="button" className="button">
                        <div className="button-top"> <button onClick={openDialog}>
                            <Image
                                src={PlusSvg}
                                alt="My SVG"
                                width={40}
                                height={40}
                                className='w-8 hover:scale-125 duration-200 hover:stroke-blue-500'
                            />
                        </button></div>
                        <div className="button-bottom"></div>
                        <div className="button-base"></div>
                    </button>
                    <span className="absolute -top-14 left-[50%] -translate-x-[50%] 
                                        z-20 origin-left scale-0 px-3 rounded-lg border 
                                         border-gray-300 bg-white py-2 text-sm font-bold
                                        shadow-md transition-all duration-300 ease-in-out 
                                        group-hover:scale-100">
                        Add Player
                        <span>
                        </span>
                    </span>
                </div>
            </div>
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
                                        <div className="coolinput mb-2">
                                            <label htmlFor="input" className="text">Player Name:</label>
                                            <input type="text" value={ExteraPlayerName} onChange={(e) => setExteraPlayerName(e.target.value)} placeholder="Write here..." name="input" className="input" />
                                        </div>
                                        <div>
                                            <div className="radio-input">
                                                <div className="info">
                                                    <span className="question">What does CSS stand for?</span>
                                                </div>
                                                <input type="radio" onChange={(e) => exteraPlayerTeam = (e.target.value)} id="value-1" name="value-radio" value="Mafia" />
                                                <label htmlFor="value-1">Mafia</label>
                                                <input type="radio" onChange={(e) => exteraPlayerTeam = (e.target.value)} id="value-2" name="value-radio" value="City" />
                                                <label htmlFor="value-2">City</label>

                                                <span className="result success">City!</span>
                                                <span className="result error">Mafia</span>
                                            </div>
                                        </div>

                                    </div>

                                    <div className="mt-4 flex justify-center">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                            onClick={eventAddPlayer}
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
        </>
    )

}

export default Page