import React from 'react'
import logo from '../assets/images/logo.png';

function Logo({width='200px', height='50px'}) {
  return (
    <img src={logo} alt="Logo" width={width} height={height} />
  )
}

export default Logo