'use client';
import Image from 'next/image';
import {Person} from './data';
import React, { useState } from 'react';
import {data7 , data8 ,data9 ,data10} from './data';
import Link from 'next/link'

export default function Home() {
  const [personNumber,setPersonNmber] = useState<string>('');
  const [sevenPerson,setSevenPerson] = useState<Person []>();
  const [eightPerson,setEightPerson] = useState<Person []>();
  const [ninePerson,setNinePerson] = useState<Person []>();


  return (

    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        Mafia
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href=""
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/FeedUs.png"
              alt="Vercel Logo"
              className="dark:invert mb-[2px]"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="mb-9">
        <p className='w-80 text-center text-[20px]'> به شب های مافیا خوش آمدید</p>
      </div>

      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        <Link
          href="/stepOne"
          className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30"
          rel="noopener noreferrer"
        >
          <h2 className={`mb-3 text-2xl font-semibold`}>
            Lets paly{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            پدر خوانده , دکتر لکتر , پزشک , شهردار , اسنایپر , جان سخت , روان شناس  
          </p>
        </Link>
      </div>
    </main>
  )
}
