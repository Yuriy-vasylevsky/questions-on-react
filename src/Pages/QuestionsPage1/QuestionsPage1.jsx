// import s from './QuestionsPage1.module.scss';

import Container from '../../Components/Container/Container';
import Footer from '../../Components/Footer/Footer';
import Loading from '../../Components/Loading/Loading';
import QuestionBox from '../../Components/QuestionBox/QuestionBox';
import QuestionBoxHistory from '../../Components/Chat.js/Chat';
import Section from '../../Components/Section/Section ';
import { questions1 } from '../../data/questions1';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function QuestionsPage_1() {
  const [usedNumbers, setUsedNumbers] = useState([]);
  const [questions, setQuestions] = useState('');
  const [loading, setLoading] = useState(false);
  const [counter, setCounter] = useState(0);
  const [historyQuestion, setHistoryQuestion] = useState([]);

  const rundomaizer = max => {
    let rundomNumber;

    while (usedNumbers.length <= max) {
      rundomNumber = Math.floor(Math.random() * max);

      if (usedNumbers.indexOf(rundomNumber) === -1) {
        setUsedNumbers(prev => [...prev, rundomNumber]);
        return rundomNumber;
      } else if (usedNumbers.length === max) {
        return toast('Вы выжали максимум с этой категории вопросов');
      }
    }
  };

  const onClik = () => {
    if (loading) {
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setQuestions(questions1[rundomaizer(questions1.length)]);
      setLoading(false);
      setHistoryQuestion(prev => [...prev, questions]);
    }, 1000);
    setQuestions('');
    setCounter(prev => prev + 1);
  };

  const cleanOll = () => {
    setQuestions('');
    setHistoryQuestion('');
    setCounter(0);
    setUsedNumbers([]);
  };

  return (
    <>
      <main className="main">
        <Container>
          {loading && <Loading />}
          <Section className={'section-hero'}>
            <QuestionBox questions={questions} title={'Обычние вопросы'} />
            <QuestionBoxHistory historyQuestion={historyQuestion} />
          </Section>
        </Container>
      </main>
      <Footer counter={counter} onClik={onClik} cleanOll={cleanOll} />
      <ToastContainer />
    </>
  );
}
