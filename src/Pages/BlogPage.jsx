
import React, { useState, useEffect } from 'react'
import { GetAllPosts, } from '../Redux/Actions/PostesAction'
import { useSelector, useDispatch } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import './BlogPage.css'


import { BrowserRouter, Routes, Route ,Link} from "react-router-dom"
import { useParams } from 'react-router-dom';
export default function BlogPage() {

const parmas = useParams()
    const dispatchNovies = useDispatch();
    const [postsbyId, setPpostsbyId] = useState([])

    //get data from fireStore using redux
    useEffect(() => {
      // getMovies()
      dispatchNovies(GetAllPosts())

    }, [])
  
 
    const Posts = useSelector(state => state.DataPosts.Posts)
  
    useEffect(() => {

        
        GetData()
   
   
    }, [Posts])
  
  //Get Details by id
const GetData = () => {
  
        const newAr = Posts.filter((item) => item.id === parmas.id)
        setPpostsbyId(newAr)

    
  }





  return (
    <div>
 
    {postsbyId.map((i)=>{

        return(

        <>
        <img src={i.urlCover}></img>
        <h1>{i.title}</h1>
        <p>{i.text}</p>
        </>
        )
    })}
    
    </div>
  )
}
