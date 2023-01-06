import React, { useState, useEffect } from 'react'
import { GetAllPosts,createPostsRedux } from '../Redux/Actions/PostesAction'
import { useSelector, useDispatch } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Card from '../Components/Card'

import { getAuth, onAuthStateChanged } from "firebase/auth";

import { BrowserRouter, Routes, Route ,Link} from "react-router-dom"



export default function Home() {
    const dispatchNovies = useDispatch();
    const [posts, setPosts] = useState([])
    const [update, setUpdate] = useState(false)



    //get data from fireStore using redux
    useEffect(() => {
      // getMovies()
      dispatchNovies(GetAllPosts())
  
    }, [])
  
 
    const Posts = useSelector(state => state.DataPosts.Posts)
  
    useEffect(() => {
        setPosts(Posts)

      console.log(Posts)
    }, [Posts])
  

    // {Posts.map((i)=>  <Card autor={i.autor} key={i.id} setUpdate={setUpdate} update={update}  urlCover={i.urlCover} title={i.title} text={i.text} id={i.id}  />  )}

  return (
    <>
 
    <h1 style={{textAlign:"center"}}>Share Your Knowledge</h1>
    
    <div className='list-card'>

  {Posts.map((i)=>  <Card autor={i.autor} date={i.date} key={i.id} setUpdate={setUpdate} update={update}  urlCover={i.urlCover} title={i.title} text={i.text} id={i.id}  />  )}

    
    </div>
</>
  )
}
