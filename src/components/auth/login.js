import React, {useState,useContext} from 'react';

import useForm from '../customHooks/useForm.js';
import {If, Then, Else} from 'react-if';
import {AuthContext} from '../../context/AuthProvider.js';





function Login() {

  const [handleChange, handleSubmit] = useForm(handleLogin);
  const context = useContext(AuthContext);

  // const handleChange = (e) => {
  //   setUser( {...user, [e.target.name]: e.target.value})
  // }
  function handleLogin(userDetails){
    context.login(userDetails.username,userDetails.password)
  }
  

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // send the user object to: context
  //   context.login(user);
  // }


  return (
    <If condition={context.token}>
      <Then>
        <button onClick={context.logout}>Log Out</button>
      </Then>
      <Else>
        <form  className="form"  onSubmit={handleSubmit}>
          <input placeholder="username" name="username" onChange={handleChange} />
          <input name="password" type="password" onChange={handleChange} />
          <button  name="password">Login</button>
        </form>
      </Else>
    </If>
  )

}

export default Login;
