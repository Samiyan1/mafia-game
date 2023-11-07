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
import Header from '@/app/components/header/header';
import Footer from '@/app/components/footer/footer';
import BtnRedKey from '@/app/components/btnRedKey/btnRedKey';

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
      <Header value1='فه' value2='ر' value3=' معا' value4='ز' value5='رو' />

      <div className='flex  flex-col flex-nowrap h-[75vh] overflow-x-hidden items-center  mx-4 my-3 overflow-y-scroll'>

        {finalListState && finalListState.map((item: any, index: number) => {
          return (
            <div key={index} className='w-[90vw] h-[6vh] bg-slate-700  mt-3 flex justify-evenly
             items-center card-glass'>
              <p className='text-white  text-center text-[13px]  w-[20vw]'>{item.playerName}</p>
              <p className='text-white  text-center text-[13px] w-[20vw]'>{item.ruleName}</p>
              {/* <input type='number'className='w-[9%] h-[90%] text-black text-center' max={finalListState.length - 1}/> */}
            </div>)
        })}
      </div>
      <Footer
        div={<BtnRedKey color={'green'} className=' w-[50vw] ' action={()=>{router.push('/stepTwo/پدرخوانده/day')}} value={'play'} />}
         />
    </main>

  )
}

export default Page