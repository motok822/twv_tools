import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

function Select_equip() {
    const location = useLocation();
    console.log(location)
    const [ClimbingState, SetClimbingState] = useState(location.state)
  return (
    <>
    <div>Select_equip</div>
    {console.log(ClimbingState)}
    </>
  )
}

export default Select_equip