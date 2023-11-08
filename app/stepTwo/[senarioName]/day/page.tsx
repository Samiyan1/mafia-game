'use client';
import Image from 'next/image';
import './day.css';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { setFinalList } from '@/app/redux/reducers/ruleAndplayers';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import Timer from '../rozeMoarefe/timer';
import { useRouter } from 'next/navigation'
import { useState, Fragment } from 'react';
import BtnAmongUs from '@/app/components/btnAmungUs/btnAmongUs';
import Header from '@/app/components/header/header';
import Footer from '@/app/components/footer/footer';
import Clock from "../../../../public/icon/clock-time.svg";
import EyeHide from "../../../../public/icon/eye-hide.svg";
import EyeVisible from "../../../../public/icon/eye-visible.svg";
import Note from "../../../../public/icon/note.svg";
import Vote from "../../../../public/icon/vote.svg";
import { Dialog, Transition } from '@headlessui/react'
import { Avatar, Switch } from "@nextui-org/react";
import DropdownNextUi from '@/app/components/dropDown/dropdownNextUi';
import SwitchKey from '@/app/components/swichKey/SwitchKey';

function Page() {
  const router = useRouter()
  const useparams = useParams();
  const senarioName: string = useparams.senarioName as string;
  const urlSenarioName = decodeURIComponent(senarioName);

  // let mafiaCount = 0;
  // let cityCount = 0;

  const selectorFinalList = useSelector(setFinalList);
  const [finalListState, setFinalListState] = useState([...selectorFinalList.payload.ruleAndPlayersSlice.finalList]);
  const [day, setDay] = useState(true);
  const [hidePlayer, setHidePlayer] = useState(false);
  const [timerShow, setTimerShow] = useState(false);
  const [openNote, setOpenNote] = useState(false);
  const [noteValue, setNoteValue] = useState('');

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedItems: any = JSON.parse(window.localStorage.getItem('localPlayerList') || '');

      if (storedItems && storedItems.length >= 4) {

        setFinalListState([...storedItems])

      } else {
        window.localStorage.setItem('localPlayerList', JSON.stringify(finalListState))
      }
    }

  }, [])

  // useEffect(() => {
  //   countMafia()
  //   countCity()
  // }, [finalListState])

  function removeLocalData() {
    localStorage.setItem('localPlayerList', JSON.stringify(''))
    router.push('/stepOne')
  }

  function closeModalNote() {
    setOpenNote(false)
  }

  function openModalNote() {
    setOpenNote(true)
  }

  // function countMafia() {
  //   finalListState.map((item: any, index: number) => {
  //     if (item.team === 'مافیا') {
  //       mafiaCount += 1;
  //     }
  //   })
  // }
  // function countCity() {
  //   finalListState.map((item: any, index: number) => {
  //     if (item.team === 'شهروند') {
  //       cityCount += 1;
  //     }
  //   })
  // }
  return (
    <main className={`${day ? 'main-light' : null} h-screen w-screen`}>
      {
        day ? <Header div={<SwitchKey action={()=>{setDay(!day)}}/>}  /> : <Header value1=''div={<SwitchKey action={()=>{setDay(!day)}}/>} />
      }
      <div className='flex  flex-col h-[75vh] overflow-hidden items-center justify-start overflow-y-scroll mx-1 my-3 '>

        {finalListState && finalListState.map((item: any, index: number) => {
          return (
            <div key={index} className={`w-[90vw] h-[12vh] p-2 mt-2 flex justify-between items-center  ${day ? 'card-glass-light' : `card-glass`}`}>
              <div className='flex justify-around items-center flex-col h-full'>
                {hidePlayer && (
                  <>
                    <p className='text-black text-center text-[16px] w-[20vw] '>{item.ruleName}</p>
                    <Avatar isBordered radius="lg" color={item.team === 'مافیا' ? 'danger' : item.team === 'شهروند' ? 'success' : 'warning'} src={item.image} />
                  </>
                )}
              </div>
              <p className='text-white text-center text-[16px]  w-[20vw]'>{item.playerName}</p>


              {
                day ? (
                  <div className='flex justify-evenly items-center flex-col h-full'>
                    <input type='number' className='w-[60%] h-[100%] mb-3 border-b-slate-600 border-x-2 card-glass-light text-white text-center number-input ' min={0} max={finalListState.length - 1} />
                    <div className="switch">
                      <input className="switch-check" id={item.playerName} type="checkbox" />
                      <label className="switch-label" htmlFor={item.playerName}>
                        <span></span>
                      </label>
                    </div>
                  </div>
                ) : <DropdownNextUi />
              }
            </div>)
        })}


      </div>
      <div>
        {
          timerShow && (
            <div className='fixed bottom-[7vh] flex w-full p-1 bg-black h-[10vh] rounded-full'>
              <Timer />
            </div>
          )
        }
        {
          hidePlayer && (
            <div className='fixed bottom-[7vh] flex w-full card-glass-light h-[10vh] rounded-full'>
              {/* <div className='text-white flex justify-center items-center w-[40%]'>
                {cityCount}
              </div>
              <div>
                {mafiaCount}
              </div> */}
              <button>

              </button>
            </div>
          )
        }
        <div className='h-[7vh] w-full fixed bottom-0 flex justify-evenly items-center  bg-black'>
          <button className='w-[20vw] flex justify-center items-center' onClick={() => setTimerShow(!timerShow)}>
            <Image
              draggable='false'
              src={Clock}
              height={0}
              width={0}
              style={{
                width: '80%',
                height: 'auto',
              }}
              alt="Picture of the author" />
          </button>
          <button className='w-[20vw] flex justify-center items-center'>
            <Image
              draggable='false'
              src={Vote}
              height={0}
              width={0}
              style={{
                width: '80%',
                height: 'auto',
              }}
              alt="Picture of the author" />
          </button>
          <button className='w-[20vw] flex justify-center items-center' onClick={() => { setHidePlayer(!hidePlayer), setTimerShow(false) }}>
            <Image
              draggable='false'
              src={hidePlayer ? EyeHide : EyeVisible}
              height={0}
              width={0}
              style={{
                width: '90%',
                height: 'auto',
              }}
              alt="Picture of the author" />
          </button>
          <button className='w-[20vw] flex justify-center items-center' onClick={openModalNote}>
            <Image
              draggable='false'
              src={Note}
              height={0}
              width={0}
              style={{
                width: '80%',
                height: 'auto',
              }}
              alt="Picture of the author" />
          </button>
        </div>

      </div>
      <Transition appear show={openNote} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModalNote}>
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
                <Dialog.Panel className="w-full max-w-md h-[70vh] transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 text-center"
                  >
                    <div className='flex justify-evenly items-center mb-5'>
                      <div className='text-gray-900 text-[30px]'>یادداشت</div>
                    </div>
                  </Dialog.Title>
                  <div className="mt-2">
                    <textarea value={noteValue} onChange={(e) => { setNoteValue(e.target.value) }} className='text-black w-full h-[30vh] p-4 border-8 direction'></textarea>
                  </div>

                  <div className="mt-6 text-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModalNote}
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
      {/* <Footer /> */}
    </main>

  )
}

export default Page