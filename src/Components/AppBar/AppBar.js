import s from './AppBar.module.scss';
import Container from '../Container/Container';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../redux/auth/auth-slices';
import useAuth from '../../hook/use-uath';
import Button from '../Button/Button';

export default function AppBar() {
  const dispatch = useDispatch();
  const { isAuth, email } = useAuth();
  const logAut = () => {
    dispatch(removeUser());
  };

  return (
    <header className={s.header}>
      <Container>
        <div className={s.flex}>
          <Link to="/" className={s.logo}>
            <span className={s.logoRed}>Q</span>uestions
          </Link>

          {!isAuth ? (
            <>
              {/* <Link to="sing" className={s.logo}>
              Войти
            </Link>
            <Link to="login" className={s.logo}>
              Регистрация
            </Link> */}
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
