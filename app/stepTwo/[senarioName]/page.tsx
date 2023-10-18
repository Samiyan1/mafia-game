'use client'
import React from 'react';
import { useParams } from 'next/navigation';
import { MafiaScenarios } from '../dataMafiaScenarios';
import Image from 'next/image'
import './stepThree.css';
import Link from 'next/link';
import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { useDispatch, useSelector } from 'react-redux';
import { addPlayer } from '@/app/redux/reducers/counterSlice';
import PlusSvg from '../../../public/plus-svgrepo-com.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
    const [selectRule, setSelectRule] = useState<string[]>([])
    const [exteraPlayerName, setExteraPlayerName] = useState<string>('')
    const [scenarioObject, setScenarioObject] = useState(MafiaScenarios.find((item) => item.title === s))
    const [addExteraPlayer, setAddExteraPlayer] = useState(
        {
            ruleName: '',
            playerName: '',
            description: '',
            image: '/image/unknowPlayer.jpg',
            team: '',
        },
    );




    function shuffle(array: any) {
        let currentIndex = array.length, randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex > 0) {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        return array;
    }
    const startGame = () => {
        
        const shuffledSelectRule = shuffle(selectRule)

        if (selectRule.length === playerState.length) {

            const listIsReady = playerState.map((item: string, index: number) => {
                return (
                    {
                        playerName: item,
                        rule: selectRule[index],
                    }
                )
            })
                return listIsReady




            return toast.success(`لطفا نقش ها را انتخاب`)

        } else if (selectRule.length === 0) {

            return toast.error(`لطفا نقش ها را انتخاب`)

        } else if (selectRule.length > playerState.length) {

            return toast.error(`تعداد نقش ها بیشتر از تعداد بازیکنان`)

        } else if (selectRule.length < playerState.length) {

            return toast.error(`تعداد نقش ها کمتر از تعداد بازیکنان`)

        }


    }
    const openDialog = () => {
        setIsOpen(!isOpen)

    }

    const eventAddPlayer = () => {

        const newRuleObject: any = {
            ruleName: exteraPlayerName,
            playerName: '',
            description: exteraPlayerTeam === 'City' ? "به شهر کمک کن" : 'به مافیا کمک کن',
            image: '/image/unknowPlayer.jpg',
            team: exteraPlayerTeam,
        };

        setAddExteraPlayer(newRuleObject);
        let newScenarioObject: any = scenarioObject;
        newScenarioObject.rules.push(addExteraPlayer);
        setScenarioObject(newScenarioObject);
        setIsOpen(!isOpen);
    }



    return (
        <main className="h-screen overflow-scroll justify-start relative  flex flex-col items-center">
            <header className='bg-black sticky top-0 z-30 w-full flex justify-center items-center'>
                <p className="py-2 ">
                    choose scenario
                </p>
                <button onClick={openDialog} className="button-add ml-9 my-3 px-5 py-2">add</button>
            </header>
            <div className='flex flex-wrap justify-evenly items-center mt-3'>
                {scenarioObject && scenarioObject.rules.map((item: any, index: number) =>
                (
                    <div className="checkbox-wrapper-16 " key={index}>
                        <label className="checkbox-wrapper">
                            <input className="checkbox-input" type="checkbox" onChange={(e) => e.target.checked ? selectRule.push(item.ruleName) : selectRule.splice(item.ruleName, 1)} />
                            <span className="checkbox-tile">
                                <div className="">
                                    <div className="">
                                    </div>
                                    <div className="">
                                        <Image
                                            src={item.image}
                                            width={500}
                                            height={500}
                                            alt="Picture of the author"></Image>
                                    </div>
                                </div>
                            </span>
                        </label>
                    </div>
                )
                )}
            </div>

            <footer className='bg-black w-full fixed bottom-0 flex flex-col items-center'>
                <div className='flex'>
                    <button onClick={startGame} type="button" className="btn-submit my-3">
                        <div className="button-top">Start Game</div>
                        <div className="button-bottom"></div>
                        <div className="button-base"></div>
                    </button>
                </div>
                <Image
                    src="/logoWhite.png"
                    alt="Vercel Logo"
                    className="dark:invert mb-4 sticky bottom-0 logo z-20 "
                    width={70}
                    height={70}
                    priority
                />
            </footer>
            {/* <div className='flex mt-10 justify-center'>
               
                <div className="group relative">
                    <button  type="button" className="button">
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
            </div> */}
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
                                            <label htmlFor="input" className="text">Rule Name:</label>
                                            <input type="text" value={exteraPlayerName} onChange={(e) => setExteraPlayerName(e.target.value)} placeholder="Write here..." name="input" className="input" />
                                        </div>
                                        <div>
                                            <div className="radio-input">
                                                <div className="info">
                                                    <span className="question">Which team do you play?</span>
                                                </div>
                                                <input type="radio" onChange={(e) => exteraPlayerTeam = (e.target.value)} id="value-1" name="value-radio" value="Mafia" />
                                                <label htmlFor="value-1">Mafia</label>
                                                <input type="radio" onChange={(e) => exteraPlayerTeam = (e.target.value)} id="value-2" name="value-radio" value="City" />
                                                <label htmlFor="value-2">City</label>

                                                <span className="result success">City</span>
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
        </main>
    )

}

export default Page