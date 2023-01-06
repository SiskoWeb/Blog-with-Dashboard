import React, { useState, useEffect,useContext } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from "react-router-dom";
import { auth, app,provider } from "../firebase/firebase-config"
import { getAuth, signInWithEmailAndPassword,signInWithPopup } from "firebase/auth";




export default function LoginPage() {
   

    let navigate = useNavigate();

 

  
    const [email, setEmail] = useState("")
    const [password, setPassWord] = useState("")
    const [error, setError] = useState(false)

    const auth = getAuth();

    const onLogin = (e) => {
      
        e.preventDefault();
      
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                localStorage.setItem("isAuth", true);
           
                const user = userCredential.user;
                console.log(user)
          
          
            
                window.location.pathname = "/dashboard";
                // navigate("/dashboard");
                setEmail("")
                setPassWord("")
                // ...
            })
            .catch((error) => {
                // setIsAuth(false)

                setError(true)
                const errorCode = error.code;
                const errorMessage = error.message;
            });
   

    }

    return (
       <div className='page-login'>
       <p>
       <h1>account 1</h1>
       <h5>email:blog@yassine.info</h5>
       <h5>password:yassine123</h5>
       <h1>##########################</h1>
       </p>
       <p>
       <h1>account 2</h1>
       <h5>email:new@gmail.com</h5>
       <h5>password:yassine123</h5>
       <h1>##########################</h1>
       </p>
       <Form  className='login' onSubmit={onLogin}>
       {error?<h1>there is error</h1>:null}
           <Form.Group className="mb-3" controlId="formBasicEmail">
               <Form.Label>Email address</Form.Label>
               <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
             
           </Form.Group>

           <Form.Group className="mb-3" controlId="formBasicPassword">
               <Form.Label>Password</Form.Label>
               <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassWord(e.target.value)} />
           </Form.Group>

           <Button variant="primary" type="submit">
               Submit
           </Button>
       </Form>
     
       </div>
    )
}
