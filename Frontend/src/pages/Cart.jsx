import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader/Loader';
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';


const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState([]);
  const [Total, setTotal] = useState(0);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/v1/get-user-cart", { headers });
        setCart(res.data.data);
        console.log("DSf",Cart);
      } catch (error) {
        console.error(error);
      }
    };
    fetch(); // Only run once when the component mounts
  }, []); // Empty dependency array ensures useEffect runs only once

  const deleteItem = async (bookid) => {
    try {
      const response = await axios.put(`http://localhost:3001/api/v1/remove-from-cart/${bookid}`, {}, { headers });
      alert(response.data.message);
      
      // Re-fetch the cart data after an item is deleted
      const res = await axios.get("http://localhost:3001/api/v1/get-user-cart", { headers });
     
      setCart(res.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  
   useEffect(()=>{
    if(Cart && Cart.length>0){
      let total =0;
      Cart.map((items)=>{
        total+= items.price;
      });
      setTotal(total);
      total=0;
    }
   },[Cart]);
   
   const PlaceOrder = async()=>{
    try{
      const response= await axios.post(`http://localhost:3001/api/v1/place-order`, {order:Cart},{headers});
      console.log(response);
      navigate("/Profile/orderHistory");
    }catch(error)
    {
      console.log(error);
    }
   };
  return (
    <div className='bg-zinc-900 px-8 py-8 h-screen'>
      {/* {!Cart.length && <div className='w-full h-[100%] flex items-center justify-center'><Loader /> </div>} */}
      {Cart.length === 0 && (
        <div className='h-screen'>
          <div className='h-[100%] flex items-center justify-center flex-col'>
            <h1 className='text-5xl lg:text-6xl font-semibold text-zinc-400'>
              Empty Cart
            </h1>
            <img src='/images/empty-cart.png' alt='Empty Cart' />
          </div>
        </div>
      )}
      {Cart.length > 0 && (
        <>
          <h1 className='text-4xl font-semibold text-pink-200 mb-8'>
            Your Cart
          </h1>
          {Cart.map((items, i) => (
            <div className='w-full my-5 rounded flex flex-col md:flex-row bg-zinc-800 items-between ' key={items._id}>
              <img src={items.url} alt='' className='h-[20vh] md:h-[10vh] object-cover' />
              <div className='w-full md:w-auto'>
                <h1 className='px-8 text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0 '>
                  {items.title}
                </h1>
                {items.desc && (
                  <>
                    <p className='text-normal text-zinc-300  hidden lg:block px-8'>
                      {items.desc.slice(0, 100)}...
                    </p>
                    <p className='text-normal text-zinc-300 mt-2 hidden md:block lg:hidden px-8'>
                      {items.desc.slice(0, 65)}...
                    </p>
                    <p className='text-normal text-zinc-300 mt-2 block md:hidden px-8'>
                      {items.desc.slice(0, 100)}...
                    </p>
                  </>
                )}
              </div>
              <div className='flex mt-4 w-full md:w-auto items-center justify-between px-12'>
                <h2 className='text-zinc-100 text-xl font-semibold flex flex-col' >
                  Rs.{items.price}
                </h2>
                <button className='bg-white-400 text-red-100 rounded p-2 ms-9 text-2xl' onClick={() => deleteItem(items._id)}>
                  <AiFillDelete />
                </button>
              </div>
            </div>
          ))}
        </>
      )}
      {Cart && Cart.length && (
          <div className='mt-4 w-full flex items-center justify-end'>
            <div className='bg-zinc-800 rounded'>
              <h1 className='text-3xl text-zinc-200 font-semibold px-4' >
                Total Amount
              </h1>
              <div className='mt-3 flex items-center justify-between text-xl text-zinc-200 px-4 py-2'>
                <h2>{Cart.length} books</h2><h2>Rs {Total}</h2>
              </div>
              <div className='w-[100%] mt-3'>
                <button className='bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-300' onClick={PlaceOrder}>Place your order</button>
              </div>
            </div>
          </div>
      )}
    </div>
  );
};

export default Cart;