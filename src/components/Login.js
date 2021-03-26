import React, { useEffect, useState } from "react";
import axios from "axios";


const initialFormValues = {
  username: '',
  password: '',
}

const Login = (props) => {
  const [formValues, setFormValues]= useState(initialFormValues)
  
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route


  console.log('props:', props)
  const changa = (e) => {
    setFormValues({ ...formValues,
      [e.target.name]: e.target.value}
    )
  }

  useEffect(()=>{
    // make a post request to retrieve a token from the api
    // when you have handled the token, navigate to the BubblePage route
  });

  const submitToMyWillSillyForm = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/login', { username: 'Lambda School', password: 'i<3Lambd4' })
    .then(res => {
      console.log('res:', res)
      //res.data.payload gives us token
      localStorage.setItem('token', res.data.payload)
      props.history.push('/protected/bubblePage')
    })
    .catch(err =>{
      console.log({'err:': err})
    });
  }

  console.log('formValues:', formValues)
  return (
    <>
      <h1>
        Welcome to the Bubble App!
        <p>Build a login page here</p>
        <form onSubmit={submitToMyWillSillyForm}>
          <label htmlFor='username'>Username</label>
          <input type='text' name='username' value={formValues.username} onChange={changa} id='username' placeholder='Username..' />
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' value={formValues.password} onChange={changa} id='password' placeholder='Password..' />
          <button>Gain Ultra High Level Bubble Clearance</button>
        </form>
      </h1>
    </>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEXT "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.