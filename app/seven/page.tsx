'use client';
import Image from 'next/image';
import { Person } from '../data';
import React, { useState } from 'react';
import { data7 } from '../data';

export default function Home() {
  const [sevenPerson, setSevenPerson] = useState<Person[]>(data7);
 
  return (

    <main className=" overflow-auto min-h-screen max-h-48 flex-col items-center justify-between ">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-2 pt-4 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Mafia
        </p>
        <div className="fixed bottom-0 left-0 flex h-42 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-4 lg:pointer-events-auto lg:p-0"
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

      <div>
        <div className='mb-5 m-auto'>
          <button className=' border-b border-gray-300 px-6 py-2 rounded-xl backdrop-blur-2xl dark:border-neutral-800 dark:from-inherit  lg:rounded-xl lg:border lg:bg-gray-200 ' onClick={showGame}>Shuffle</button>
          <span className="inline-block ml-3 transition-transform group-hover:translate-x-1 motion-reduce:transform-none">

          </span>
          <div className='mt-6'>
            {sevenPerson && (sevenPerson.length > 1) && sevenPerson.map((item, index) => {
              return (
                <div key={item.id} className='flex flex-col justify-around items-center'>
                  <div className='mb-2'>{item.tag}</div>
                  <div key={item.id} className='flex justify-around items-center'>
                    <input required onChange={(e) => {
                      item.name = e.target.value;
                    }} className='w-50 h-10 mb-3'></input>
                    <div className='mb-3 ml-2'>{index + 1}</div>
                  </div>
                </div>
              )
            })}
          </div>
          <button className=' border-b border-gray-300 px-6 py-2 rounded-xl backdrop-blur-2xl dark:border-neutral-800 dark:from-inherit  lg:rounded-xl lg:border lg:bg-gray-200 ' onClick={notify}>submit </button>
        </div>
      </div>
    </main>
  )

  function goToNext() {
   
  }

  function showGame() {
    const newOrder = shuffle(data7)
    setSevenPerson([...newOrder]);
  }

  function shuffle(array: Person[]) {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {

      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  }
}
