import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; // Correct named importimport { useNavigate } from 'react-router-dom';
import {FcGoogle} from 'react-icons/fc'
import shareVideo from '../assets/share.mp4'
import logo from '../assets/logo.png'
import { client } from '../client';
import { useNavigate } from 'react-router-dom';


const Login = () => {
  const navigate = useNavigate()
  return (
    <div className='flex justify-start items-center flex-col h-screen'>
      <div className='relative h-full w-full'>
        <video
          src={shareVideo}
          type='video/mp4'
          loop
          controls={false}
          muted
          autoPlay
          className='w-full h-full object-cover'
        />
        <div className='absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay'>
          <div className='p-5'>
            <img src={logo} width='130px' alt='logo'/>
          </div>
          <div className='shadow-2xl'>
           
            <GoogleLogin className='rounded-lg'
              onSuccess={(credentialResponse) => {
                const token = credentialResponse.credential;
                const decoded = jwtDecode(token); // Decode the JWT token to get user profile data
                console.log(decoded); // Contains user profile information
                localStorage.setItem('user', JSON.stringify(decoded)); // Example: Saving user profile in localStorage                console.log(credentialResponse);
                const {name, sub, picture} = decoded
                const doc = {
                  _id: sub,
                  _type: 'user',
                  userName: name,
                  image: picture
                }
                client.createIfNotExists(doc)
                  .then(()=>{
                    navigate('/', {replace:true})

                  })
              }}
              onError={() => {
              console.log('Login Failed');
              }}
            />
     
           
          </div>
        </div>
      </div>

    </div>
  )
}

export default Login