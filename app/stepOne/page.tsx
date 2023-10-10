'use client';
import Image from 'next/image';
import { Person } from '../data';
import React, { useEffect, useState } from 'react';
import { data7 } from '../data';
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation'
import { addPlayer } from '../redux/reducers/counterSlice';
import {useDispatch,useSelector} from 'react-redux';
import store from '../redux/store/store';

export default function Home() {
  
 
  const [name, setName] = useState('');

  const selector = useSelector(addPlayer);
  const playerState = selector.payload.playersSlice.players
  const SetAddPlayers= useDispatch();

  useEffect(() => {
    console.log(playerState)
  } , [playerState.length])

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
        <div className='mb-5 m-auto mt-20 flex flex-col justify-center items-center'>
          <div className='mb-2 w-[50vw] text-center mb-6'>اسم بازیکن را وارد نموده سپس روی گزینه  افزودن کلیک کنید  </div>
          <input required value={name} onChange={(e) => setName(e.target.value)} className='w-50 h-10 mb-3'></input>
          <button onClick={addPlayers} className='w-50 h-10 mb-3'>add</button>

        </div>
        <div className='mt-6'>
          {playerState && playerState.map((item : any, index : number) => {
            return (
              <div key={index} className='flex flex-col justify-around items-center'>
                {item}
              </div>
            )
          })}
          <button onClick={() => {



          }} className='w-50 h-10 mb-3'>add</button>
        </div>
      </div>
    </main >
  )

  function addPlayers() {
    console.log(name);
    const duplicate :boolean = playerState.some((x:string) :boolean=> x === name);
    console.log(duplicate);
    
    if(name && !duplicate){
      SetAddPlayers(addPlayer(name))
      setName('')
    }else{
      notify("error", "Error!")
    }
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
