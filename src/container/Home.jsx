import React, {useState, useRef, useEffect} from 'react'
import {HiMenu} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {Link, Routes, Route} from 'react-router-dom'
import Pins from './Pins'
import {Sidebar, UserProfile} from '../components'
import { client } from '../client'
import logo from '../assets/logo.png'
import { userQuery } from '../utils/data'
import { fetchUser } from '../utils/fetchUser'


const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false)
  const [user, setUser] = useState(null)
  const scrollRef = useRef(null)

  const userInfo = fetchUser()
  console.log(userInfo,' yooooo')
  
  useEffect(()=>{
    const query = userQuery(userInfo?.sub)
    console.log(query)
    client.fetch(query)
      .then((data)=>{
        setUser(data[0])
        
      })

  },[])
  useEffect(()=>{
    scrollRef.current.scrollTo(0,0)



  },[])
  // let unsplash;
  // fetch('https://api.unsplash.com/photos/random?client_id=8SJZ50QD3NuOkhOe9jrM_mPJEsGAOBu11mCaR6APKSY')
  //   .then(response => response.json())
  //   .then(data => {
      
  //     unsplash = data.urls.full;
  //     console.log(unsplash);
  //   })
  //   .catch(error => {
  //     console.error('Error:', error);
  //   });
  return (
    <div className='flex bg-gray-50 md:flex-row flex-col h-full transition-height duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar user={user && user}/>
      </div>
      {/* <div>
      <img src={unsplash}/>My unsplash
      </div> */}
      
      <div className='flex md:hidden flex-row'>
        <div className='p-2 w-full flex flex-row justify-between items-center shadow-md '>
        <HiMenu fontSize={40}
                className='cursor-pointer'
                onClick={()=>{
                  setToggleSidebar(true)
                }}
        />
        <Link to={'/'}>
                <img src={logo} alt='logo' className='w-24'/>
        </Link>
        {console.log('user tutaj',user)}
        {user && (<Link to={`user-profile/${user?._id}`}>
                <img src={user?.image} alt='user' className='w-12'/>
                {user?.name}
        </Link>)}
        

        </div>
       
        {
          toggleSidebar && (
            <div className='fixed w-4/5 bg-white h-full overflow=y-auto shadow-md z-10 animate-slide-in'>
              <div className='absolute w-full flex justify-end items-center p-2'>
                <AiFillCloseCircle fontSize={30}className='cursor-pointer' onClick={()=>{
                  setToggleSidebar(false)
                }}/>

              </div>
              <Sidebar user={user && user} closeToggle={setToggleSidebar}/>

            </div>
          )
        }
        </div>
        <div className='pb-2 flex-1 h-screen owerflow-y-scroll' ref={scrollRef}>
          <Routes>
            <Route path='/user-profile/:userId' element={<UserProfile  />}/>
            <Route path='/*' element={<Pins user={user && user}/>}/>
          </Routes>

        </div>

      
    </div>
  )
}

export default Home