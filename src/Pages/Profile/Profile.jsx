import React from 'react';
import './Profile.scss';
import Container from '../../Components/Container/Container';
import Button from '../../Components/Button/Button';
import imgGuest from '../../images/profile/1.jpg';
import { useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { auth } from '../../firebase';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/auth/auth-slices';

const Profile = () => {
  const dispatch = useDispatch();
  const [newName, setNewName] = useState('');
  const [file, setFile] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const user = useSelector(state => state.user);
  // const user = useSelector(state => state.user);
  const navigate = useNavigate();
  const auth = getAuth();
  console.log('auth:', auth.currentUser);
  const storage = getStorage();

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
      } else {
        navigate('/sing');
      }
    });
  });

  const handleChangeName = e => {
    e.preventDefault();

    updateProfile(currentUser, {
      displayName: newName,
      //   photoURL: '',
    })
      .then(() => {
        setNewName('');
        dispatch(
          setUser({
            ...user,
            name: newName,
          }),
        );
      })
      .catch(error => {});
  };

  const handleFileUpload = e => {
    e.preventDefault();

    const storageRef = ref(storage, 'myFiles/' + file.name);

    uploadBytes(storageRef, file)
      .then(() => {
        getDownloadURL(storageRef).then(url => {
          dispatch(
            setUser({
              ...user,
              photo: url,
            }),
          );
          updateProfile(currentUser, {
            photoURL: url,
          });
        });
        console.log('Файл успішно завантажено на Firebase Storage');
      })

      .catch(error => {
        console.log(
          'Помилка під час завантаження файлу на Firebase Storage:',
          error,
        );
      });
  };

  return (
    <>
      <Container>
        <h1 className="title profile__title">Ваш профіль </h1>

        <div className="profile">
          <div className="profile__img">
            {user.photo ? (
              <img src={user.photo} alt="Фото профіля" />
            ) : (
              <img src={imgGuest} alt="Фото профіля" />
            )}
          </div>

          <div className="profile__info">
            <h2>Ваше імя</h2>

            <div className="profile__update">
              <h2>Обновити інформацію</h2>

              <form onSubmit={handleChangeName} name="Обновити імя ">
                <label htmlFor="">Обновити імя</label>
                <input
                  type="text"
                  value={newName}
                  onChange={e => setNewName(e.target.value)}
                />
                <Button
                  type={'submit'}
                  title={'Зберегти'}
                  clasName={'button'}
                />
              </form>

              <div>
                <form onSubmit={handleFileUpload}>
                  <input
                    type="file"
                    // value={file}
                    onChange={e => setFile(e.target.files[0])}
                  />

                  <Button
                    type={'submit'}
                    title={'Завантажити фото'}
                    clasName={'button'}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;
