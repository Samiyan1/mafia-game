'use client';
import React from 'react'
import { MafiaScenarios } from './dataMafiaScenarios'
import Link from 'next/link';
import './stepTwo.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Image from 'next/image';

function Page() {


  return (
    <main className=' h-screen overflow-hidden scroll-auto flex justify-around mt-9 items-center'>
        {MafiaScenarios && MafiaScenarios.map((item: any, index: number) => {
          return (
          <div className="card-senario h-[50vh]" key={index}>
            <div className="img h-5 w-5"></div>
            <span>{item.title}</span>
            <p className="info"> {item.rules.map((item: any) => (" , " + item.ruleName + ''))} </p>
            <div className="share">
            </div>
            <Link href={`./stepTwo/${item.title}`}>
              <button className="button-senario">
                BUTTON
              </button>
            </Link>
          </div>


  // <div className="card-scenario h-[50vh] mx-2  flex flex-col items-center" key={index}>
            //   <div className="img ">
            //     <Image
            //       src={item.scenarioImage}
            //       alt="Vercel Logo"
            //       className=""
            //       width='100'
            //       height='100'
            //       objectFit='contain'
            //       priority
            //     />
            //   </div>
            //   <span>{item.title}</span>
            //   <p className="info"> {item.rules.map((item: any) => ("  " + item.ruleName + ' , '))} </p>
            //   <div className="share">
            //   </div>
            //   <Link href={`./stepTwo/${item.title}`}>
            //     <button className="button-scenario mb-4 font-mono ">
            //       Select
            //     </button>
            //   </Link>
            // </div>
        )
      })}
    </main>
  )
}

export default Page