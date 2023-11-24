import React from 'react'
import {Login as LoginComponent} from '../index'

function Login() {
  console.log("Login component ---------------");
  return (
    <div className='py-8'><LoginComponent /></div>
  )
}

export default Login