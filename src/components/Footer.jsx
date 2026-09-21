import React from 'react'

const Footer = () => {
  return (
    <div className='w-full bg-slate-800 rounded-t-2xl text-white flex flex-col items-center py-4 gap-4'>
      <div className=" w-full text-center">Securing your digital life, one character at a time. Built with privacy in mind.</div>
<div className=''>
    <ul className='flex flex-col gap-4 sm:flex-row sm:gap-10 py-4'>
        <li><a href="" className='no-underline hover:underline text-center'>Privacy Policy</a></li>
        <li><a href="" className='no-underline hover:underline text-center'>Terms of Service</a></li>
        <li><a href="" className='no-underline hover:underline text-center'>Security Whitepaper</a></li>
    </ul>
     <ul className=' flex flex-col gap-4 sm:flex-row sm:gap-10 '>
       
        <li><a href="google.com" className='no-underline hover:underline text-center'> Help Center</a></li>
        <li><a href="" className='no-underline hover:underline text-center'>Contact Us</a></li>
        <li><a href="" className='no-underline hover:underline text-center'>GitHub Repository</a></li>
    </ul>
</div>
<div>

</div>
<div className=" text-center">© 2026 PassOP. All rights reserved. | 🔒 Your data is encrypted locally.</div>
<div>Made with ❤️ for a safer web.</div>
    </div>
    
  )
}

export default Footer
