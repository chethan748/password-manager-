
const Navbar = () => {
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
<button className=" flex justify-center items-center content-center cursor-pointer bg-purple-500 pr-0.75 rounded-full w- flex-shrink-0"><img className='w-8 'src="/public/github.svg" alt="" /><p className="font-semibold">GitHub</p></button>    </nav>

  )
}

export default Navbar
