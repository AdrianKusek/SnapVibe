import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom'
import { client } from '../client'
import {feedQuery, searchQuery} from '../utils/data'
import MasonaryLayout from './MasonaryLayout'
import Spinner from './Spinner'

const Feed = () => {
  const[loading, setLoading] = useState(false)
  const [pins, setPins] =  useState(null)
  const {categoryId} = useParams()

  useEffect(()=>{
    setLoading(true)
    if(categoryId){
      const query = searchQuery(categoryId)
      // console.log(query, 'n q')
      client.fetch(query)
        .then((data)=>{
          setPins(data)
          setLoading(false)
        })

    }
    else{
      client.fetch(feedQuery)
      // console.log(feedQuery, 'feed q')
        .then((data) =>{
          setPins(data)
          setLoading(false)
        })

    }

  },[categoryId])

  if(loading) return <Spinner message='We are adding new ideas to your feed'/>
  if(!pins?.length ) return <h1>Nothing to show here</h1>
  return (
    <div>
      {pins && <MasonaryLayout pins={pins}/>}
    </div>
  )
}

export default Feed