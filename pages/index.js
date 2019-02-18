import React from "react";
import Head from "next/head";
import questions from "../questions";

export default () => (
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

    <form disabled={true}>
      {questions.map((q, questionIndex) => (
        <React.Fragment key={questionIndex}>
          <h2>{q.question}</h2>
          {q.options.map((option, optionIndex) => (
            <React.Fragment key={optionIndex}>
              <input
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
      <input type="submit" value="Submit" />
    </form>
  </div>
);
