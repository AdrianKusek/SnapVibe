import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdAdd, IoMdSchool, IoMdSearch } from 'react-icons/io'
import { googleLogout } from '@react-oauth/google';

import { AiOutlineLogout } from 'react-icons/ai';
import { AiOutlineLogin } from 'react-icons/ai';

const Navbar = ({searchTerm, setSearchTerm, user}) => {
  const navigate = useNavigate();
 
  return (
    <div className='flex gap-2 md:gap-1 w-full mt-5 pb-7 justify-between' >
      <div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm  md:w-4/5 ">
        <IoMdSearch fontSize={21} className='ml-1'/>
        <input
          type='text'
          onChange={(e)=> setSearchTerm(e.target.value)}
          placeholder='Search'
          value={searchTerm}
          onFocus={()=> navigate('/search')}
          className='p-2 w-full bg-white outline-none'
        
        />

      </div>
      {user ? (
        <div className="flex gap-3">
        <Link 
          to={`user-profile/${user?._id}`} 
          className='hidden md:block'
          title='Profile'
        >
          <img src={user.image} alt='user-image' className='w-12 h-12 rounded-lg'/>
        </Link>
        <Link 
          to={`create-pin`} 
          className='bg-black text-white rounded-lg w-12 h-12 md:w-12 md:h-12 flex justify-center items-center'
          title='Create Pin'
        >
          <IoMdAdd  />
        </Link>
        <button
                  className='bg-white p-2 rounded-full cursor-pointer outline-none shadow-md'
                  onClick={() => {
                    googleLogout();
                    localStorage.clear(); // Clear local storage
                    navigate('/login'); // Redirect to login page after logout
                  }}
                  title="Log out"
                >
                  <AiOutlineLogout
                    color='red'
                    fontSize={34}
                  />
                </button>
      </div>
      ):(
        (<div className='flex justify-center items-center '>
          
          <Link 
            to={`login`}
            className='bg-white p-2 rounded-full cursor-pointer outline-none shadow-md '
            title='Log In'
          >
          
          <AiOutlineLogin 
            color='red'
            fontSize={42}
          />
        </Link>
        </div>)
      )}
      
    </div>
  )
}

export default Navbar