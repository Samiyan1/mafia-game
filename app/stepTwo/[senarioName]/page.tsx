'use client'
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { MafiaScenarios } from '../dataMafiaScenarios';
import Image from 'next/image'
import './stepThree.css';
import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { addPlayer } from '@/app/redux/reducers/counterSlice';
import PlusSvg from '../../../public/plus-svgrepo-com.svg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { setFinalList } from '@/app/redux/reducers/ruleAndplayers';

const Page = () => {

    //get slice final list
    const selectorFinalList = useSelector(setFinalList);
    const finalListState = selectorFinalList.payload.ruleAndPlayersSlice.finalList;
    const dispatch = useDispatch();

    //get state palyer slice
    const selector = useSelector(addPlayer);
    const playerState = selector.payload.playersSlice.players;

    //get url
    const router = useRouter()

    const useparams = useParams();
    const st: string = useparams.senarioName as string;
    const s = decodeURIComponent(st);

    //states
    let extraPlayerTeam: string = '';
    const [showStepThree, setShowStepThree] = useState(true);
    const [showMoarefe, setShowMoarefe] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectRule, setSelectRule] = useState<string[]>([])
    const [extraPlayerName, setExtraPlayerName] = useState<string>('')
    const [scenarioObject, setScenarioObject] = useState(MafiaScenarios.find((item) => item.title === s))
    const [addExtraPlayer, setAddExtraPlayer] = useState(
        {
            ruleName: '',
            playerName: '',
            description: '',
            image: '/image/unknowPlayer.jpg',
            team: '',
        },
    );


    useEffect(() => {
        console.log(addExtraPlayer);
        console.log(finalListState)

    }, [addExtraPlayer])




    const shuffle = (array: any) => {
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

     
        console.log(scenarioObject);
        
        // const shuffledSelectRule = shuffle(selectRule);


        if (selectRule.length === playerState.length) {

            const out = scenarioObject?.rules.filter((itemObject, index) => {
                return selectRule.find(itemSelect => itemSelect === itemObject.ruleName)
            })

            const completeObj = out && out.map((item , index) => {
                item.playerName = playerState[index]
                return item;
            })

            console.log(completeObj)

            dispatch(setFinalList(completeObj));
            router.push(`${s}/moarefe`)

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
        if (!extraPlayerTeam) {
            return toast.error(`تیم را انتخاب نمایید`)

        }
        const newRuleObject: any = {
            ruleName: extraPlayerName,
            playerName: '',
            description: extraPlayerTeam === 'City' ? "به شهر کمک کن" : 'به مافیا کمک کن',
            image: '/image/unknowPlayer.jpg',
            team: extraPlayerTeam,
        };
        console.log(newRuleObject)

        setAddExtraPlayer(newRuleObject);
        let newScenarioObject: any = scenarioObject;
        newScenarioObject.rules.push(addExtraPlayer);
        setScenarioObject(newScenarioObject);
        setIsOpen(!isOpen);
    }



    return (
        <main className="h-screen justify-start relative  flex flex-col items-center">

            <header className='bg-black sticky top-0 z-30 w-full flex justify-between items-center px-8 py-4'>
                <p className=" ">
                    choose scenario
                </p>
                <button className="cssbuttons-io-button h-9 w-11 flex justify-center" onClick={openDialog}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path></svg>
                </button>
            </header>
            <div className='flex flex-wrap justify-evenly items-center mt-3  overflow-scroll'>
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
                    className=" mb-4 sticky bottom-0 logo z-20 "
                    width={70}
                    height={70}
                    priority
                />
            </footer>

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
                                            <input type="text" value={extraPlayerName} onChange={(e) => setExtraPlayerName(e.target.value)} placeholder="Write here..." name="input" className="input" />
                                        </div>
                                        <div>
                                            <div className="radio-input">
                                                <div className="info">
                                                    <span className="question">Which team do you play?</span>
                                                </div>
                                                <input type="radio" onChange={(e) => extraPlayerTeam = (e.target.value)} id="value-1" name="value-radio" value="Mafia" />
                                                <label htmlFor="value-1">Mafia</label>
                                                <input type="radio" onChange={(e) => extraPlayerTeam = (e.target.value)} id="value-2" name="value-radio" value="City" />
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