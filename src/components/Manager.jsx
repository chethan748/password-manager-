import React, { useRef } from 'react'
import { Zoom } from "react-toastify";
import { ToastContainer, toast } from "react-toastify";
import { useState } from 'react';
import { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import zxcvbn from 'zxcvbn';
let api= "http://localhost:5000"


const Manager = () => {
    const [count, setCount] = useState(0)
    const [password,setpassword]=useState([]);
       const [editing ,isediting]=useState(null);
       const [score,setscore]=useState(0)
  let  [form, setform] = useState({site:"",
    username:"",
    password:""
  })
   const handlechange = async (e) => {

     setform({...form,[e.target.name]:e.target.value})
 
     
   }
   const checkstr= (password) => {
  
  
    if(password){
       const result= zxcvbn(password)
setscore(result.score)
    }else{
setscore(0)
    }
   }
   
    const getcolor =() => {
      switch(score){
      case 0: return 'bg-red-500 w-1/5';
      case 1: return 'bg-orange-500 w-2/5';
      case 2: return 'bg-yellow-500 w-3/5';
      case 3: return 'bg-blue-500 w-4/5';
      case 4: return 'bg-green-500 w-full';
      default: return 'bg-gray-300 w-0';
      }
    };
    
    const getlabel = () => {
    const labels = ["Very Weak", "Weak", "Fair", "Strong", "Very Strong"];
    return password ? labels[score] : "";
  };
 const savepass = async () => {

    try {

   
        const token = localStorage.getItem("token");

        const res = await fetch(`${api}/post/post`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json",
                Authorization: token
            },

            body: JSON.stringify({

                url: form.site,

                username: form.username,

                password: form.password

            })

        });

        let data = await res.json();

        if (res.ok) {

            toast.success("Password saved!");

            getdata();

            setform({
                site: "",
                username: "",
                password: ""
            });

        }else {
            toast.error(data.message || "Failed to save password.");
        }

    } catch (error) {

        console.log(error);

    }

};
  const updatepass= (item) => {
      setform({
      site: item.url,
      username: item.username,
      password: item.password,
    });

    isediting(item._id)
  }
  
   const update = async (item) => {
    if(editing){
      const res= await fetch(`${api}/update/${editing}`,{
       method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url: form.site,
            username: form.username,
            password: form.password,

          }),
           });
            
      if (res.ok) {
        isediting(null);
        getdata(); 
         setform({
        site: "",
        username: "",
        password: ""
          });
      }
    }

  }

   useEffect(() => {
 
    
     getdata()
   
   }, [])
   
 const deletepass = async (item) => {
  // try {
    const res = await fetch(`${api}/delete/${item._id}`, {
      method: "DELETE"
    });

    const data = await res.json();

    console.log(data);
    getdata()

    if (res.ok) {
      toast.success("Deleted Successfully");
      getdata(); 
    } else {
      toast.error(data.message || "Delete failed");
    }

}
  const passwordref= useRef ()
   const iconref =useRef(null)
const eye = () => {
  if(passwordref.current.type==='password'){
    passwordref.current.type="text";
iconref.current.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M607.5-372.5Q660-425 660-500t-52.5-127.5Q555-680 480-680t-127.5 52.5Q300-575 300-500t52.5 127.5Q405-320 480-320t127.5-52.5Zm-204-51Q372-455 372-500t31.5-76.5Q435-608 480-608t76.5 31.5Q588-545 588-500t-31.5 76.5Q525-392 480-392t-76.5-31.5ZM214-281.5Q94-363 40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200q-146 0-266-81.5ZM480-500Zm207.5 160.5Q782-399 832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280q113 0 207.5-59.5Z"/></svg>`
  }
  else{
    passwordref.current.type='password'
    iconref.current.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#fffff"><path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z"/></svg>`;
  }
  
}
const copy= async(text) => {
  
    await navigator.clipboard.writeText(text)
 toast.success("Copied to clipboard!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
    });
    setTimeout(() => {
      clearClipboard(text)
      
    }, 30000);
}

const getdata = async () => {

    try {

        const token = localStorage.getItem("token");

        const d = await fetch(`${api}/accounts`, {

            headers: {
                Authorization: token
            }

        });

        const res = await d.json();

        setpassword(res.data||[]);

        console.log(res);

    } catch (error) {

        console.log(error);

    }

};
   
  return (

    <div className='w-[90vw] mx-auto'>
    <ToastContainer theme="dark" transition={Zoom} limit={3} />

      <div className="m-10">
        <h1 className="text-center text-xl font-bold">
          <span className="text-green-400">&lt;</span>Pass
          <span className="text-green-400">OP/&gt;</span>
        </h1>
        </div>
        <span className='flex flex-col p-2 w-full justify-center items-center content-center'>
      <div className="flex flex-col gap-5 w-full mt-6 mx-auto ">
          <input type="text" name='site' value={form.site}  onChange={handlechange}  placeholder="Enter Website URL"
            className="border p-2  rounded-full " />
        </div>
     
         <div className='  flex-col flex gap-10  m-10 md:flex-row w-[100%] mx-auto  justify-center items-center content-center'>
          <input type="text"   name='username' value={form.username}  onChange={handlechange}   placeholder="Enter Username "
            className=" border p-2 rounded-full  w-[100%] "  />
            <span className='relative'>
             <input className=" border p-2 rounded-full  w-[100%] " type="text" ref={passwordref} name='password' value={form.password}  onChange={(e) => {
    handlechange(e);
    checkstr(e.target.value);
  }} >
</input>
            <button onClick={eye} ref={iconref} className='absolute top-0 right-0 h-10 w-8 '><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#ffffff"><path d="M607.5-372.5Q660-425 660-500t-52.5-127.5Q555-680 480-680t-127.5 52.5Q300-575 300-500t52.5 127.5Q405-320 480-320t127.5-52.5Zm-204-51Q372-455 372-500t31.5-76.5Q435-608 480-608t76.5 31.5Q588-545 588-500t-31.5 76.5Q525-392 480-392t-76.5-31.5ZM214-281.5Q94-363 40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200q-146 0-266-81.5ZM480-500Zm207.5 160.5Q782-399 832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280q113 0 207.5-59.5Z"/></svg></button>
            <div className='w-[85w] md:w-[400px] mt-2'>
              <div></div>
            </div>
            </span>
     
        </div>
               <button
  className='bg-purple-500 text-white p-2 rounded-full w-[200px]'
  onClick={editing ? update : savepass}
>
  {editing ? "Update Password" : "Save Password"}
</button>

<div className="w-[85vw] md:w-[400px] mt-2">
  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
    <div className={`h-full transition-all duration-300 ${getcolor()}`}></div>
  </div>
  <p className="text-xs mt-1 text-right font-semibold" style={{ color: getcolor().includes('red') ? 'red' : 'green' }}>
    {getlabel()}
  </p>
</div>
        </span>
        <div >
         
<div className="bg-teal-50 w-[90%] mx-auto rounded-3xl m-5  text-black">
  {password.length === 0 ? (
    <p className="text-slate-500 italic p-7">No passwords to display</p>
  ) : (
    <>
   <div className='text-3xl text-green-500  font-extrabold p-7'>Passwords: </div>
   {password.map((item,index)=>(
 
 <div key={item._id} className='pl-7 text-1.5xl  font-bold'>

  <div><div className='flex gap-5'>
   <span>Website Url:</span> <a href="" className='break-all' >  {item.url}</a>  <span className=' cursor-pointer'onClick={() =>copy(item.url)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M120-220v-80h80v80h-80Zm0-140v-80h80v80h-80Zm0-140v-80h80v80h-80ZM260-80v-80h80v80h-80Zm100-160q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480Zm40 240v-80h80v80h-80Zm-200 0q-33 0-56.5-23.5T120-160h80v80Zm340 0v-80h80q0 33-23.5 56.5T540-80ZM120-640q0-33 23.5-56.5T200-720v80h-80Zm420 80Z"/></svg></span>

  </div><div className='flex gap-5'>
    <span>Username:</span>  <span className='break-all'> { item.username}</span> <span className=' cursor-pointer'onClick={() =>copy(item.username)}><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M120-220v-80h80v80h-80Zm0-140v-80h80v80h-80Zm0-140v-80h80v80h-80ZM260-80v-80h80v80h-80Zm100-160q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480Zm40 240v-80h80v80h-80Zm-200 0q-33 0-56.5-23.5T120-160h80v80Zm340 0v-80h80q0 33-23.5 56.5T540-80ZM120-640q0-33 23.5-56.5T200-720v80h-80Zm420 80Z"/></svg></span>
    </div><div className='flex gap-5'>
      <span>Password : </span>  <span className='break-all'> { item.password}</span><span className=' cursor-pointer'><svg xmlns="http://www.w3.org/2000/svg" onClick={() =>copy(item.password)} height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M120-220v-80h80v80h-80Zm0-140v-80h80v80h-80Zm0-140v-80h80v80h-80ZM260-80v-80h80v80h-80Zm100-160q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480Zm40 240v-80h80v80h-80Zm-200 0q-33 0-56.5-23.5T120-160h80v80Zm340 0v-80h80q0 33-23.5 56.5T540-80ZM120-640q0-33 23.5-56.5T200-720v80h-80Zm420 80Z"/></svg> </span>
    </div>
    
    
    <button className='bg-amber-300 text-white rounded w-17  h-8 ' onClick={() => updatepass(item)}>Edit </button>
    <button className='bg-amber-300 text-white rounded w-17 h-8 m-5'  onClick={() => deletepass(item)}>Delete</button>

    </div>
    <div className='text-center p-5 overflow-hidden'>-------------------------------------------------------------------------------------------------------</div></div>
    
))}
</>
)}
          </div>

        </div>
    </div>
  )
  
}

export default Manager