'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation'
export default function Home() {
  const router = useRouter()

  return (

    <main className="flex overflow-hidden flex-col justify-start items-center h-screen ">
      <button className='glich-btn w-[100vw] z-20'>For Mafia Family</button>
      <Image
        src="/image/homePage.jpg"
        alt="Vercel "
        className=" mb-[2px]"
        layout='fill'
        objectFit='cover'
        priority
      />
      <button onClick={() => { router.push('stepOne', { scroll: false }) }} className="btn-class-name mt-[58vh]">
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
  )
}
