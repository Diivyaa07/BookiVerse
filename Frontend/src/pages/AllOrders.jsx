import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import { FaUserLarge } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import SeeUserData from './SeeUserData';
import { Link } from 'react-router-dom';


const AllOrders = () => {
 const [userDiv,setuserDiv]=useState('hidden');
 const [userDivData,setuserDivData]= useState();
 const [AllOrders,setAllOrders] = useState([]);
 const [Options,setOptions]=useState(-1);
 const [Values, setValues]= useState({status:''});
 const [currentIndex, setCurrentIndex] = useState(null);
 const headers ={
    id:localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
 };
 useEffect(() => {
  const fetch = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/v1/get-all-orders", { headers });
      // console.log("Fetched Orders: ", response.data);
      setAllOrders(response.data.data); // Correctly set state
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  fetch(); // Call the function
}, []); 

 const change = (e)=>{
    const {value} =e.target;
    setValues({status:value});
    
    
 };
//  const submitChanges= async(i)=>{
//     const id = AllOrders[i]._id;
//     const response= await axios.put(`http://localhost:3001/api/v1/update-status/${id}`,Values,{headers});
//     alert(response.data.message);
//  };

const submitChanges = async (i) => {
  const id = AllOrders[i]._id;
  try {
    const response = await axios.put(`http://localhost:3001/api/v1/update-status/${id}`, Values, { headers });
    alert(response.data.message);
    // Refetch orders to get the updated status
    const updatedOrders = await axios.get("http://localhost:3001/api/v1/get-all-orders", { headers });
    setAllOrders(updatedOrders.data.data);
  } catch (error) {
    console.error("Error updating status:", error);
  }
};
 
const handleDropdownOpen = (index) => {
  if (Options === index) {
    setOptions(-1); // Close the dropdown if it's already open
  } else {
    setOptions(index); // Open the dropdown
    setCurrentIndex(index);
    setValues({ status: AllOrders[index].status }); // Set current status to dropdown value
  }
};

  return (
    <>
     {!AllOrders && (<div className='h-[100%] flex items-center justify-center'>
        <Loader />
     </div>)}

     {AllOrders && AllOrders.length >0 && (
        <div className='h-auto lg:w-auto p-4 md:p-4 text-zinc-100'>
          <h1 className='text-3xl md:text-5xl font-semibold text-zinc-500 mb-8'>
            All Orders
          </h1>
          <div className='mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2'>
            <div className='w-[3%]'>
              <h1 className='text-center'>Sr.</h1>
            </div>
            <div className='w-[48%] md:w-[22%]'>
              <h1 className=''>Books</h1>
            </div>
            <div className='w-0 md:w-[45%] hidden md:block'>
              <h1 className=''>Description</h1>
            </div>
            <div className='w-[17%] md:w-[9%]'>
              <h1 className=''>Price</h1>
            </div>
            <div className='w-[30%] md:w-[16%]'>
              <h1 className=''>Status</h1>
            </div>
            <div className='w-[10%] md:w-[5%]'>
              <h1 className=''><FaUserLarge />
             </h1>
            </div>
         </div>
         {AllOrders && AllOrders.map((items,i)=>(
          <div className='bg-zinc-800 w-full rounded py-2 py-4 flex gap-4 hover:bg-zinc-900 hover:cursor-point'>
          <div className='w-[3%]'>
              <h1 className='text-center'>{i+1}</h1>
            </div>
            <div className='w-[40%] md:w-[22%]'>
            {items.book && (
            <Link to ={`/view-book-details/${items.book._id}`}
              className='hover:text-blue-300'>{items.book.title}</Link>
            )}
           </div>
           <div className='w-0 md:w-[45%] hidden md:block'>
            {items.book && (
              <h1 className=''>{items.book.desc.slice(0,50)}...</h1>
            )}
            </div>

            <div className='w-[17%] md:w-[9%]'>
            {items.book && (
              <h1 className=''>Rs.{items.book.price}</h1>
            )}
            </div>

            <div className='w-[30%] w-[16%]'>
              <h1 className='font-semibold'>
              <button className='hover:scale-105 transition-all duration-300' onClick={()=>handleDropdownOpen(i)}>
              {items.status ==='Order Placed' ? (
                <div className='text-yellow-500'>{items.status}</div>
              ): items.status === 'Canceled'? (
                <div className='text-red-500'>{items.status}</div>
              ):(
                <div className='text-red-500'>{items.status}</div>
              )}
              </button>
              <div className={`${Options === i? "flex" :"hidden"}`}>
                <select name="status" className='bg-gray-800' onChange={change} value={Values.status}>
                    {[
                        "Order placed",
                        "Out for delivery",
                        "Delivered",
                        "Cancelled",
                    ].map((items,i)=>(
                        <option value = {items} key={i}>
                            {items}
                        </option>
                    ))}
                </select>
                <button className='text-green-500 hover:text-pink-600 mx-2'
                 onClick={()=>{
                    setOptions(-1);
                    submitChanges(i);
                 }}>
                <FaCheck />

                </button>
              </div>
              </h1>
            </div>

            <div className='w-[10%] md:w-[5%] hidden md:block'>
              <button className='text-xl hover:text-orange-500' onClick={()=>{
                setuserDiv("Fixed");
                setuserDivData(items.user);
              }}>
              <IoOpenOutline />

              </button>
            </div>

          
           </div>
         ))}
        </div>
     )}
     {userDivData && (
        <SeeUserData
          userDivData={userDivData}
          userDiv={userDiv}
          setuserDiv={setuserDiv}
          />

     )}
    </>
  );
};

export default AllOrders;
