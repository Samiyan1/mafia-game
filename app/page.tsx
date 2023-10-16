'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (

    <main className="flex flex-col justify-between items-center h-screen ">
      <button className='glich-btn w-full z-20'>For Mafia Family</button>

      <Image
        src="/image/homePage.jpg"
        alt="Vercel "
        className="dark:invert mb-[2px]"
        layout='fill'
        objectFit='cover'
        priority
      />
      <button onClick={()=>{router.push('stepOne', { scroll: false })}} className="btn-class-name mt-[17rem]">
        <span className="back"></span>
        <span className="front">Start</span>
      </button>

      By{' '}
      <Image
        src="/logoWhite.png"
        alt="Vercel Logo"
        className="dark:invert mb-[2px] logo z-20 py-8"
        width={100}
        height={24}
        priority
      />
    </main>
  )
}
