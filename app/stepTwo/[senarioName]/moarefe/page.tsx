'use client';
import Image from 'next/image';
import './moarefe.css';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { setFinalList } from '@/app/redux/reducers/ruleAndplayers';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useState, Fragment } from 'react';
import { useRouter } from 'next/navigation'
import { Dialog, Transition } from '@headlessui/react'
import BtnAmongUs from '@/app/components/btnAmungUs/btnAmongUs';
import useLocalData from '@/app/hooks/useLocalData';
import BtnRedKey from '@/app/components/btnRedKey/btnRedKey';

function Page() {
  const router = useRouter()

  const dispatch = useDispatch();

  const useparams = useParams();
  const senarioName: string = useparams.senarioName as string;
  const urlSenarioName = decodeURIComponent(senarioName);

  const selectorFinalList = useSelector(setFinalList);
  const [finalListState, setFinalListState] = useState([...selectorFinalList.payload.ruleAndPlayersSlice.finalList]);
  let [playerName, setPlayerName] = useState('')
  let [ruleName, setRuleName] = useState('')
  let [description, setDescription] = useState('')
  let [isOpen, setIsOpen] = useState(false)




  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedItems: any = JSON.parse(window.localStorage.getItem('localPlayerList') || '');

      if (storedItems && (storedItems.length >= 4)) {

        setFinalListState([...storedItems])

      } else {
        window.localStorage.setItem('localPlayerList', JSON.stringify(finalListState))
      }
    }

  }, [])

  function removeLocalData() {
    localStorage.setItem('localPlayerList', JSON.stringify(''))
    router.push('/stepOne')
  }


  function nextStep() {
    dispatch(setFinalList([...finalListState]));
    router.push(`/stepTwo/${urlSenarioName}/rozeMoarefe`)
  }

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const removePlayer: any = (playerName: string, ruleName: string, description: string) => {
    setRuleName(ruleName)
    setPlayerName(playerName)
    setDescription(description)
    openModal()
    setFinalListState(finalListState.filter((itemRemove) => itemRemove.playerName !== playerName))
    // router.push(`/stepTwo/${urlSenarioName}/moarefe/${playerName}`)

  }

  return (
    <main className='h-screen w-screen'>
      <header className='bg-black sticky top-0 z-30 w-full flex flex-row items-center'>
        <button className="btn w-full flex justify-center">
          <p className="text text-[3rem]">شب معارفه</p>
        </button>

      </header>

      {
        (finalListState.length > 0) ? (
          <div className='flex  flex-col items-center justify-center flex-wrap  mx-4 mt-4 '>
            <div className='w-full flex justify-center  items-center '>
              <p className=' w-[40vw] text-center text-[2rem]'>بازیکن</p>
              <p className=' w-[40vw] text-center text-[2rem]'>مشاهده</p>
            </div>

            <div className='overflow-y-scroll'>
              {finalListState && finalListState.map((item: any, index: number) => {
                return (
                  <div key={index} className='w-[90vw] h-[6vh] bg-slate-700  mt-4 flex justify-between items-center card-glass'>
                    <div>
                      <p className='text-white text-[25px]  w-[25vh] text-center'>{item.playerName}</p>
                    </div>
                    <button onClick={() => removePlayer(item.playerName, item.ruleName, item.description)} className='btn-show h-19'>
                      <span >show</span>
                    </button>
                  </div>)
              })}
            </div>
          </div>
        )
          : (
            <div className='flex justify-center items-center h-[70vh]'>
              <BtnRedKey className=' w-[50vw] mr-2' action={nextStep} value={'play'} />
            </div>
          )
      }

      <footer className='bg-black w-full fixed bottom-0 flex flex-col items-center'>
        <div className='flex flex-row flex-nowrap'>
          <BtnRedKey className='w-[50vw]' action={removeLocalData} value={'reset'} />
        </div>

        <Image
          src="/logoWhite.png"
          alt="Vercel Logo"
          className="sticky bottom-0 logo z-20 my-4"
          width={100}
          height={100}
          priority
        />
      </footer>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                      <div className='text-gray-900 text-[30px]'>{playerName}</div>
                      <div className='text-gray-900 text-[30px] font-[700]'>{ruleName}</div>
                    </div>
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-black">
                      {description}
                    </p>
                  </div>

                  <div className="mt-6 text-center">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-700 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
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
    </main >

  )
}

export default Page