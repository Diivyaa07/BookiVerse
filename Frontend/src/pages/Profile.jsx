import {React, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Profile/Sidebar';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Loader from '../components/Loader/Loader';
import MobileNav from '../components/Profile/MobileNav';

const Profile = () => {
  // const isLoggedIn=useSelector();
  const [Profile, setProfile]=useState();
  const headers ={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem ("token")}`,
  };
  useEffect(()=>{
    const fetch= async()=>{
        const response= await axios.get("http://localhost:3001/api/v1/get-user-information", {headers});
       setProfile(response.data);
    };
    fetch();
  },[]);
  return (
    <div className='bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row py-8 gap-4 text-white '>
     {!Profile && <div className='w-full h-[100%] flex items-center justify-center'> <Loader /> </div>}
     {Profile && <>
      <div className='w-2/6 md:w-1/6 lg:h-screen'>
      <Sidebar data={Profile} />
      <MobileNav />
     </div>
     <div className=' w-full md:w-3/6'>
      <Outlet />
     </div>
     </>} 
    </div>
  )
};

export default Profile;
