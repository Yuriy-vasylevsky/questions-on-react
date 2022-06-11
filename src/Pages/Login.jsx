import React from 'react';
import Form from '../Components/Form/Form';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/auth/auth-slices';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '../Components/Button/Button';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const hendelLogin = (email, password, e) => {
    e.preventDefault();
    const auth = getAuth();
    console.log('~ auth', auth);

    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
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
        alert('Такой Email уже существует');
      });
  };
  return (
    <div>
      <Form title={'Регистрация'} onClickForm={hendelLogin}>
        <Link to="/sing" className="link">
          <Button
            title={'Уже есть акаунт?'}
            clasName={'formBtn '}
            type={'button'}
          />
        </Link>
      </Form>
    </div>
  );
}
