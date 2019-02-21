import React, { useState } from "react";
import Head from "next/head";
import questions from "../questions";
import axios from "axios";
import moment from "moment";

const handleSubmit = setSubmissionState => event => {
  event.preventDefault();
  setSubmissionState({ inProgress: true, error: false });
  const data = new FormData(event.target);
  const daysSinceEpoch = moment().diff(moment().unix(0), "days");
  axios
    .post("/api/submission", {
      forDaySinceEpoch: daysSinceEpoch,
      email: "hardcoded",
      answers: Array.from(data.entries()).map(([question, answer]) => ({
        question,
        answer
      }))
    })
    .then(result => {
      console.log(result);
      setSubmissionState({ inProgress: false, error: false, success: true });
    })
    .catch(error => {
      console.error(error);
      setSubmissionState({ inProgress: false, error });
    });
};

export default () => {
  const [submissionState, setSubmissionState] = useState({
    inProgress: false,
    error: false,
    success: false
  });
  const submissionTimeWarning =
    moment().hour() < 17 && "You can only submit between 5pm and midnight!";

  return (
    <div className="root">
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Daily Diary</title>
      </Head>
      <style jsx>{`
        .root {
          font-family: sans-serif;
          line-height: 1.33rem;
          margin-top: 8vh;
        }
        @media (min-width: 600px) {
          .root {
            margin-left: 21vw;
            margin-right: 21vw;
          }
        }
      `}</style>

      <h1>Daily Diary</h1>
      {submissionTimeWarning && (
        <h2 style={{ color: "red" }}>{submissionTimeWarning}</h2>
      )}
      {submissionState.error && (
        <h2 style={{ color: "red" }}>There was an error submitting the data</h2>
      )}
      <form onSubmit={handleSubmit(setSubmissionState)}>
        {questions.map((q, questionIndex) => (
          <React.Fragment key={questionIndex}>
            <h2>{q.question}</h2>
            {q.options.map((option, optionIndex) => (
              <React.Fragment key={optionIndex}>
                <input
                  id={`${questionIndex}`}
                  type="radio"
                  name={`${questionIndex}`}
                  value={`${optionIndex}`}
                />
                <span>{option}</span>
                <br />
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
        {submissionState.success && <p>Submission completed!</p>}
        {submissionState.inProgress && <p>Submission in progress</p>}
        {submissionState.error && (
          <p style={{ color: "red" }}>There was an error submitting the data</p>
        )}
        <input
          type="submit"
          value="Submit"
          disabled={
            !!submissionState.inProgress ||
            !!submissionTimeWarning ||
            submissionState.success
          }
        />
      </form>
    </div>
  );
};
