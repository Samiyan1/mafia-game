'use client';
import Image from 'next/image';
import './rozeMoarefe.css';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { setFinalList } from '@/app/redux/reducers/ruleAndplayers';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import Timer from './timer';
import { useRouter } from 'next/navigation'
import { useState, Fragment } from 'react';
import BtnAmongUs from '@/app/components/btnAmungUs/btnAmongUs';

function Page() {
  const router = useRouter()

  const useparams = useParams();
  const senarioName: string = useparams.senarioName as string;
  const urlSenarioName = decodeURIComponent(senarioName);

  const selectorFinalList = useSelector(setFinalList);
  const [finalListState, setFinalListState] = useState([...selectorFinalList.payload.ruleAndPlayersSlice.finalList]);



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

  function removeLocalData() {
    localStorage.setItem('localPlayerList', JSON.stringify(''))
    router.push('/stepOne')
  }

  return (
    <main className='h-screen w-screen'>
      <header className='bg-black sticky top-0 z-30 w-full flex flex-col items-center'>
        <button className="btn w-full ">
          <span className="text text-[2rem]">روز معارفه</span>
        </button>
      </header>
      <div className='flex  flex-col h-[100vh] overflow-x-hidden items-center justify-start flex-wrap  mx-4 my-3 overflow-y-scroll'>
        <div className='w-full flex justify-evenly  items-center '>
          <p className=' w-[40vw] text-center text-[1.5rem]'>بازیکن</p>
          <p className=' w-[40vw] text-center text-[1.5rem]'>نقش</p>
        </div>
        {finalListState && finalListState.map((item: any, index: number) => {
          return (
            <div key={index} className='w-[90vw] h-[6vh] bg-slate-700  mt-4 flex justify-evenly
             items-center card-glass'>
              <p className='text-white  text-center text-[13px]  w-[20vw]'>{item.playerName}</p>
              <Timer />
              <p className='text-white  text-center text-[13px] w-[20vw]'>{item.ruleName}</p>
            </div>)
        })}
      </div>

      <footer className='bg-black w-full fixed bottom-0 flex flex-col items-center mt-4'>

        <BtnAmongUs className='mt-4' value='next' action={()=>{router.push('/first-night')}} value1='now!'/>

        <Image
          src="/logoWhite.png"
          alt="Vercel Logo"
          className="mb-4 sticky bottom-0 logo z-20 "
          width={70}
          height={70}
          priority
        />
      </footer>
    </main>

  )
}

export default Page