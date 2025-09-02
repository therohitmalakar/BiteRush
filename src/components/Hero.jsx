import React, { useState } from 'react'

import Dashboard from './Dashboard'

function Hero() {

  const [selectedSection, setSelectedSection] = useState("Dashboard")

  const renderComponent = () =>{
    switch (selectedSection){
      case "Dashboard":
        return <Dashboard/>;
        }
       }
  return (
    
    <div className='bg-gradient-to-r from-[red] via-[#fe3232] to-[red]' >
      {/* <Sidebar onSelect={setSelectedSection} /> */}
      <div className='hero h-screen overflow-x-hidden  w-full overflow-scroll ' >
        {renderComponent()}
        
      </div>
      
    </div>
  )
}

export default Hero
