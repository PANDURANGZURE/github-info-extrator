import React from 'react'
import Image from "next/image";

function app() {
  return (
    <>
    <div className='h-screen w-screen bg-white'>
      <Image className='h-20 w-20' src="./circle.png"  width={740}     // required
        height={500}  alt="" />
    </div>
    </>
  )
}

export default app