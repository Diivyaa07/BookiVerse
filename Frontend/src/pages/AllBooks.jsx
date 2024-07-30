import React, {useState, useEffect} from "react";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import BookCard from "../components/BookCard/BookCard";
// import { useEffect, useState } from "react";
const AllBooks =() =>{
        const [Data,setData]=useState([]);
      
        useEffect(() => {
          const fetchData =async()=>{
          try{
              const response= await axios.get("http://localhost:3001/api/v1/get-all-books");
              // console.log(response.data.data)
              setData(response.data.data);
              // console.log(Data)
      
          } catch(error)
          {
              console.error("Error in fetching data:",error);
          }
             };
          fetchData();
        },[]);
    return( 
    <div className="bg-zinc-900 h-auto px-12 py-8 pz-4">
    <h4 className='text-3xl text-yellow-100'>All books</h4>
    {!Data && <div className='flex items-center justify-center'><Loader /></div>}
    <div className='my-4 grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-8'>
    {Data && Data.map((items, i) => (
        <div key={i}>
          <BookCard data={items} />{' '}
        </div>
      ))}
    </div>
  </div>
);
};


export default AllBooks;