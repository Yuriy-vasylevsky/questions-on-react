import './QuestionBoxHistory.scss';

import React from 'react';

export default function QuestionBoxHistory({ historyQuestion }) {
  return (
    <>
      <h2 className="box-section-hero__title">История вопросов</h2>

      <div className="box-section-hero__texti-history">
        <ul>
          {historyQuestion &&
            historyQuestion.map(qest => {
              return (
                <li key={qest} className="box-section-hero__texti-history">
                  {qest}
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}
