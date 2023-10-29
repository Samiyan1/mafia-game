'use client';
import React from 'react'
import { MafiaScenarios } from './dataMafiaScenarios'
import Link from 'next/link';
import './stepTwo.css'
import Image from 'next/image';
import Header from '@/app/components/header/header';
import { useRouter } from 'next/navigation'
import BtnMoreDetail from '../components/btnMoreDetail/btnMoreDetail';
import Footer from '../components/footer/footer';

function Page() {
  const router = useRouter()


  return (
    <main className="h-screen justify-start relative  flex flex-col items-center">
      <Header value1='و' value2=' سناری' value3='اب' value4='خ' value5='انت' />

      <div className='flex flex-wrap justify-evenly  mt-2 overflow-y-scroll h-auto'>
        {MafiaScenarios && MafiaScenarios.map((item: any, index: number) => {
       
          return (
              <div key={index} onClick={()=> router.push(`./stepTwo/${item.title}`)} className='card-scenario bg-black mt-2 w-[47vw] h-[40vh] flex-col flex justify-start items-center '>
                <Image
                  src={item.scenarioImage}
                  alt="image of scenario card"
                  height={0}
                  draggable='false'
                  className=''
                  width={0}
                  sizes="80vw"
                  style={{
                    width: '100%',
                    height: '70%',
                  }}
                />
                <div className=' mb-2 flex justify-between flex-col'>
                  <div className='title text-white'>{item.title}</div>
                  <div className='descriptaion'>{item.scenarioDecription}</div>
                  <BtnMoreDetail action={() => { router.push(`/stepTwo/${item.title}`) }} value={'more'} className='' />
                </div>
              </div>
          )
        })}
      </div>
      <Footer src='/logoWhite.png' className='' action={() => { router.push('/') }} />

    </main>
  )
}

export default Page