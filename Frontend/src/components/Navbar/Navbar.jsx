import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaGripLines } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Navbar = () => {
  const links=[
    {
      title:"Home",
      link:"/",
    },
    {
      title:"All Books",
      link :"/all-books",
    },
    {
      title:"Cart",
      link :"/cart",
    },
    {
      title:"Profile",
      link:"/profile",
    },
    {
      title:"Admin Profile",
      link:"/profile",
    },
  ];
  const isLoggedIn =useSelector((state)=>state.auth.isLoggedIn);
  const role =useSelector((state)=>state.auth.role);

  if(isLoggedIn===false)
  {
    links.splice(2,3);
  }

  if(isLoggedIn=== true && role==="user")
  {
    links.splice(4,1);
  }

  if(isLoggedIn=== true && role==="admin")
  {
    links.splice(2,2);
  }
  const [MobileNav,setMobileNav] = useState("hidden");
  return (
    <>
    <nav className="relative flex bg-zinc-700 text-white px-8 py-4 items-center justify-between ">
      <Link to="/" className="flex items-center">
        <img className="h-12 me-4 "
         src="/images/logo.png"
         alt="" />
        <h1 className='text-2xl font-semibold'>BookVerse</h1>
      </Link>
      <div className="nav-links-bookverse block md:flex items-center gap-4 ">
      <div className="hidden md:flex gap-4">
          {links.map((items,i)=>(
          <div className='flex items-center' >
            {items.title==="Profile" || items.title === "Admin Profile"?  (<Link to={items.link}
          className="hover:text-blue-500 transition-all duration-300" 
          key={i}>
          {items.title}
          </Link>) : ( <Link to={items.link}
          className="hover:text-blue-500 transition-all duration-300" 
          key={i}>
          {items.title}
          </Link>)}
          </div>
          ))}
      </div>
      {isLoggedIn===false && (
        <div className='hidden md:flex gap-4'>
        <Link to="/LogIn" 
        className='px-2 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>
        LogIn
        </Link>
        <Link to="/SignUp" 
        className='px-2 py-1 border border-white-500 bg-blule-500 rounded hover:bg-white hover:text-zinc-800 tensition-all duration-300'>
        SignUp
        </Link>
      </div>
      )}
      <button className='block md:hidden text-white text-2xl hover:text-zinc-400' onClick={()=>(MobileNav === "hidden" ? setMobileNav("block") : setMobileNav("hidden"))}>
        <FaGripLines />  
      </button>
      </div> 
    </nav>
    <div className={`${MobileNav} bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center jsutify-center`}>
    {links.map((items,i)=>(

      <Link to={items.link}
      className={` ${MobileNav} text-white text-3xl font-semibold mb-6 mt-4 px-8 py-8 hover:text-blue-500 transition-all duration-300`}
      key={i}>
      {items.title}{" "}
      </Link>
      ))}
      <Link to="/LogIn" 
        className='px-2 py-1 border border-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300'>
        LogIn
        </Link>
        <Link to="/SignUp" 
        className='px-2 py-1 border border-white-500 bg-blule-500 rounded hover:bg-white hover:text-zinc-800 tensition-all duration-300'>
        SignUp
        </Link>

    </div>
    </>
  );
};

export default Navbar;
