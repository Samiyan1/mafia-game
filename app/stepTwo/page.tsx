'use client';
import React from 'react'
import { withRouter } from 'next/router'
import { usePathname, useSearchParams } from 'next/navigation'

function page(props :any) {
    const searchParams = useSearchParams();
 
    console.log(searchParams.get('data'));

  return (
    <div>{searchParams}</div>
  )
}

export default page