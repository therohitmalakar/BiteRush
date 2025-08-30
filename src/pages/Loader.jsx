import {motion, useAnimate } from "motion/react"
import React, { useEffect } from 'react'
import burger from "../assets/burger.webp"
import fries from "../assets/fries.webp"
import pizza from "../assets/pizza.webp"
import taco from "../assets/taco.webp"


function Loader() {
    const [scope, animate] = useAnimate()

    async function myAnimation(){
        await animate("#imageContent",{
            clipPath:"polygon(50% 40%, 50% 40%, 50% 60%, 50% 60%)",
            display:"hidden",
        }
    );

        await animate("#imageContent",{
            clipPath:"polygon(0 40%, 100% 40%, 100% 60%, 0 60%)",
            display:"flex",
        },{
            delay:0.45,
            duration:0.4,
            ease:"easeInOut"
        })

        await animate("#imageContent",{
            clipPath:"polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            display:"flex",
        },{
            delay:0.2,
            duration:0.4,
            ease:"easeInOut"
        })
    }

    useEffect(()=>{
        myAnimation()
    },[])

    const move = {
        hidden:(i) => ({
            y:"100%",
            x:i[0],
        }),
        moveUp:(i) => ({
            y:0,
            transition:{
                delay:i[1],
                duration:0.4,
                ease:"easeInOut"
            }
        }),
        moveRight:{
            x:"10px",
            transition:{
                delay:0.8,
                duration:0.4,
                ease:"easeInOut"
            }
        },
        moveLeft:{
            x:"-10px",
            transition:{
                delay:0.8,
                duration:0.4,
                ease:"easeInOut"
            }
        },
    }

    const imgChange = {
        hidden:{
            display:"block",
        },
        show:(i) =>({
            display:"none",
            transition:{
            duration:0.6,
            delay:i,
            ease:"easeInOut"
        }
        })  
    }

    const containerUp = {
        hidden:{
            clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
        },
        show:{
            clipPath:"polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            display:"none",
            transition:{
                delay:4,
                duration:0.6,
                ease:"easeInOut",
            }
        }
    }

  return (
    
    <motion.div className='w-screen h-screen p bg-[#ff0000] absolute inset-0 z-50 overflow-hidden ' ref={scope}
    variants={containerUp} initial="hidden" animate="show" >
        <motion.section className='flex justify-center items-center w-full h-full relative ' >
            <div className='overflow-y-clip' >
                <motion.h1 className='font-gasoek text-white font-bold tracking-wide text-[45vh] ' variants={move} initial="hidden"
                animate={["moveUp"]} custom={[100,0.2]}  >BITERUSH</motion.h1>
            </div>

            {/* <div className='overflow-y-clip ' >
                <motion.h1 className='font-gasoek text-white font-bold  tracking-wide text-[22vh]  'variants={move} initial="hidden"
                animate={["moveUp"]} custom={[-100,0.3]} > RUSH</motion.h1>
            </div> */}

            <motion.div id='imageContent' className='w-[75vh] h-[75vh] absolute top-4.5 ' >
                <motion.img src={pizza} alt="" variants={imgChange} initial="hidden" animate="show" custom={1.8} className='object-cover  ' />
                <motion.img src={fries} alt="" variants={imgChange} initial="hidden" animate="show" custom={2.2} className='object-cover  ' />
                <motion.img src={taco} alt="" variants={imgChange} initial="hidden" animate="show" custom={2.6} className='object-cover  ' />
                <motion.img src={burger} alt="" transition={{delay:3, duration:0.6, ease:"easeInOut"}} className='object-cover  ' />
            </motion.div>

            
        </motion.section>
    </motion.div>
    
    
    
  )
}

export default Loader
