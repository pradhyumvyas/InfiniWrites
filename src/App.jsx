import { useEffect, useState } from 'react'
import './App.css'
import { useDispatch } from 'react-redux';
import authService from "./appWrite/auth.js"
import {login, logout} from "./store/authSlice.js"
import {Header, Footer} from "./components/index.js";

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
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
        <div className="w-full block">
          <Header />
          <main>
            TODO:{/* <Outlet /> */}
          </main>
          <Footer />
        </div>
    </div>
  ): null
}

export default App
