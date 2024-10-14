import React from 'react';
import { Circles } from 'react-loader-spinner';

const Spinner = ({ message }) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <Circles
       
        color='#00BFFF' // Fixed the color value
        height={50}     // Adjust height and width if needed
        width={50}      // Changed to match the height for a circular spinner
        className='m-5'
        visible={true}
      />
      {message && <p className="text-lg text-center px-2">{message}</p>} {/* Render message only if provided */}
    </div>
  );
}

export default Spinner;
