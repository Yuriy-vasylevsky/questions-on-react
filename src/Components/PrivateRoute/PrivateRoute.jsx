import { Route, Navigate } from 'react-router-dom';
import { auth } from '../../firebase';
import React, { useState } from 'react';
export default function PrivateRoute({ component: Component }) {
  const [isAuth, setIsAuth] = useState('');

  auth.onAuthStateChanged(user => {
    if (user) {
      setIsAuth(user.reloadUserInfo.email);
    } else {
      return null;
    }
  });

  return <>{isAuth ? <Component /> : <Navigate to="/sing" />}</>;
}
