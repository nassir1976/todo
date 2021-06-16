import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider.js'
import jwt from 'jsonwebtoken';
import { When } from 'react-if';
// import {LoginContext} from '../../context/AuthProvider.js';

function Auth({ capability, children }) {

  let context = useContext(AuthContext)

  const isAutrized = (capability) => {
    let userData = jwt.decode(context.token)
    if (userData) {
      return userData.capabilities.includes(capability) ? true : false
    }
    return false

  }
  return (
    <>
      <When condition={isAutrized(capability)}>
        {children}
      </When>
      {/* <When condition={!isAutrized(capability)}>
        <h4>not Authrized</h4>
      </When> */}
    </>
  )


}

export default Auth;

