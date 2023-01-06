import React, { useState, useEffect } from 'react'
import {Link} from "react-router-dom"
import "./card.css"
import { collection, addDoc ,deleteDoc,doc,getDocs} from "firebase/firestore";
import { auth, db, storage } from "../firebase/firebase-config"
import notify from '../hook/useNotifcation'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useSelector, useDispatch } from 'react-redux'
export default function Card({text,title,id,setUpdate,update,date,urlCover,autor}) {
  const count = useSelector(state => state.Red.isAuth)

  //check if user Loging
  const [isAuth, setIsAuth] = useState(count);
  const [userId, setUserId] = useState('')  ;
  const [userName, setUserName] = useState('')  ;
  const auth = getAuth();


useEffect(()=>{

  onAuthStateChanged(auth, (user) => {
    if (user) {
    
     
      setUserId(user.uid)

    } else {
      setUserId('')
    }
  });
},[])

//Delet img
const deletPost  = async(id)=>{
    const pathimg = doc(db, "Posts",id)
    await deleteDoc(pathimg)
    setUpdate(!update)
    notify()
    
    }
  



  return (
<div className='card-main'>


<Link className='link' to={`/${id}`}>
<div className='Card'> 

<div className='cover'><img style={{width:'300px'}} src={urlCover}></img></div>
<p>{date}</p>
<div className='title'> {title}</div>


</div>

</Link>
{isAuth?(userId === autor? <i onClick={()=>deletPost(id)} className="btn-remove fa-solid fa-trash "></i> :null):null}
</div>
  )
}
