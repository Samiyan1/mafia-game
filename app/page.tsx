'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Loader from '../public/loader.svg';
import { useEffect, useState } from 'react';
import { setInterval } from 'timers';

export default function Home() {

  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setInterval(()=>{
      setLoading(true)
    },2000)
  }, [])


  return (
    <>
      {loading ? (
        <main className="flex overflow-hidden flex-col justify-start items-center h-screen ">
          <button className='glich-btn w-[100vw] z-20'>For Mafia Family</button>
          <Image
            src="/icone.png"
            alt="Vercel "
            className=" mb-[2px] mt-[4vh]"
            width={500}
            height={500}
            priority
          />
          <button onClick={() => { router.push('stepOne', { scroll: false }) }} className="btn-class-name mt-[15vh] z-80">
            <span className="back"></span>
            <span className="front">Start</span>
          </button>
          <Image
            src="/logoWhite.png"
            alt="Vercel Logo"
            className="mt-20 logo z-20 "
            width={100}
            height={100}
            priority
          />
        </main>
      ) : (
        <div className='flex justify-center items-center h-screen' >
          <Image
            src={Loader}
            alt="Vercel Logo"
            className=" logo z-20 "
            width={500}
            height={500}
            priority
          />
        </div>

      )}
    </>
  )



}
