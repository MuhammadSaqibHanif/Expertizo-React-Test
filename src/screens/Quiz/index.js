import React, { useState, useEffect } from "react";
import Questions from "../../data/questions.json";

import star from "../../icons/star.png";
import starFill from "../../icons/starFill.png";

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowDimensions;
}

function Quiz() {
  const [showQuestion, setShowQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const {
    category,
    // type,
    difficulty,
    question,
    correct_answer,
    incorrect_answers
  } = Questions[showQuestion];

  let totalStars = [1, 2, 3, 4, 5];

  let fillStar = 0;

  if (difficulty === "easy") {
    fillStar = 1;
  } else if (difficulty === "medium") {
    fillStar = 2;
  } else {
    fillStar = 3;
  }

  const shuffle = array => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  function checkAnswer(answer) {
    if (answer === correct_answer) {
      alert("Correct");

      setScore(score + 1);

      setShowQuestion(showQuestion + 1);
    } else {
      alert("Wrong");

      setShowQuestion(showQuestion + 1);
    }
  }

  return (
    <div>
      <div
        style={{
          backgroundColor: "black",
          width:
            (useWindowDimensions().width / Questions.length) *
            (showQuestion + 1),
          height: 30
        }}
      />

      <div style={{ marginLeft: 20 }}>
        <div style={{ fontSize: 20, marginTop: 20 }}>
          Question {showQuestion + 1} out of {Questions.length}
        </div>

        <div style={{ fontSize: 14, marginTop: 5, marginBottom: 5 }}>
          {category}
        </div>

        <div>
          {totalStars.map((val, ind) => {
            return (
              <img
                key={ind}
                src={ind < fillStar ? starFill : star}
                alt="star"
                style={{ width: 15, height: 15 }}
              />
            );
          })}
        </div>

        <div style={{ marginTop: 20, marginBottom: 10 }}>{question}</div>

        <div>
          {shuffle([...incorrect_answers, correct_answer]).map(
            (item, index) => (
              <div
                key={index}
                style={{
                  marginBottom: 10
                }}
              >
                <button onClick={() => checkAnswer(item)}>{item}</button>
              </div>
            )
          )}
        </div>

        <div style={{ marginTop: 20 }}>
          Score: {(score / Questions.length) * 100} %
        </div>
        {/* <div style={{ marginTop: 20 }}>Max Score: {score}</div> */}
      </div>
    </div>
  );
}

export default Quiz;
