import Image from 'next/image'
import React, { useState } from 'react'
import imgOne from "../../public/bg-img/image 21.png"
import imgTwo from "../../public/bg-img/image 14.png"
import {motion} from "framer-motion"

const StyledCharacters = () => {
   
    const transition : any = {
  duration: 0.8,
  delay: 0.5,
  ease: [0, 0.71, 0.2, 1.01],
}
  return (
   <div className='absolute flex justify-between items-center'>
   
    <motion.div
  transition={transition}
  initial={{ x: -2000 }}
  animate={{ x: -300 }}
  className='w-1/2'
  
    >
        <Image src={imgOne} width={1000} height={300} alt="Logo" className="w-full drop-shadow-[0_0_15px_rgba(25,255,100,0.6)]" />
    </motion.div>
 
      
      <motion.div
        transition={transition}
  initial={{ x: 2000 }}
  animate={{ x: 300 }}
  className='w-1/4'
      >
        <Image src={imgTwo} width={1000} height={300} alt="Logo" className="w-full drop-shadow-[0_0_15px_rgba(25,255,100,0.6)]" />
      </motion.div>
   
   </div>
  )
}

export default StyledCharacters
