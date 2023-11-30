import React from 'react'
import { useDispatch } from 'react-redux'
import service from '../../appWrite/config';
import { logout } from '../../store/authSlice';
import authService from '../../appWrite/auth.js';

function LogoutBtn() {
   const dispatch = useDispatch();

   const logoutHandler = ()=>{
      authService.logoutAccount()
         .then(()=>{
            dispatch(logout())
         })
         .catch((error)=>{
            console.log("Logout btn error");
         })
   }
  return (
    <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-400 rounded-full text-cyan-200'
      onClick={logoutHandler}>
      Logout
    </button>
  )
}

export default LogoutBtn