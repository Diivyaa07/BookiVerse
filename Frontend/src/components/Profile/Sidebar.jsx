import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRightToBracket } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import {authActions} from '../../store/auth';


const Sidebar = ({data}) => {
  const dispatch =useDispatch();
  const history=useNavigate();
  const role =useSelector((state)=>state.auth.role);
  return (
    <div className='bg-zinc-800 px-2 py-2 rounded flex-col items-center justify-between h-[75vh] lg:h-[100%]  w-[18vw] lg:w-[15vw]'>
      <div className='flex items-center flex-col justify-center'>
      <img src={data.profile} className='h-[15vh]' />
      <p className='mt-3 text-xl text-zinc-100 font-semibold text-center items-center justify-center'>
        {data.username}
      </p>
      <p className='mt-2 flex flex-col text-xs lg:text-xl text-zinc-300 text-center '>{data.email}</p>
      <div className='w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block'></div>
        
      </div>
        {role ==="user" && <div className='w-full flex flex-col items-center justify-center '>
            <Link
               to='/profile'
               className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'>
                Favourite
            </Link>

            <Link 
             to='/Profile/orderHistory'
             className='text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300'>
              Order History
            </Link>

            <Link
              to='/Profile/Settings'
              className='text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300'>
              Settings
            </Link>
        </div>}

        {role==='admin' && <div className='w-full flex flex-col items-center justify-center '>
            <Link
               to='/profile'
               className='text-zinc-100 font-semibold w-full py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300'>
                All Orders
            </Link>

            <Link 
             to='/Profile/add-book'
             className='text-zinc-100 font-semibold w-full py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300'>
              Add Book
            </Link>

           
        </div>}

        <button className='bg-zinc-900 w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-white hover:text-zinc-900 transition-all duration-300'
         onClick= {()=> {
          dispatch(authActions.logout());
          dispatch(authActions.changeRole("user"));
          localStorage.clear("id");
          localStorage.clear("token");
          localStorage.clear("role");
          history("/");
         }}>
          Log Out <FaArrowRightToBracket className='ms-4' />  
        </button>
    </div>
  );
};

export default Sidebar;
