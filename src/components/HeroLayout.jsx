import React, { useState } from 'react'
import Navbar from './Navbar'
import Hero from './Hero'

function HeroLayout() {
    const [selectedSection, setSelectedSection] = useState("Dashboard")
  return (
    <div>
      
      <Hero selectedSection={selectedSection } onSelect={setSelectedSection} />
    </div>
  )
}

export default HeroLayout
