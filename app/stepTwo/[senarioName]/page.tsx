'use client'
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { MafiaScenarios } from '../dataMafiaScenarios';
import Image from 'next/image'
import './stepThree.css';
import { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react'
import { addPlayer } from '@/app/redux/reducers/counterSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux';
import { setFinalList } from '@/app/redux/reducers/ruleAndplayers';
import Link from 'next/link';
import BtnRedKey from '@/app/components/btnRedKey/btnRedKey';
import BtnMoreDetail from '@/app/components/btnMoreDetail/btnMoreDetail';
import Header from '@/app/components/header/header';
import Footer from '@/app/components/footer/footer';
import { Avatar, AvatarGroup } from "@nextui-org/react";
import { Chip } from "@nextui-org/react";

const Page = () => {

    //get slice final list
    const selectorFinalList = useSelector(setFinalList);
    const finalListState = selectorFinalList.payload.ruleAndPlayersSlice.finalList;
    const dispatch = useDispatch();

    //get state palyer slice
    const selector: any = useSelector(addPlayer);
    const playerState = selector.payload.playersSlice.players;

    //get url
    const router = useRouter()
    const useparams = useParams();
    const st: string = useparams.senarioName as string;
    const s = decodeURIComponent(st);

    //states
    let extraPlayerTeam: string = '';
    const [isOpen, setIsOpen] = useState(false);
    const [selectRule, setSelectRule] = useState<any[]>([])
    const [extraPlayerName, setExtraPlayerName] = useState<string>('')
    const [scenarioObject, setScenarioObject] = useState(MafiaScenarios.find((item) => item.title === s))


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
        const shuffledPlayerList = [...playerState];
        shuffle(shuffledPlayerList);

        if (selectRule.length === playerState.length) {

            const out: any = scenarioObject?.rules.filter((itemObject, index) => {
                return selectRule.find(itemSelect => itemSelect.ruleName === itemObject.ruleName)
            })
            const completeObj: any = out && out.map((item: any, index: number) => {
                if (!item.playerName) {
                    console.log(item)
                    item.playerName = shuffledPlayerList[index]
                }
                return item;
            })
            dispatch(setFinalList(shuffle(completeObj)));
            window.localStorage.setItem('localPlayerList', JSON.stringify(completeObj));

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

        let newScenarioObject: any = scenarioObject;
        newScenarioObject.rules.push(newRuleObject);

        setScenarioObject(newScenarioObject);
        setIsOpen(!isOpen);
    }



    return (
        <main className="h-screen">

            <Header value1='ا' value2='ه' value3=' نقش‌' value4='ب' value5='انتخا' />

            <div className='flex overflow-x-scroll mt-1 h-[42vh] overflow-y-hidden  '>
                {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}
                {scenarioObject && scenarioObject.rules.map((item: any, index: number) =>
                (

                    <div className=" border-fuchsia-800 border-b-2 border-r-2" key={index}>
                        <label className='container '>
                            <input type="checkbox" onChange={(e) => {
                                let newSelectRoule = [...selectRule];
                                if (e.target.checked) {
                                    let obj = {
                                        image: item.image,
                                        ruleName: item.ruleName,
                                        team: item.team,
                                    }
                                    newSelectRoule.push(obj);
                                    return setSelectRule(newSelectRoule)
                                } else {
                                    let filterdeArr = newSelectRoule.filter((filterItem) => {
                                        return filterItem.ruleName !== item.ruleName
                                    });
                                    return setSelectRule(filterdeArr)
                                }
                            }} />
                            <div className="checkmark flex"></div>
                            <div className="card flex justify-start items-center flex-col">
                                <div className="card-border-top">
                                </div>
                                <div>
                                    <Image
                                        draggable='false'
                                        src={item.image}
                                        height={0}
                                        width={0}
                                        sizes="100vw"
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                        }}
                                        alt="Picture of the author" />
                                </div>
                                <span>  {item.ruleName}</span>
                                <p className='description w-[90%]'>{item.description}</p>
                                <BtnMoreDetail value={'جزییات بیشتر'} className='' action={() => { router.push(`/stepTwo/${s}/${item.ruleName}`) }} />

                            </div>
                        </label>
                    </div>

                )
                )}
                <div className=" border-fuchsia-800 border-b-2 border-r-2">
                    <label className='container '>
                        <div className="checkmark flex"></div>
                        <div className="card flex justify-center items-center flex-col">
                            <div className="card-border-top">
                            </div>
                            <button className="cssbuttons-io-button h-9 w-11 flex justify-center items-center" onClick={openDialog} >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"></path><path fill="currentColor" d="M11 11V5h2v6h6v2h-6v6h-2v-6H5v-2z"></path></svg>
                            </button>
                            <span> اضافه کردن بازیکن</span>
                        </div>
                    </label>
                </div>

            </div>
            <div className='w-screen h-[50vh]'>
                <div className='flex justify-evenly items-center flex-wrap'>
                    <p className='w-[50%] text-center h-[6vh] flex justify-center items-center box-shadow'>تعداد بازیکنان {playerState.length}</p>
                    <p className='w-[50%] text-center h-[6vh] flex justify-center items-center box-shadow' >تعداد نقش ها {selectRule.length}</p>

                    <div className="w-full h-full flex-col mt-4 ">
                        <AvatarGroup isBordered>

                            {playerState.map((item: any, index: number) => {
                                return (
                                    // <p ><span> {item}</span></p>
                                    <Avatar key={index} name={item} />

                                )
                            })}
                        </AvatarGroup>
                    </div>
                </div>
                <div className='mt-4 flex justify-center items-center flex-col'>

                    <div className="w-full h-full mt-4 flex justify-between px-7">

                        <AvatarGroup isBordered isGrid max={3} className=''>
                            {selectRule.map((item, index) => {
                                if (item.team === 'مافیا') return (
                                    <Avatar color="danger" key={index} src={item.image} />
                                )
                            })}
                        </AvatarGroup>
                        <Chip color="danger" variant="shadow" size="lg">مافیا</Chip>

                    </div>
                    <div className="w-full h-full mt-4 flex justify-between px-7 ">

                        <AvatarGroup isBordered isGrid max={3} className=''>
                            {selectRule.map((item, index) => {
                                if (item.team === 'شهروند') return (
                                    <Avatar color="success" key={index} src={item.image} />
                                )
                            })}
                        </AvatarGroup>
                        <Chip color="success" variant="shadow" size="lg">شهروند</Chip>

                    </div>
                    <div className="w-full h-full mt-4 flex justify-between px-7 ">

                        <AvatarGroup isBordered isGrid max={3} className=''>
                            {selectRule.map((item, index) => {
                                if (item.team === 'مستقل') return (
                                    <Avatar color="warning" key={index} src={item.image} />
                                )
                            })}
                        </AvatarGroup>
                        <Chip color="warning" variant="shadow" size="lg">مستقل</Chip>

                    </div>

                </div>
            </div>

            <Footer
                div={<BtnRedKey color={'green'} className='w-[50vw]' action={startGame} value={'Start'} />} />

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
                        <div className="fixed inset-0 bg-
                        
                         bg-opacity-25" />
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
                                            <input type="text" value={extraPlayerName} onChange={(e) => setExtraPlayerName(e.target.value)} placeholder="Write here..." name="input" className=" w-[90%] text-black py-3 px-3" />
                                        </div>
                                        <div>
                                            <div className="radio-input">
                                                <div className="info">
                                                    <span className="question">Which team do you play?</span>
                                                </div>
                                                <input type="radio" onChange={(e) => extraPlayerTeam = (e.target.value)} id="value-1" name="value-radio" value="مافیا" />
                                                <label htmlFor="value-1">مافیا</label>
                                                <input type="radio" onChange={(e) => extraPlayerTeam = (e.target.value)} id="value-2" name="value-radio" value="شهروند" />
                                                <label htmlFor="value-2">شهروند</label>
                                                <input type="radio" onChange={(e) => extraPlayerTeam = (e.target.value)} id="value-3" name="value-radio" value="مستقل" />
                                                <label htmlFor="value-3">مستقل</label>

                                            </div>
                                        </div>
                                        <div className="mt-4 flex justify-center">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={eventAddPlayer}
                                            >
                                                Got it, thanks!
                                            </button>
                                        </div>

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