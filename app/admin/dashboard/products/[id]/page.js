"use client";
import { useParams } from 'next/navigation';
import React from 'react'

const page = () => {
  const params = useParams();
  const id = params.id;
  return (
    <div className="flex w-full flex-col gap-10 px-5 pt-5 md:px-0 md:pl-10 md:pt-8 lg:pl-20 lg:pt-10 pb-10">
      
    </div>
  )
}

export default page