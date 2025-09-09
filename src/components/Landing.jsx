import React from 'react'
import {motion} from "motion/react"
import burger from "../assets/burger.webp"
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom'
import Loader from '@/pages/Loader'
import Footer from './Footer'
import { Toaster } from 'sonner'

function Landing() {
  const navigate = useNavigate();

  const containerUp = {
        hidden:{
            clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
        },
        show:{
            clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            opacity:0,
            transition:{
                delay:0.5,
                duration:0.9,
                ease:"easeInOut",
            }
        }
    }
  return (
    <>
    {/* <Loader/> */}
    <Toaster richColors  />
    <motion.div className='bg-[#eaeaea] absolute inset-0 z-20 mix-blend-exclusion pointer-events-none ' variants={containerUp} initial="hidden" animate="show" ></motion.div>
    <div className='min-h-screen bg-gradient-to-r from-[red]   via-[#fe3232] to-[red] z-20 ' >
      
      <div className='h-[70vh] relative flex justify-center' >
        
        <h1 className='font-gasoek absolute top-10 text-[45vh] text-white tracking-wide ' >BURGER</h1>
        <img className='absolute h-[75vh] -top-10 z-30  drop-shadow-2xl shadow-black transform transition-transform duration-300
         hover:scale-101 ' src={burger} alt="burger" />
      </div>
      <div className='flex h-[18vh]' >
      <div className='w-[30%] ml-15 flex justify-center items-center ' >
        <p className='font-bebas text-sm  text-white ' >Craving something delicious? BiteRush brings your favorite meals right to your fingertips. From sizzling pizzas to juicy burgers and healthy bowls, we make ordering food fast, simple, and hassle-free.</p>
      </div>
      <div className='w-[40%] pr-20 flex flex-col items-center  justify-end ' >
        <Button className="w-25" onClick={()=>navigate("/menu")} >Order Now</Button>
      </div>
      </div>
    </div>
    </>
  )

}

export default Landing
