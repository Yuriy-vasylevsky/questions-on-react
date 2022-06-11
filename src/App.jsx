import './App.scss';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'react-toastify/dist/ReactToastify.css';
import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Pages/Login';
import SingIn from './Pages/SingIn';

const HomePage = React.lazy(() => import('./Pages/HomePage/HomePage'));
const QuestionsPage_1 = React.lazy(() =>
  import('./Pages/QuestionsPage_1/QuestionsPage_1'),
);

const QuestionsPage2 = React.lazy(() =>
  import('./Pages/QuestionsPage2/QuestionsPage2'),
);

const QuestionsPage_3 = React.lazy(() =>
  import('./Pages/QuestionsPage_3/QuestionsPage_3'),
);

const QuestionsPage_4 = React.lazy(() =>
  import('./Pages/QuestionsPage_4/QuestionsPage_4'),
);
const Layouts = React.lazy(() => import('./Components/Layouts/Layouts'));

const Loading = React.lazy(() => import('./Components/Loading/Loading'));
export default function App() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" exact element={<Layouts />}>
            <Route index element={<HomePage />} />
            <Route path="/q1" element={<QuestionsPage_1 />} />
            <Route path="/q2" element={<QuestionsPage2 />} />
            <Route path="/q3" element={<QuestionsPage_3 />} />
            <Route path="/q4" element={<QuestionsPage_4 />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sing" element={<SingIn />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
