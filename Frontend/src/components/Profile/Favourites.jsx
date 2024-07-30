import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookCard from '../BookCard/BookCard';

const Favourites = () => {
  const [FavouriteBooks, setFavouriteBooks] = useState([]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/v1/get-favourite-book", { headers });
        setFavouriteBooks(response.data.data); // Set the state to the response data
        console.log(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetch();
  }, []);

  const handleRemoveBookFromState = (bookId) => {
    setFavouriteBooks((prevBooks) => prevBooks.filter((book) => book._id !== bookId));
  };

  return (
    <>
      {FavouriteBooks && FavouriteBooks.length === 0 && (
        <div className='mt-4 text-blue-200 text-xl lg:text-5xl font-semibold text-zinc-500 flex items-center lg:relative flex items-center justify-center flex-col h-screen '>
          No Books in Favourites
          <img src="/images/Favourite.png" alt="" className='h-screen w-[75%] object-cover' />
        </div>
      )}

      <div className='grid grid-cols-4'>
        {FavouriteBooks && FavouriteBooks.map((items, i) => (
          <div key={i}>
            <BookCard data={items} favourite={true} onRemove={handleRemoveBookFromState} />
          </div>
        ))}
      </div>
    </>
  );
};

export default Favourites;
