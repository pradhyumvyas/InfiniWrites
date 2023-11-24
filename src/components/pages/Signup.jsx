import React from 'react'
import {Signup as SignupComponent} from '../index.js'

function Signup() {
  console.log("Signup component ---------------");
  return (
    <div className='py-8'><SignupComponent /></div>
  )
}

export default Signup