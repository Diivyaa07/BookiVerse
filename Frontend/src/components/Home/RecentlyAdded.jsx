import React, {useState, useEffect } from 'react';
import axios from "axios";
import BookCard from '../BookCard/BookCard';
import Loader from '../Loader/Loader';
const RecentlyAdded = () => { 
  const [Data,setData]=useState([]);

  useEffect(() => {
    const fetchData =async()=>{
    try{
        const response= await axios.get("http://localhost:3001/api/v1/get-recent-books");
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
  return (
    <div className='mt-8 px-4'>
      <h4 className='text-3xl text-yellow-100'>Recently added books</h4>
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

export default RecentlyAdded;
