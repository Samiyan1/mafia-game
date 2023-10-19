'use client';
import React from 'react'
import { MafiaScenarios } from './dataMafiaScenarios'
import Link from 'next/link';
import './stepTwo.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Image from 'next/image';

function Page() {


  return (
    <main className="h-screen overflow-scroll justify-start relative  flex flex-col items-center">
      <header className='bg-black sticky top-0 z-30 w-full flex flex-col items-center p-2 '>
        <p className="py-2 ">
          choose scenario
        </p>
      </header>
      <div className='flex  flex-col mt-1 overflow-scroll'>
        {MafiaScenarios && MafiaScenarios.map((item: any, index: number) => {
          return (
            <Link href={`./stepTwo/${item.title}`} key={index}>
              <div className='card-scenario bg-black mt-3 w-[90vw] h-[40vh]  flex mb-2 justify-evenly '>
                <div className='image img w-[60vw] h-[26vh] '>
                  <Image
                    src={item.scenarioImage}
                    alt="image of scenario card"
                    className="scenario-image"
                    width={500}
                    height={500}
                    objectFit='contain'
                    priority
                  />
                </div>
                <div className=' mb-2 mr-3 flex justify-center flex-col'>
                  <div className='title '>{item.title}</div>
                  <div className='descriptaion w-14 h-[30vh]'>{item.scenarioDecription}</div>
                </div>
              </div></Link>
          )
        })}
      </div>
      <footer className='bg-black w-full fixed bottom-0 flex flex-col items-center'>
        <Image
          src="/logoWhite.png"
          alt="Vercel Logo"
          className="mb-4 sticky bottom-0 logo z-20 pt-2"
          width={100}
          height={100}
          priority
        />
      </footer>
    </main>
  )
}

export default Page