import React, { useState, useEffect } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useParams, useNavigate } from 'react-router-dom';
import { googleLogout } from '@react-oauth/google';

import { userCreatedPinsQuery, userQuery, userSavedPinsQuery } from '../utils/data';
import { client } from '../client';
import MasonaryLayout from './MasonaryLayout';
import Spinner from './Spinner';
import image from '../assets/nature.jpg';

const activeBtnStyles = 'bg-red-500 text-white font-bold w-20 p-2 rounded-full outline-none';
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold w-20 p-2 rounded-full outline-none';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState('Created');
  const [activeBtn, setActiveBtn] = useState('Created');
  const navigate = useNavigate();
  const { userId } = useParams();

  useEffect(() => {
    const query = userQuery(userId);
    client
      .fetch(query)
      .then((res) => setUser(res[0]));
  }, [userId]);

  useEffect(() => {
    if (text === 'Created') {
      const createdPinsQuery = userCreatedPinsQuery(userId);
      client
        .fetch(createdPinsQuery)
        .then((res) => setPins(res));
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);
      client
        .fetch(savedPinsQuery)
        .then((res) => setPins(res));
    }
  }, [text, userId]);

  if (!user) {
    return <Spinner message={'Loading profile'} />;
  }

  return (
    <div className='relative pb-2 h-full justify-center items-center'>
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              src={image}
              className='w-full h-370 2xl:h-570 shadow-lg object-cover'
              alt='banner-picture'
            />
            <img
              className='rounded-full w-20 h-20 -mt-10 shadow-xl object-cover'
              src={user?.image}
              alt='profile-picture'
            />
            <h1 className="font-bold text-3xl text-center mt-3">
              {user?.userName}
            </h1>
            <div className="absolute top-0 right-0 z-1 p-2">
              {userId === user?._id && (
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
                    fontSize={42}
                  />
                </button>
              )}
            </div>
          </div>
          <div className="text-center mb-7">
            <button
              type='button'
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn('Created');
              }}
              className={`${activeBtn === 'Created' ? activeBtnStyles : notActiveBtnStyles}`}
            >
              Created
            </button>
            <button
              type='button'
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn('Saved');
              }}
              className={`${activeBtn === 'Saved' ? activeBtnStyles : notActiveBtnStyles}`}
            >
              Saved
            </button>
          </div>
          <div className="px-2">
            {pins?.length ? (
              <MasonaryLayout pins={pins} />
            ) : (
              <div className='flex justify-center font-bold items-center w-full text-xl mt-2'>
                No pins found
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;