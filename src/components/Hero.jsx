import React, { useState } from 'react'
// import Sidebar from './Sidebar'
import Dashboard from './Dashboard'
import Cart from './Cart'
import Favourite from './Favourite'
import Navbar from './Navbar'


function Hero() {

  const [selectedSection, setSelectedSection] = useState("Dashboard")

  const renderComponent = () =>{
    switch (selectedSection){
      case "Dashboard":
        return <Dashboard/>;
      //   case "Food Order":
      //   return <div className="p-4">Food Order Component</div>;
      //   case "Cart":
      //     return <Cart/>
      // case "Favourite":
      //   return <Favourite/>
      // case "Message":
      //   return <div className="p-4">Message Component</div>;
      // case "Order History":
      //   return <div className="p-4">Order History Component</div>;
      // default:
      //   return <div className="p-4">Select a section</div>;
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
