import React, { useState } from 'react'

import Dashboard from './Dashboard'


function Hero() {

  return (
    <div className='bg-gradient-to-r from-[red] via-[#fe3232] to-[red]' >
      <div className='hero h-screen overflow-x-hidden   w-full overflow-scroll ' >
        <Dashboard/>  
      </div>
    </div>
    
  )
}

export default Hero
