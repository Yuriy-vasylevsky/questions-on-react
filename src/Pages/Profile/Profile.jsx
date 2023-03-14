import React from 'react';
import { useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';

const Profile = () => {
  const [newName, setNewName] = useState('');
  const [file, setFile] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();
  const storage = getStorage();
  console.log('storage:', storage);

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
    updateProfile(auth.currentUser, {
      displayName: newName,
      //   photoURL: '',
    })
      .then(() => {
        // Profile updated!
        // ...
      })
      .catch(error => {
        // An error occurred
        // ...
      });
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
    <div>
      <form onSubmit={handleChangeName}>
        <input type="text" onChange={e => setNewName(e.target.value)} />
        <button type="submit">Зберегти</button>
      </form>

      <div>
        <form onSubmit={handleFileUpload}>
          <input type="file" onChange={e => setFile(e.target.files[0])} />
          <button type="submit">Завантажити фото</button>
        </form>
      </div>

      {/* <h2>Сторінка профіля {auth.currentUser.displayName}</h2>
      <img src={auth.currentUser.photoURL} alt="Фото профіля" /> */}
    </div>
  );
};

export default Profile;
