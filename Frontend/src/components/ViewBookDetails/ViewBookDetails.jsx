import React,{useState,useEffect} from 'react';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { GrLanguage } from "react-icons/gr";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import {useSelector} from 'react-redux';
import { FaRegEdit } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";


const ViewBookDetails = () => {
     const {id} = useParams();
     const navigate = useNavigate();

     const [Data,setData]=useState([]);
     const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn);
     const role = useSelector((state)=>state.auth.role);
     console.log(isLoggedIn,role);
      
        useEffect(() => {
          const fetchData =async()=>{
          try{
              const response= await axios.get(`http://localhost:3001/api/v1/get-book-by-id/${id}`);
               console.log(response);
              setData(response.data.data);
              // console.log(Data)
      
          } catch(error)
          {
              console.error("Error in fetching data:",error);
          }
             };
          fetchData();
        },[]);

        const headers={
          id: localStorage.getItem("id"),
          authorization:`Bearer ${localStorage.getItem("token")}`,
          bookid:id,
        };
        const handleFavourite =async()=>{
          const response = await axios.put("http://localhost:3001/api/v1/add-book-to-favourite",{},{ headers });
         alert(response.data.message);
        };

        const handleCart= async()=>{
           const response = await axios.put("http://localhost:3001/api/v1/add-to-cart",{},{headers});
           alert(response.data.message);
        };

        const deletebook= async()=>{
          const response = await axios.delete("http://localhost:3001/api/v1/delete-book",{headers});
          alert(response.data.message);
          navigate('/all-books');
        }
  return (
    <>
    {Data && ( 
    <div className='px-4 md:px-5 py-5 bg-zinc-900 flex flex-col md:flex-row gap-8 items-start'>
     <div className='  h-[50vh] md:h-[60vh] lg:h-[75vh]  '>
      <div className='flex flex-col lg:flex-row items-center justify-around bg-zinc-800 p-12 rounded'>
      <img src={Data.url} alt=" " className='px-4 h-[50vh] lg:h-[70vh] w-[70vw] lg:w-[100%]  rounded' />
      {isLoggedIn ===true && role==='user' && (
        <div className=' flex flex-row lg:flex-col  items-center jsutify-between lg:justify-start mt-3 lg:mt-0'>
        <button className='bg-white rounded-full text-2xl p-2 text-red-400' onClick={handleFavourite}>
        <FaHeart />
        </button>
        <button className='bg-white rounded-full text-2xl p-2 ml-1 lg:mt-4  text-blue-400' onClick={handleCart}>
        <FaShoppingCart />
        </button>
      </div>
      )}

      {isLoggedIn ===true && role==='admin' && (
        <div className=' flex flex-row lg:flex-col  items-center jsutify-between lg:justify-start mt-3 lg:mt-0'>
        <Link to = {`/updateBook/${id}`} className='bg-green-300 rounded-full text-2xl p-2 text-black-400'>
        <FaRegEdit />
        </Link>
        <button className='bg-red-600 rounded lg:rounded-full text-2xl p-2 ml-1 lg:mt-4  text-black-400' onClick={deletebook}>
        <MdOutlineDelete />
        </button>
     
     
      </div>
      )}
      </div>
     </div>
     <div className='p-4 w-full lg:w-3/6'>
      <h1 className='text-4xl text-zinc-300 font-semibold'>{Data.title}</h1>
      <p className='text-zinc-400 mt-1'>by {Data.author}</p>
      <p className='text-zinc-500 mt-4 text-xl'>{Data.desc}</p>
      <p className='flex mt-4 items-center justify-start text-zinc-400'>
        <GrLanguage className='me-3' />{Data.language}
      </p>
      <p className='mt-4 text-zinc-100 text-3xl font-semibold'>
        Price: Rs.{Data.price}{" "}
      </p>
     </div>
    </div>
    )}
    {Data && <div className='h-screen bg-zinc-900 flex items-center justify-center'>
    <Loader />
    </div>}
    </>
  );
};

export default ViewBookDetails;
