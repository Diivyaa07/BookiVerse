import React,{useEffect,useState} from 'react';
import axios from "axios";
import Loader from '../Loader/Loader';
const Settings = () => {
  const[Value,setValue]=useState({address:""});
  const[ProfileData,setProfileData]=useState();
  const headers={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem("token")}`,
  };

  const change= (e)=>{
    const{name , value}=e.target;
    setValue({...Value, [name]:value});
  };
 
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/v1/get-user-information", { headers });
        setProfileData(response.data);
        setValue({address:response.data.address});
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };
    fetch();
  }, []);

  const submitAddress= async()=>{
    const response = await axios.put("http://localhost:3001/api/v1/update-address",Value, {headers});
    alert(response.data.message);
  }
  
  return (
   <>
    {!ProfileData && (
      <div className='w-full h-[100%] flex items-center justify-center'>
        <Loader />
      </div>
    )}
    {ProfileData && (
      <div className='h-[100%] p-0 md:p-4 text-zinc-100'>
        <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
          Settings
        </h1>
        <div className='flex flex-col gap-10'>
          <div className=''>
            <label htmlFor=''>Username</label>
            <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
              {ProfileData.username}
            </p>
          </div>

          <div className=''>
            <label htmlFor=''>Email</label>
            <p className='p-2 rounded bg-zinc-800 mt-2 font-semibold'>
              {ProfileData.email}
            </p>
          </div>

          <div className='mt-2 flex flex-col'>
            <label htmlfor=''>Address</label>
            <textarea className='p-2 rounded bg-zinc-800 mt-2 font-semibold'
              rows='5'
              placeholder='Address'
              name='address'
              value={Value.address}
              onChange={change}
              />
          </div>

          <div className='mt-4 flex flex-col items-center justify-center '>
            <button className='bg-purple-600 text-zinc-400 font-semibold px-3 py-2 rounded hover:bg-yellow-400 transition-all duration-300  w-[20%] ' onClick={submitAddress}>
              Update
            </button>
          </div>
        </div>
      </div>
    )}
   </>
  );
};

export default Settings;
