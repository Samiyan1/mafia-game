'use client'
import React from 'react'
import { useParams } from 'next/navigation'
import { usePathname, useSearchParams } from 'next/navigation'
import { log } from 'console'

const page = () => {
    // const pathname = usePathname()
    const useparams = useParams();
    const st : string = useparams.stepId as string;
    const s = decodeURIComponent(st);
    console.log(s);
    

    return (
        <div>
            {s}

        </div>
    )
}

export default page