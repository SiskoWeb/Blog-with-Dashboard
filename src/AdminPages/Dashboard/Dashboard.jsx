
import React, { useState, useEffect } from 'react'
import { GetAllPosts, createPostsRedux, uploadImgRedux } from '../../Redux/Actions/PostesAction'
import { useSelector, useDispatch } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import Card from '../../Components/Card'
import { auth, db, storage } from "../../firebase/firebase-config"

import avatar from '../../images/avatar.png'
import './Dahsboard.css'

import { getAuth, onAuthStateChanged } from "firebase/auth";
export default function Dashboard() {

  const dispatch2 = useDispatch();
  const dispatchNovies = useDispatch();
  let today = new Date().toLocaleDateString()

  const [loading, setLoading] = useState(false);
  const [isPress, setIsPress] = useState(false);
  const [mainTextPost, setMinTextPost] = useState("");


  const [titleBlog, setTitleBlog] = useState("");

  const auth = getAuth();


  //imput data


  const [posts, setPosts] = useState([])
  const [imgUpload, setImgUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState(avatar);
  const [upload, setUpload] = useState(false)
  //handle error
  const [errorImg, setErrorImg] = useState(false)
  const [error, setError] = useState(false)
  const [update, setUpdate] = useState(false)
  const [userId, setUserId] = useState('')  ;

  //get data from fireStore using redux
  useEffect(() => {
    // getMovies()
    dispatchNovies(GetAllPosts())
    onAuthStateChanged(auth, (user) => {
      if (user) {
      
       
        setUserId(user.uid)
      } else {
        setUserId('')
      }
    });
  }, [update])


  const PostsData = useSelector(state => state.DataPosts.Posts)

  useEffect(() => {

    GetData(PostsData)
  }, [PostsData])






  //upload cover posts to firebase using redux
  const uploadImg = () => {
    if (imgUpload == null) {
      setErrorImg(true)
      console.log("clicked image")

    }
    else {
      setLoading(true)
      setIsPress(true)

      dispatchNovies(uploadImgRedux(imgUpload, setImageUrls, setLoading, imageUrls))

      setUpload(true)
      setError(false)
    }

  }




  //create  Posts with image should wait function upload image to firebase || imgUpload == null || upload == false ||imageUrls == avatar
  const onCreate = async () => {

    if (mainTextPost.length == 0 || titleBlog.length == 0 || imgUpload == null || upload == false || imageUrls == avatar) {
      setError(true)
console.log("clicked create")
    }

    else {
      setError(false)

      setLoading(true)

      dispatchNovies(createPostsRedux(mainTextPost, titleBlog, setLoading, today, imageUrls))


      setUpdate(!update)
      setLoading(false)
      setMinTextPost('')
      setTitleBlog('')
    }
  }

  //when image change save it 
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {

      setImageUrls(URL.createObjectURL(event.target.files[0]))
      setImgUpload(event.target.files[0])
      setErrorImg(true);
    }
  }

  const GetData = (PostsData) => {

    const newAr = PostsData.filter((item) => item.autor === userId)

    setPosts(newAr)

  }

  return (


    <div className='dashboard'>


      <div className='upload-section'>
        {
          isPress ? loading ?
            <h4 >Loading...</h4>
            : <h3 className='done-uploaded'>Image Uploaded!</h3> : <h4>Upload Image First</h4>
        }
        <label htmlFor="upload-photo">
          <img
            src={imageUrls}
            alt="fzx"
            height="100px"
            width="120px"
            style={{ cursor: "pointer" }}
          />
        </label>
        <input className='hideinputImg'
          type="file"
          name="photo"
          onChange={onImageChange}

          id="upload-photo"
        />
        {errorImg && imgUpload == null ?
          <label className='error animate__animated animate__shakeX'>add image Empty</label> : ""}
        {error && upload == false ?
          <label className='error animate__animated animate__shakeX'>upload image</label> : ""}
        <button onClick={uploadImg}>upload image First</button>
      </div>


    

     <div className='input-section'>
     <div className='title'>
     {error && titleBlog.length <= 0 ?
       <label className='error animate__animated animate__shakeX'>Title can't be Empty</label> : ""}
     <input onChange={(e) => setTitleBlog(e.target.value)} value={titleBlog} className="css-input" type="text" placeholder='Add title'></input>
   </div>
   <div className='Post'>
     {error && mainTextPost.length <= 0 ?
       <label className='error animate__animated animate__shakeX'>Text can't be Empty</label> : ""}
     <textarea onChange={(e) => setMinTextPost(e.target.value)} value={mainTextPost} className="css-input" type="text" placeholder='Add Text'></textarea>
   </div>
   <div onClick={() => onCreate()} className='addPost'>Add Item </div>
     </div>
      <br></br>

      <div className='list-card'>

        {posts.map((i) => <Card key={i.id} autor={i.autor} date={i.date} urlCover={i.urlCover} id={i.id} title={i.title} text={i.text} setUpdate={setUpdate} update={update} />)}

      </div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  )
}
