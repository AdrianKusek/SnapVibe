import React, { useState } from 'react';
import { urlFor, client } from '../client';
import { Link, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { MdDownloadForOffline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { fetchUser } from '../utils/fetchUser';

const user = fetchUser();

const extractDomain = (url) => {
  const match = url.match(/^(https?:\/\/)?(www\.)?([^\/]+)/);
  const domain = match ? match[3] : url;
  return domain.length > 8 ? `${domain.slice(0, 8)}...` : domain;
};

const Pin = ({ pin: { postedBy, image, _id, destination, save } }) => {
  const alreadySaved = !!save?.filter((item) => item.postedBy._id === user?.sub).length;

  const savePin = (id) => {
    if (!alreadySaved && user) {
      client
        .patch(id)
        .setIfMissing({ save: [] })
        .insert('after', 'save[-1]', [{
          _key: uuidv4(),
          userId: user.sub,
          postedBy: {
            _type: 'postedBy',
            _ref: user.sub
          }
        }])
        .commit()
        .then(() => {
          window.location.reload();
        });
    }
  };

  const deletePin = (id) => {
    client
      .delete(id)
      .then(() => {
        window.location.reload();
      });
  };

  const [postHovered, setPostHovered] = useState(false);
  const navigate = useNavigate();

  const handleTouchStart = () => {
    setPostHovered(true);
  };

  const handleTouchEnd = () => {
    setTimeout(() => {
      setPostHovered(false);
    }, 3000); // 3 second delay
  };

  const handleButtonClick = (e, action) => {
    e.preventDefault(); // Prevents any default behavior
    e.stopPropagation(); // Stops React event propagation
    e.nativeEvent.stopImmediatePropagation(); // Stops native propagation
    action();
  };

 

  return (
    <div className='m-2'>
      <div
        onMouseEnter={() => setPostHovered(true)}
        onMouseLeave={() => setPostHovered(false)}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onClick={() => navigate(`/pin-detail/${_id}`)}
        className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out'
      >
        <img className='rounded-lg w-full' alt='user-post' src={urlFor(image).width(750).url()} />
        {postHovered && (
          <div
            className='absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50'
            style={{ height: '100%' }}
          >
            <div className='flex items-center justify-between'>
              <div className="flex gap-2">
                <a
                  href={`${image?.asset?.url}?dl=`}
                  onClick={(e) => {
                    e.stopPropagation(); 
                   
                  }}
                  download
                  className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              {(alreadySaved) ? (
                <button type='button' className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'>
                  {save?.length} Saved
                </button>
              ) : (
                <button
                  type='button'
                  className='bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'
                  onClick={(e) => {
                    savePin(_id);        // Call savePin function
                    e.stopPropagation(); // Correct function call with parentheses
                   
                  }}
                  
                >
                  Save
                </button>
              )}
            </div>
            <div className='flex justify-between items-center gap-2 w-full'>
              {destination && (
                <a
                  href={destination.startsWith('http') ? destination : `http://${destination}`}
                  onClick={(e) => {
                    e.stopPropagation(); 
                   
                  }}
                  target='_blank'
                  rel='noreferrer'
                  className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md'
                >
                  <BsFillArrowUpRightCircleFill />
                  {extractDomain(destination)}
                </a>
              )}
              {postedBy?._id === user?.sub && (
                <button
                  type='button'
                  className='bg-white p-2 opacity-70 hover:opacity-100 font-bold text-dark text-base rounded-3xl hover:shadow-md outline-none'
                  onClick={(e) => handleButtonClick(e, () => deletePin(_id))}
                >
                  <AiTwotoneDelete />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      {/* <Link
        to={`user-profile/${postedBy?._id}`}
        className='flex gap-2 mt-2 items-center'
      >
        <img
          className='w-8 h-8 rounded-full object-cover'
          src={postedBy?.image}
          alt='user-profile'
        />
        <p className="font-semibold capitalized">
          {postedBy?.userName}
        </p>
      </Link> */}
    </div>
  );
};

export default Pin;