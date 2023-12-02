import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from "./appWrite/auth.js"
import {login, logout} from "./store/authSlice.js"
import {Header, Footer} from "./components/index.js";
import { Outlet } from 'react-router-dom'
import Loader from './components/Loader.jsx';

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(()=>{
    authService.getCurrentUser()
      .then((data)=>{
        if(data){
          dispatch(login({data}))
        }else{
          dispatch(logout())
        }
      })
      .finally(()=>{
        setLoading(false);
      })
  },[])
  
  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
        <div className="w-full block">
          <Header />
          <main>
            <Loader />
            <div className="blur-bg-custom">
              <Outlet /> 
            </div>
          </main>
          <Footer />
        </div>
    </div>
  ): null
}

export default App
