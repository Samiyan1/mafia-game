'use client';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addPlayer } from '../redux/reducers/counterSlice';
import {MafiaScenarios} from './dataMafiaScenarios'
import Link from 'next/link';
import './stepTwo.css'
function Page() {


  return (
    <div className='flex'>
      {MafiaScenarios && MafiaScenarios.map((item: any, index: number) => {
        return (
          <div className="card" key={index}>
            <div className="card-border-top">
            </div>
            <div className="img">
            </div>
            <span> {item.title}</span>
            <p className="job"> {item.rules.map((item :any)=> (" " + item.ruleName + '') )}</p>
            <Link href={`./stepTwo/${item.title}`}><button> Click
            </button></Link>
          </div>
        )
      })}
    </div>
  )
}

export default Page