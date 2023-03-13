import s from './AppBar.module.scss';
import Container from '../Container/Container';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
// import { useEffect } from 'react';
import { auth } from '../../firebase';
import React, { useState } from 'react';

export default function AppBar() {
  const [email, setEmail] = useState('');
  const [isAuth, setIsAuth] = useState('');
  const logAut = () => {
    auth.signOut();
  };

  auth.onAuthStateChanged(user => {
    if (user) {
      setEmail(user.reloadUserInfo.email);
      setIsAuth(user.reloadUserInfo.email);
    } else {
      setEmail('');
      return null;
    }
  });
  console.log('isAuth:', isAuth);

  return (
    <header className={s.header}>
      <Container>
        <div className={s.flex}>
          <Link to="/" className={s.logo}>
            <span className={s.logoRed}>Q</span>uestions
          </Link>

          {!isAuth ? (
            <>
              <Link to="sing" className={s.logo}>
                Войти
              </Link>
              <Link to="login" className={s.logo}>
                Регистрация
              </Link>
            </>
          ) : (
            <div className={s.flex}>
              <Button onClick={logAut} title={'Выйти'} clasName={'button'} />
              <p className={s.text}>{email}</p>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}
