import React from 'react';
import Form from '../Components/Form/Form';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/auth/auth-slices';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Button from '../Components/Button/Button';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export default function SingIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
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

  const hendelLoginGoogle = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        navigate('/');

        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log('credential:', credential);
        const token = credential.accessToken;
        console.log('token:', token);
        const user = result.user;
        console.log('user:', user);
      })
      .catch(error => {
        // const errorCode = error.code;
        // const errorMessage = error.message;
        // const email = error.customData.email;
        // const credential = GoogleAuthProvider.credentialFromError(error);
      });
  };
  return (
    <div>
      <Form title={'Увійти'} onClickForm={onClickForm}>
        <Link to="/login" className="link">
          <Button
            title={'Немає акаунта?'}
            clasName={'formBtn'}
            type={'button'}
          />
          <Button
            onClick={hendelLoginGoogle}
            title={'Увійти з Google'}
            clasName={'formBtn'}
            type={'button'}
          />
        </Link>
      </Form>
    </div>
  );
}
