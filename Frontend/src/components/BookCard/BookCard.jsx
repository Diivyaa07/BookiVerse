import React from 'react';
import {Link} from 'react-router-dom';
// import Favourite from '../Profile/Favourites';
import axios from 'axios';

const BookCard = ({data,favourite,onRemove}) => {
  const headers ={
    id:localStorage.getItem("id"),
    authorization:`Bearer ${localStorage.getItem('token')}`,
    bookid:data._id,
  };
  const handleRemoveBooks= async ()=>{
    const response = await axios.put(
      "http://localhost:3001/api/v1/remove-book-from-favourite",{},
      { headers }
    );
    alert(response.data.message);
    if(response.status===200)
    {
      onRemove(data._id);
    }
  };
  return (
    <div className='bg-zinc-800 rounded p-4 flex flex-col'>
      <Link to ={`/view-book-details/${data._id}`}>
        <div>
        <div className='bg-zinc-900 rounded flex items-center justify-center'>
          <img src={data.url} alt='/' className='h-[25vh]' />

        </div>
        <h2 className='mt-4 text-xl text-zinc-200 font-semibold'>{data.title}</h2>
        <p className='mt-2 text-zinc-200 font-semibold text-xl'>by {data.author}</p>
        <p className='mt-2 text-zinc-200 font-semibold text-xl'>Rs.{data.price} </p>
       </div>
      </Link>
      {favourite && (
        <button className='bg-yellow-50 px-4 py-2 rounded border border-yellow-500 text-yellow-300 mt-4' onClick={handleRemoveBooks}>Remove From Favourites</button>
        
      )}
    </div>
  );
};

export default BookCard;
