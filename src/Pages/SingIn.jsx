import React from 'react';
import Form from '../Components/Form/Form';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/auth/auth-slices';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '../Components/Button/Button';
export default function SingIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onClickForm = (email, password, e) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(
          setUser({
            email: user.email,
            token: user.accessToken,
            id: user.uid,
          }),
        );
        navigate('/');
      })
      .catch(error => {
        alert('Пользователь не найден');
      });
  };
  return (
    <div>
      <Form title={'Войти'} onClickForm={onClickForm}>
        <Link to="/login" className="link">
          <Button
            title={'Нет акаунта?'}
            clasName={'formBtn '}
            type={'button '}
          />
        </Link>
      </Form>
    </div>
  );
}
