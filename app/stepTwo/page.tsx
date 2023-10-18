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
      <header className='bg-black sticky top-0 z-30 w-full flex flex-col items-center'>
        <p className="py-2 ">
          choose scenario
        </p>
      </header>
      <div className='flex  flex-col mt-1'>
        {MafiaScenarios && MafiaScenarios.map((item: any, index: number) => {
          return (
            <Link href={`./stepTwo/${item.title}`} key={index}>
              <div className='card-scenario flex bg-black mt-3 w-[89vw] h-[16vh] rounded items-center justify-around'>
                <div className='image img w-9 rounded-[50px] h-9 m-4'>
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
                <div className='flex justify-center flex-col items-center mb-2 mr-3'>
                  <div className='title '>{item.title}</div>
                  <div className='descriptaion w-12 h-10'>{item.scenarioDecription}</div>
                </div>
              </div></Link>
          )
        })}
      </div>
      <footer className='bg-black w-full fixed bottom-0 flex flex-col items-center'>
        <Image
          src="/logoWhite.png"
          alt="Vercel Logo"
          className="dark:invert mb-4 sticky bottom-0 logo z-20 pt-2"
          width={100}
          height={100}
          priority
        />
      </footer>
    </main>
  )
}

export default Page