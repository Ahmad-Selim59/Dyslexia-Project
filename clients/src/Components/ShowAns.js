import React from "react";
import { checkWinOrLose } from "../Utilities/win-or-lose";
import { IoLogoGameControllerA } from "react-icons/io";
import { Typography } from "@mui/material";

const ShowAns = ({ playNext, selectedWord, correctLetters, wrongLetters }) => {
  const existing = [
    ...(JSON.parse(localStorage.getItem("hangmanwords")) || []),
  ];
  let ansMessage = "";
  let ans = "";

  if (checkWinOrLose(correctLetters, wrongLetters, selectedWord) === "win") {
    ansMessage = "Congratulations! You won.";
  } else if (
    checkWinOrLose(correctLetters, wrongLetters, selectedWord) === "lose"
  ) {
    ansMessage = "Sorry! You lost.";
    ans = `The answer was: ${selectedWord}`;
  }

  if (
    existing.length >= 5 &&
    checkWinOrLose(correctLetters, wrongLetters, selectedWord) === "win"
  ) {
    ansMessage = "Congratulations! You won the game.";
  }
  if (
    existing.length >= 5 &&
    checkWinOrLose(correctLetters, wrongLetters, selectedWord) === "lose"
  ) {
    ansMessage = "Sorry! You lost the game.";
  }

  return (
    <div
      className="popup-container"
      style={ansMessage !== "" ? { display: "flex" } : {}}
    >
      <div
        className="popup"
        style={{
          padding: "0px",
          backgroundColor:
            checkWinOrLose(correctLetters, wrongLetters, selectedWord) === "win"
              ? "green"
              : "tomato",
        }}
      >
        <IoLogoGameControllerA
          size={74}
          style={{
            color: "white",
            paddingTop: "30px",
          }}
        />
        <h2
          style={{
            marginTop: "0px",
          }}
        >
          {ansMessage}
        </h2>
        {/* {ansMessage ===
        "Congratulations! You won the game. You have completed all the words." ? (
          <h3>Game Over</h3>
        ) : ansMessage ===
          "Sorry! You lost. You have completed all the words." ? (
          <h3>Game Over</h3>
        ) : null} */}
        <h3>{ans ? ans : ""}</h3>{" "}
        <Typography
          sx={{
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          {ansMessage === "Congratulations! You won the game."
            ? "You have completed all the words."
            : ansMessage === "Sorry! You lost the game."
            ? "You have completed all the words."
            : null}
        </Typography>
        <button
          onClick={() => playNext(ansMessage)}
          style={{
            width: "100%",
            borderRadius: "0px",
            padding: "20px 0",
            backgroundColor: "#3498db",
            color: "#fff",
          }}
        >
          {" "}
          {ansMessage === "Congratulations! You won the game."
            ? "Game Over"
            : ansMessage === "Sorry! You lost the game."
            ? "Game Over"
            : "Play Next"}{" "}
        </button>
      </div>
    </div>
  );
};

export default ShowAns;
