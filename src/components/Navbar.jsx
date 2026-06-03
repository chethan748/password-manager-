import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Signup from './signup';


const Navbar = () => {
  const navigate = useNavigate();
   const [logout, islogout ]=useState(!!localStorage.getItem("token"))
  const logoutfun= (e) => {
    localStorage.removeItem("token")
    islogout(false)
      window.location.reload();
  }


  return (

    <nav className='bg-white-100 flex justify-between item-center w-full p-3 bg-white/10 backdrop-blur-md sticky top-0 shadow-lg shadow-black-200/20 rounded-3xl'>
                <div  className="logo font-extrabold italic text-2xl flex  w-199   ">  <h1>
 <span className='text-green-400'></span>     
        <span className='text-green-400'>&lt;</span>Pass
        <span className='text-green-400'>OP/&gt;</span>
        </h1></div>
      {/* <ul className='flex gap-20  p-1.5 text-2l font-semibold  pr-3'>

        <li><a href="">Home</a></li>
        <li><a href="">About</a></li>
        <li><a href="">Contact</a></li>
      </ul> */}
<button  onClick={(e) => {
   logoutfun(e)
  }}  className=" flex justify-center items-center content-center cursor-pointer bg-purple-500 pr-0.75 rounded-full w-20 h-10 flex-shrink-0"><p className="font-semibold ">Logout</p></button>   </nav>

  )
}

export default Navbar