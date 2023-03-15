import React from 'react';
import './Profile.scss';
import Container from '../../Components/Container/Container';
import Button from '../../Components/Button/Button';
import imgGuest from '../../images/profile/1.jpg';
import { useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { auth } from '../../firebase';

const Profile = () => {
  const [newName, setNewName] = useState('');
  const [file, setFile] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();
  const storage = getStorage();
  const currentUser = auth.currentUser;

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        return;
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
      .then(() => {})
      .catch(error => {});
  };

  const handleFileUpload = e => {
    e.preventDefault();
    //   setFile(event.target.files[0]);
    // const file = event.target.files[0];

    // Завантажуємо файл на Firebase Storage
    const storageRef = ref(storage, 'myFiles/' + file.name);

    uploadBytes(storageRef, file)
      .then(() => {
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
            {currentUser.photoURL ? (
              <img src={currentUser.photoURL} alt="Фото профіля" />
            ) : (
              <img src={imgGuest} alt="Фото профіля" />
            )}
          </div>

          <div className="profile__info">
            <h2>Ваше імя</h2>

            <div className="profile__update">
              <h2>Обновити інформацію</h2>

              <form onSubmit={handleChangeName} name="обновити імя ">
                <label htmlFor="">Обновити імя</label>
                <input type="text" onChange={e => setNewName(e.target.value)} />
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
