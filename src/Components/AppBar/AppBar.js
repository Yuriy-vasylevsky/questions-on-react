import s from './AppBar.module.scss';
import Container from '../Container/Container';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import { useEffect } from 'react';
import React, { useState } from 'react';
import { getAuth } from 'firebase/auth';

export default function AppBar() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isAuth, setIsAuth] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const auth = getAuth();

  const logAut = () => {
    setIsAuth('');
    auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        console.log('user:', user);
        setEmail(user.reloadUserInfo.email);
        setIsAuth(user.reloadUserInfo.email);
        setPhotoURL(user.photoURL);
        setName(user.displayName);
      } else {
        setEmail('');
        setIsAuth('');
      }
    });

    return unsubscribe;
  }, [auth]);

  return (
    <header className={s.header}>
      <Container>
        <div className={s.header__container}>
          <Link to="/" className={s.logo}>
            <span className={s.logoRed}>Q</span>
            <span className={s.logo__text}>vestin</span>
          </Link>

          {!isAuth ? (
            <div className={s.auth__box}>
              <Link to="sing" className={s.text}>
                Увійти
              </Link>
              <Link to="login" className={s.text}>
                Зареєструватися
              </Link>
            </div>
          ) : (
            <div className={s.flex}>
              <Button onClick={logAut} title={'Вийти'} clasName={'button'} />
              <div className={s.profile__box}>
                {name ? (
                  <p className={s.text}>{name}</p>
                ) : (
                  <p className={s.text}>{email}</p>
                )}
                <Link to="/profile" className={s.logo}>
                  <img
                    src={photoURL}
                    alt="Аватар профіля"
                    className={s.heder__img}
                  />
                </Link>
              </div>
            </div>
          )}
        </div>
      </Container>
    </header>
  );
}
