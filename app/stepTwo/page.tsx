'use client';
import React from 'react'
import { MafiaScenarios } from './dataMafiaScenarios'
import Link from 'next/link';
import './stepTwo.css'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

function Page() {


  return (
    <main className=' h-screen overflow-hidden scroll-auto flex justify-around mt-9 items-center'>
      {MafiaScenarios && MafiaScenarios.map((item: any, index: number) => {
        return (
          <div className="card-senario h-[50vh]">
            <div className="img h-5 w-5"></div>
            <span>About Me</span>
            <p className="info">oyable and meaningful experiences. I specialize in responsive websites and functional user interfaces.</p>
            <div className="share">
            </div>
            <button className="button-senario">
              BUTTON
            </button>
          </div>
          // <div className="card" key={index}>
          //   <div className="card-border-top">
          //   </div>
          //   <div className="img">
          //   </div>
          //   <span> {item.title}</span>
          //   <p className="job"> {item.rules.map((item :any)=> (" " + item.ruleName + '') )}</p>
          //   <Link href={`./stepTwo/${item.title}`}><button> Click
          //   </button></Link>
          // </div>
        )
      })}
    </main>
  )
}

export default Page