import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import ballImg from "../assets/ball.png";
import batImg from "../assets/bat.png";
import bedImg from "../assets/bed.png";
import bookImg from "../assets/book.png";
import boyImg from "../assets/boy.png";
import busImg from "../assets/bus.png";
import carImg from "../assets/car.png";
import catImg from "../assets/cat.png";
import cowImg from "../assets/cow.png";
import dogImg from "../assets/dog.png";
import elephantImg from "../assets/elephant.png";
import hatImg from "../assets/hat.png";
import icecreamImg from "../assets/ice-cream.png";
import matImg from "../assets/mat.png";
import moonImg from "../assets/moon.png";
import panImg from "../assets/pan.png";
import penImg from "../assets/pen.png";
import sheepImg from "../assets/sheep.png";
import toysImg from "../assets/toys.png";
import treeImg from "../assets/tree.png";
import ShowAns from "../Components/ShowAns";
import { AiTwotoneHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "../Components/Word.module.css";
import { BiError } from "react-icons/bi";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import hangmanAudio from "../assets/audio/hangman.mp3";

const wordList = [
  {
    id: 1,
    name: "ball",
    words: ["ball", "tall", "maul"],
    image: ballImg,
  },
  {
    id: 2,
    name: "bat",
    words: ["bat", "cat", "hat"],
    image: batImg,
  },
  {
    id: 3,
    name: "bed",
    words: ["bed", "red", "fed"],
    image: bedImg,
  },
  {
    id: 4,
    name: "book",
    words: ["book", "look", "took"],
    image: bookImg,
  },
  {
    id: 5,
    name: "boy",
    words: ["boy", "toy", "joy"],
    image: boyImg,
  },
  {
    id: 6,
    name: "bus",
    words: ["bus", "hus", "mus"],
    image: busImg,
  },
  {
    id: 7,
    name: "car",
    words: ["car", "far", "jar"],
    image: carImg,
  },
  {
    id: 8,
    name: "cat",
    words: ["cat", "hat", "mat"],
    image: catImg,
  },
  {
    id: 9,
    name: "cow",
    words: ["cow", "how", "now"],
    image: cowImg,
  },
  {
    id: 10,
    name: "dog",
    words: ["dog", "log", "fog"],
    image: dogImg,
  },
  {
    id: 11,
    name: "elephant",
    words: ["elephant", "dog", "cow"],
    image: elephantImg,
  },
  {
    id: 12,
    name: "hat",
    words: ["hat", "cat", "mat"],
    image: hatImg,
  },
  {
    id: 13,
    name: "icecream",
    words: ["ice cream", "suger", "cone"],
    image: icecreamImg,
  },
  {
    id: 14,
    name: "mat",
    words: ["mat", "hat", "cat"],
    image: matImg,
  },
  {
    id: 15,
    name: "moon",
    words: ["moon", "soon", "toon"],
    image: moonImg,
  },
  {
    id: 16,
    name: "pan",
    words: ["pan", "fan", "pen"],
    image: panImg,
  },
  {
    id: 17,
    name: "pen",
    words: ["pen", "hen", "den"],
    image: penImg,
  },
  {
    id: 18,
    name: "sheep",
    words: ["sheep", "keep", "heap"],
    image: sheepImg,
  },
  {
    id: 19,
    name: "toys",
    words: ["toys", "boys", "fun"],
    image: toysImg,
  },
  {
    id: 20,
    name: "tree",
    words: ["tree", "free", "three"],
    image: treeImg,
  },
];

const letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const getRandom = (arr) => {
  return Math.floor(Math.random() * arr.length) + 1;
};

const HangmanGame = () => {
  const [heart, setHeart] = useState([
    {
      id: 1,
      icon: <AiTwotoneHeart size={40} color={"red"} />,
    },
    {
      id: 2,
      icon: <AiTwotoneHeart size={40} color={"red"} />,
    },
    {
      id: 3,
      icon: <AiTwotoneHeart size={40} color={"red"} />,
    },
  ]);
  const [word, setWord] = useState({});
  const navigate = useNavigate();
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };
  const [modalText, setModalText] = useState("");

  const existing = [
    ...(JSON.parse(localStorage.getItem("hangmanwords")) || []),
  ];
  const points = JSON.parse(localStorage.getItem("hangmanpoints")) || 0;
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const initialWord = async () => {
    // if they have played 6 times
    if (existing?.length >= 5) {
      // send points to backend
      const response = await axios.post("/api/hangmanGame", {
        user: user?.data?.user?.username,
        points: points + 1,
      });
      if (response.status === 201) {
        // alert("game over");
        navigate("/");

        // remove from local storage
        localStorage.removeItem("hangmanwords");
        localStorage.removeItem("hangmanpoints");
      } else if (response.data.message === "user already exists") {
        // if user already exists then update the points
        const response = await axios.put("/api/hangmanGame", {
          user: user?.data?.user?.username,
          points: points + 1,
        });
        if (response.status === 200) {
          navigate("/");

          // remove from local storage
          localStorage.removeItem("hangmanwords");
          localStorage.removeItem("hangmanpoints");
        }
      } else {
        setOpen(true);
        setModalText("Something went wrong");
        // remove from local storage
        localStorage.removeItem("hangmanwords");
        localStorage.removeItem("hangmanpoints");
      }

      return;
    }
    // get the random word
    const random = getRandom(wordList);

    const result = await wordList[random];

    // if this word came up in the round already
    if (existing.includes(result?.name)) {
      initialWord();
      return;
    }

    // if the word is undefined or null meaning something went wrong with getting the word
    if (result?.name === undefined || result?.name === null) {
      initialWord();
      return;
    }
    // if successfully a new word is found then set the word
    setWord(result);
  };

  const handleBack = async () => {
    setOpen2(true);
  };

  // the word name that is being guessed
  const wordName = word ? word?.name : "";

  // when a letter is chosen
  const handleLetter = (letter) => {
    if (!correctLetters.includes(letter) && wordName.includes(letter)) {
      // if the letter is correct and not already in the array
      setCorrectLetters((currentLetters) => [...currentLetters, letter]);
    } else if (!wrongLetters.includes(letter) && !wordName.includes(letter)) {
      // if the letter is wrong and not already in the array
      // remove heart
      heart.pop();
      setWrongLetters((currentLetters) => [...currentLetters, letter]);
    }
  };
  // after clicking play next
  function playNext(finalMessage) {
    // set points and word in local storage
    localStorage.setItem(
      "hangmanwords",
      JSON.stringify([...existing, word?.name])
    );
    if (finalMessage === "Congratulations! You won.") {
      localStorage.setItem("hangmanpoints", JSON.stringify(points + 1));
    }

    // Empty Arrays
    setCorrectLetters([]);
    setWrongLetters([]);

    // Reset Hearts
    setHeart([
      {
        id: 1,
        icon: <AiTwotoneHeart size={40} color={"red"} />,
      },
      {
        id: 2,
        icon: <AiTwotoneHeart size={40} color={"red"} />,
      },
      {
        id: 3,
        icon: <AiTwotoneHeart size={40} color={"red"} />,
      },
    ]);
    // Get a new word

    initialWord();
  }
  // get a new word when page loads for the first time
  useEffect(() => {
    // Get a new word
    return () => {
      initialWord();
    };
  }, []);
  console.log(word?.name);

  const [open2, setOpen2] = React.useState(false);
  const handleCloseConfirm = () => {
    setOpen2(false);
  };
  const handleOpenConfirm = async () => {
    const response = await axios.post("/api/hangmanGame", {
      user: user?.data?.user?.username,
      points: points,
    });
    if (response.status === 201) {
      navigate("/play");

      // remove from local storage
      localStorage.removeItem("hangmanwords");
      localStorage.removeItem("hangmanpoints");
    } else if (response.data.message === "user already exists") {
      // if user already exists then update the points
      const response = await axios.put("/api/hangmanGame", {
        user: user?.data?.user?.username,
        points: points,
      });
      if (response.status === 200) {
        navigate("/play");

        // remove from local storage
        localStorage.removeItem("hangmanwords");
        localStorage.removeItem("hangmanpoints");
      }
    } else {
      setOpen(true);
      setModalText("Something went wrong");
      // remove from local storage
      localStorage.removeItem("hangmanwords");
      localStorage.removeItem("hangmanpoints");
    }

    return;
  };

  return (
    <Box>
      {/* navbar */}
      <Navbar title={"Hangman-Game"} play={true} handleBack={handleBack} />
      {/* headings */}
      <Typography
        sx={{
          textAlign: "right",
          marginRight: 8,
          marginTop: 2,
        }}
      >
        Points: <span>{points}</span>
      </Typography>
      {/* audio icon */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography
            sx={{
              fontWeight: "medium",
              fontSize: 24,
              textAlign: "center",
              marginTop: -1,
            }}
          >
            Guess the Word
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <IconButton
                onClick={() => {
                  const audio = new Audio(hangmanAudio);
                  audio.play();
                }}
              >
                <VolumeUpIcon
                  sx={{
                    color: "white",
                    backgroundColor: "green",
                    marginTop: -2,
                  }}
                />
              </IconButton>
            </Box>
            <Typography
              sx={{
                fontWeight: "medium",
                fontSize: 20,
                marginBottom: 2,
                textAlign: "center",
              }}
            >
              click on the letters to complete the word and get points
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: 800,
          marginX: "auto",
          marginBottom: 4,
        }}
      >
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            border: "1px solid gray",
            borderRadius: "12px 0 0 12px",
          }}
        >
          {/* hearts */}
          {heart?.map((item, index) => {
            return (
              <Box
                key={index}
                sx={{
                  marginTop: 2,
                }}
              >
                {item?.icon}
              </Box>
            );
          })}
        </Box>
        <Box
          sx={{
            width: "100%",
            textAlign: "center",
            paddingBottom: 4,
            border: "1px solid gray",
            borderLeft: "none",
            borderRadius: "0 12px 12px 0",
          }}
        >
          <Box
            sx={{
              marginTop: 4,
            }}
          >
            {/* show the word with dash(-)  */}
            <div className={style.word}>
              {wordName?.split("")?.map((letter, i) => {
                return (
                  <span className={style.singleWord} key={i}>
                    {correctLetters?.includes(letter) ? letter : ""}
                  </span>
                );
              })}
            </div>

            {/* show the ans in the modal */}
            <ShowAns
              playNext={playNext}
              selectedWord={wordName}
              correctLetters={correctLetters}
              wrongLetters={wrongLetters}
            />
          </Box>
          <Box
            sx={{
              marginTop: 2,
            }}
          >
            {/* all letters in the alphabet */}
            {letters?.map((letter, index) => {
              return (
                <Button
                  onClick={() => {
                    handleLetter(letter);
                  }}
                  key={index}
                  variant="contained"
                  sx={{
                    maxWidth: 24,
                    height: 40,
                    margin: 1,
                    borderRadius: 1,
                    backgroundColor: correctLetters.includes(letter)
                      ? "green"
                      : wrongLetters.includes(letter)
                      ? "red"
                      : "#3498db",
                    color: "white",
                  }}
                >
                  {letter}
                </Button>
              );
            })}
          </Box>
        </Box>
      </Box>
      {/* correct and wrong or game over */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "#fff",
            boxShadow: 24,
            paddingTop: 6,
            borderRadius: "5px",
            textAlign: "center",
          }}
        >
          <BiError
            size={44}
            style={{
              color: "#EE5353",
            }}
          />
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              paddingX: 8,
            }}
          >
            Error
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2, paddingX: 8 }}>
            {modalText ? modalText : ""}
          </Typography>
          <Typography
            sx={{
              backgroundColor: "#EE5353",
              color: "#fff",
              marginTop: "30px",
              padding: "15px 10px",
              border: "none",
              cursor: "pointer",
              outline: "none",
              // "&:hover": {
              //   backgroundColor: "#2980b9",
              //   color: "#fff",
              // },
            }}
            onClick={handleClose}
          >
            Dismiss
          </Typography>
        </Box>
      </Modal>
      {/* exiting the game */}
      <Modal
        open={open2}
        // onClose={handleCloseConfirm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "#fff",
            boxShadow: 24,
            paddingTop: 6,
            borderRadius: "5px",
            textAlign: "center",
            outline: "none",
            border: "none",
          }}
        >
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              paddingX: 8,
            }}
          >
            Are you really want to quit the game?
          </Typography>
          <Box
            id="modal-modal-description"
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "space-between",
              marginX: 13,
              paddingBottom: 4,
            }}
          >
            <Button
              sx={{
                backgroundColor: "#EE5353",
                color: "#fff",
                padding: "10px 50px",
                ":hover": {
                  backgroundColor: "#EE5353",
                },
              }}
              onClick={handleOpenConfirm}
            >
              Yes
            </Button>
            <Button
              sx={{
                backgroundColor: "#3498db",
                color: "#fff",
                padding: "10px 50px",
                ":hover": {
                  backgroundColor: "#3498db",
                },
              }}
              onClick={handleCloseConfirm}
            >
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default HangmanGame;
