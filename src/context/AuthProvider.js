import React, {useState, useEffect} from 'react';
import jwt from 'jsonwebtoken';
import useAjax from '../components/customHooks/useAjax.js';
import cookie from 'react-cookies';
import superagent from 'superagent';
import TodoForm from '../components/todo/form.js';



const API_URL = 'https://api-js401.herokuapp.com';


export const AuthContext = React.createContext();

function AuthProvider(props) {

  let [user, setUser] = useState({})
  let [token,setToken]= useState('')
  let [response, request]= useAjax()

  useEffect(() => {
    console.log(response);
    if (isValidUser(response.token)) {
      setUser(response.user);
      setToken(response.token);
      cookie.save('auth', response.token);
    }
  }, [response]);

  useEffect(() => {
    let token = cookie.load('auth');
    if (token) {
      setToken(token);
    }
  }, []);

  const isValidUser = (token) => {
    const validUser = jwt.decode(token);
    if (validUser) {
      if (validUser.username === user.username) return true;
    } else {
      return false
    }
  }

  const login = (username, password) => {
    // basic authentication header options
    let options = {
      url: `${API_URL}/signin`,
      method: 'post',
      headers: {
        Authorization: `Basic ${btoa(`${username}:${password}`)}`
      },
      input:{}
    }
    request(options);
  }

  const logout = () => {
    setUser({});
    setToken('');
    cookie.remove('auth');
  }

  return (

   
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {props.children}
    </AuthContext.Provider>
  
  )
}

export default AuthProvider;



