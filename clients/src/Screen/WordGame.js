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
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BiGame } from "react-icons/bi";
import { IoLogoGameControllerA } from "react-icons/io";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import wordAudio from "../assets/audio/matchImage.mp3";

const boxWrapper = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: 3,
  marginBottom: 13,
};

const wordList = [
  {
    id: 1,
    name: "ball",
    words: ["maul", "tall", "ball"],
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
    words: ["red", "bed", "fed"],
    image: bedImg,
  },
  {
    id: 4,
    name: "book",
    words: ["took", "look", "book"],
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
    words: ["hus", "mus", "bus"],
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
    words: ["hat", "cat", "mat"],
    image: catImg,
  },
  {
    id: 9,
    name: "cow",
    words: ["how", "how", "cow"],
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
    words: ["mat", "cat", "hat"],
    image: hatImg,
  },
  {
    id: 13,
    name: "ice cream",
    words: ["ice cream", "suger", "cone"],
    image: icecreamImg,
  },
  {
    id: 14,
    name: "mat",
    words: ["hat", "cat", "mat"],
    image: matImg,
  },
  {
    id: 15,
    name: "moon",
    words: ["soon", "moon", "toon"],
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
    words: ["den", "hen", "pen"],
    image: penImg,
  },
  {
    id: 18,
    name: "sheep",
    words: ["keep", "sheep", "heap"],
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
    words: ["three", "free", "tree"],
    image: treeImg,
  },
];
// get a random number
const getRandom = (arr) => {
  return Math.floor(Math.random() * arr.length) + 1;
};

const WordGame = () => {
  const navigate = useNavigate();
  const [word, setWord] = useState({});
  const existing = [...(JSON.parse(localStorage.getItem("words")) || [])];
  const points = JSON.parse(localStorage.getItem("points")) || 0;
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleCloseConfirm = () => {
    setOpen2(false);
  };
  const handleOpenConfirm = async () => {
    const response = await axios.post("/api/wordGame", {
      user: user?.data?.user?.username,
      points: points,
    });
    // if success then redirect to play page
    if (response.status === 201) {
      navigate("/play");
      // remove the words and points from local storage
      localStorage.removeItem("words");
      localStorage.removeItem("points");
    } else if (response.data.message === "user already exists") {
      const response = await axios.put("/api/wordGame", {
        user: user?.data?.user?.username,
        points: points,
      });
      // if success then redirect to play page
      if (response.status === 200) {
        navigate("/play");
        // remove the words and points from local storage
        localStorage.removeItem("words");
        localStorage.removeItem("points");
      }
    } else {
      setModalText("Something went wrong");
      setOpen(true);
      // remove the words and points from local storage
      localStorage.removeItem("words");
      localStorage.removeItem("points");
    }

    return;
  };
  const handleClose = () => {
    setOpen(false);
    navigate("/");
  };
  const handleClose2 = () => {
    setOpen(false);
    navigate("/play");
  };

  const handleClose3 = () => {
    setOpen(false);
  };
  const [modalText, setModalText] = useState("");

  // get the current user from local storage
  const user = JSON.parse(localStorage.getItem("currentUser"));

  const initialWord = async () => {
    if (existing?.length >= 6) {
      // send points to backend
      const response = await axios.post("/api/wordGame", {
        user: user?.data?.user?.username,
        points: points,
      });
      if (response.status === 201) {
        navigate("/");
        // remove the words and points from local storage
        localStorage.removeItem("words");
        localStorage.removeItem("points");
      } else if (response.data.message === "user already exists") {
        const response = await axios.put("/api/wordGame", {
          user: user?.data?.user?.username,
          points: points,
        });
        if (response.status === 200) {
          navigate("/");
          // remove the words and points from local storage
          localStorage.removeItem("words");
          localStorage.removeItem("points");
        }
      } else {
        setModalText("Something went wrong");
        setOpen(true);
        // remove the words and points from local storage
        localStorage.removeItem("words");
        localStorage.removeItem("points");
      }

      return;
    }
    const random = getRandom(wordList);

    const result = await wordList[random];

    if (existing.includes(result?.id)) {
      initialWord();
      return;
    }

    // if the word is undefined or null meaning something went wrong with getting the word
    if (result?.name === undefined || result?.name === null) {
      initialWord();
      return;
    }

    setWord(result);
  };

  const handleBack = async () => {
    setOpen2(true);
  };

  // when a word is clicked
  const handleWord = (word, tobeMatched, id) => {
    // if the correct word is chosen
    if (word === tobeMatched) {
      setModalText("Correct");
      setOpen(true);
      localStorage.setItem("points", points + 1);
    } else {
      setModalText("Wrong");
      setOpen(true);
    }
    // push the id to the existing array
    existing.push(id);
    // set to local storage
    localStorage.setItem("words", JSON.stringify(existing));
    if (existing.length >= 6) {
      setModalText("You have completed the game");
      setOpen(true);
      return;
    }

    initialWord();
  };

  // get initial word when component loads
  useEffect(() => {
    return () => {
      initialWord();
    };
  }, []);

  return (
    <Box>
      <Navbar title={"Word Game"} play={true} handleBack={handleBack} />
      <Typography
        sx={{
          textAlign: "right",
          marginRight: 8,
          marginTop: 2,
        }}
      >
        {/* points */}
        Points: <span>{points}</span>
      </Typography>
      {/* headings */}

      <Box
        sx={{
          display: "flex",
          gap: 2,
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
            Match word with the picture
          </Typography>
          {/* audio icon */}
          <Box
            sx={{
              display: "flex",
            }}
          >
            <Box>
              <IconButton
                onClick={() => {
                  const audio = new Audio(wordAudio);
                  audio.play();
                }}
              >
                <VolumeUpIcon
                  sx={{
                    color: "white",
                    backgroundColor: "green",
                    marginTop: -1,
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
              click on the word that relates to the picture
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box style={boxWrapper}>
        <Box
          sx={{
            borderRadius: "4px",
            textAlign: "center",
            border: "1px solid #000000",
            width: "min-content",
            paddingX: 4,
            paddingY: 2,
          }}
        >
          {/* images for the word */}
          <img src={word?.image} alt="word Image" width={350} />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginX: 3,
            }}
          >
            {/* words list */}
            {word?.words?.map((item, index) => (
              <Typography
                key={index}
                onClick={() => handleWord(item, word?.name, word?.id)}
                sx={{
                  cursor: "pointer",
                  color: "#000000",
                  fontWeight: "medium",
                  fontSize: 18,
                  paddingX: 2,
                }}
              >
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
      {/* correct or wrong or game over */}
      <Modal
        open={open}
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
            bgcolor:
              modalText === "Correct"
                ? "green"
                : modalText === "Wrong"
                ? "tomato"
                : "#fff",
            boxShadow: 24,
            paddingTop: 6,
            borderRadius: "5px",
            textAlign: "center",
            outline: "none",
            border: "none",
          }}
        >
          {modalText && modalText === "You have completed the game" && (
            <BiGame
              size={44}
              style={{
                color: "blue",
              }}
            />
          )}
          {modalText && (modalText === "Correct" || modalText === "Wrong") && (
            <IoLogoGameControllerA
              size={44}
              style={{
                color: "#fff",
              }}
            />
          )}
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              paddingX: 8,
            }}
          >
            {modalText === "Correct"
              ? "Congratulations"
              : modalText === "Wrong"
              ? "Oops"
              : "You have completed the game"}
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, paddingX: 8, fontSize: 18, fontWeight: "bold" }}
          >
            {modalText !== "You have completed the game" ? modalText : null}
          </Typography>
          {modalText && (modalText === "Correct" || modalText === "Wrong") && (
            <Typography
              sx={{
                backgroundColor: "#3498db",
                color: "#fff",
                marginTop: "30px",
                padding: "15px 10px",
                border: "none",
                cursor: "pointer",
                outline: "none",
              }}
              onClick={handleClose3}
            >
              Play Next
            </Typography>
          )}
          {modalText && modalText === "You have completed the game" && (
            <Typography
              sx={{
                backgroundColor: "blue",
                color: "#fff",
                marginTop: "30px",
                padding: "15px 10px",
                border: "none",
                cursor: "pointer",
                outline: "none",
              }}
              onClick={handleClose}
            >
              Dismiss
            </Typography>
          )}
          {modalText && modalText === "Something went wrong" && (
            <Typography
              sx={{
                backgroundColor: "#EE5353",
                color: "#fff",
                marginTop: "30px",
                padding: "15px 10px",
                border: "none",
                cursor: "pointer",
                outline: "none",
              }}
              onClick={handleClose2}
            >
              Dismiss
            </Typography>
          )}
        </Box>
      </Modal>
      {/* exiting game */}
      <Modal
        open={open2}
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

export default WordGame;
