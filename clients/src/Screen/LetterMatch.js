import { Box, Button, IconButton, Modal, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import letterBg from "../assets/ballon/ballonPic.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiTwotoneHeart } from "react-icons/ai";
import { BiGame } from "react-icons/bi";
import { IoLogoGameControllerA } from "react-icons/io";
import balloonAudio from "../assets/audio/balloonPop.mp3";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

const mainArray = [
  [
    { letters: ["q", "b", "p", "d"] },
    {
      lettersObject: [
        {
          id: 1,
          letter: "q",
        },
        {
          id: 2,
          letter: "b",
        },
        {
          id: 3,
          letter: "p",
        },
        {
          id: 4,
          letter: "d",
        },
        {
          id: 5,
          letter: "b",
        },
        {
          id: 6,
          letter: "d",
        },
        {
          id: 7,
          letter: "q",
        },
        {
          id: 8,
          letter: "p",
        },
        {
          id: 9,
          letter: "p",
        },
        {
          id: 10,
          letter: "q",
        },
        {
          id: 11,
          letter: "b",
        },
        {
          id: 12,
          letter: "d",
        },
      ],
    },
  ],
  [
    { letters: ["s", "z", "o", "c"] },
    {
      lettersObject: [
        {
          id: 1,
          letter: "s",
        },
        {
          id: 2,
          letter: "z",
        },
        {
          id: 3,
          letter: "o",
        },
        {
          id: 4,
          letter: "c",
        },
        {
          id: 5,
          letter: "z",
        },
        {
          id: 6,
          letter: "c",
        },
        {
          id: 7,
          letter: "s",
        },
        {
          id: 8,
          letter: "o",
        },
        {
          id: 9,
          letter: "o",
        },
        {
          id: 10,
          letter: "s",
        },
        {
          id: 11,
          letter: "z",
        },
        {
          id: 12,
          letter: "c",
        },
      ],
    },
  ],
];
const getRandom = (arr) => {
  return Math.floor(Math.random() * arr?.length) + 1;
};

const getRandom2 = (arr) => {
  return Math.floor(Math.random() * arr?.length);
};

const LetterMatch = () => {
  const points = JSON.parse(localStorage.getItem("letterPoints")) || 0;
  const existingLetters =
    JSON.parse(localStorage.getItem("existingLetters")) || [];
  const [randomLetters, setRandomLetters] = useState([]);
  const [randomL, setRandomL] = useState("");
  const [life, setLife] = useState(3);
  const [successPoints, setSuccessPoints] = useState(0);
  const [mainLetterId, setMainLetterId] = useState(mainArray);
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();
  const [perfectLetter, setPerfectLetter] = useState(0);
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
  const [open, setOpen] = React.useState(false);
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

  const initialLetters = async () => {
    if (existingLetters.length >= 5) {
      const response = await axios.post("/api/letterGame", {
        user: user?.data?.user?.username,
        points: points + 1,
      });
      if (response.status === 201) {
        setModalText("Game Over");
        setOpen(true);

        // remove from local storage
        localStorage.removeItem("letterPoints");
        localStorage.removeItem("existingLetters");
      } else if (response.data.message === "user already exists") {
        // if user already exists then update the points
        const response = await axios.put("/api/letterGame", {
          user: user?.data?.user?.username,
          points: points + 1,
        });
        if (response.status === 200) {
          setModalText("Game Over");
          setOpen(true);

          // remove from local storage
          localStorage.removeItem("letterPoints");
          localStorage.removeItem("existingLetters");
        }
      } else {
        setModalText("Something went wrong..");
        setOpen(true);

        // remove from local storage
        localStorage.removeItem("letterPoints");
        localStorage.removeItem("existingLetters");
      }
    }

    const random = getRandom(mainArray);
    const randomLetterArray = mainArray[random - 1];
    // console.log(mainArray);

    setRandomLetters(randomLetterArray);

    const randomN = getRandom2(randomLetterArray[0]?.letters);

    setRandomL(randomLetterArray[0]?.letters[randomN]);
  };

  useEffect(() => {
    initialLetters();
  }, []);

  // getting a random letter

  const handleClick = (letter) => {
    if (letter?.letter === randomL) {
      setSuccessPoints((prev) => prev + 1);
      // remove the letter from the array
      const remainingLettersObject = randomLetters[1]?.lettersObject.filter(
        (item, i) => {
          return item.id !== letter.id;
        }
      );
      let foundLetterArray = mainLetterId.filter((item) =>
        item[0]?.letters?.includes(letter.letter)
      );
      foundLetterArray[0][1].lettersObject = remainingLettersObject;
      setRandomLetters(foundLetterArray[0]);

      setMainLetterId([
        [
          { letters: ["q", "b", "p", "d"] },
          {
            lettersObject: [
              {
                id: 1,
                letter: "q",
              },
              {
                id: 2,
                letter: "b",
              },
              {
                id: 3,
                letter: "p",
              },
              {
                id: 4,
                letter: "d",
              },
              {
                id: 5,
                letter: "b",
              },
              {
                id: 6,
                letter: "d",
              },
              {
                id: 7,
                letter: "q",
              },
              {
                id: 8,
                letter: "p",
              },
              {
                id: 9,
                letter: "p",
              },
              {
                id: 10,
                letter: "q",
              },
              {
                id: 11,
                letter: "b",
              },
              {
                id: 12,
                letter: "d",
              },
            ],
          },
        ],
        [
          { letters: ["s", "z", "o", "c"] },
          {
            lettersObject: [
              {
                id: 1,
                letter: "s",
              },
              {
                id: 2,
                letter: "z",
              },
              {
                id: 3,
                letter: "o",
              },
              {
                id: 4,
                letter: "c",
              },
              {
                id: 5,
                letter: "z",
              },
              {
                id: 6,
                letter: "c",
              },
              {
                id: 7,
                letter: "s",
              },
              {
                id: 8,
                letter: "o",
              },
              {
                id: 9,
                letter: "o",
              },
              {
                id: 10,
                letter: "s",
              },
              {
                id: 11,
                letter: "z",
              },
              {
                id: 12,
                letter: "c",
              },
            ],
          },
        ],
      ]);

      if (successPoints === 2) {
        setSuccessPoints(0);
        const newPoints = points + 1;
        localStorage.setItem("letterPoints", JSON.stringify(newPoints));
        localStorage.setItem(
          "existingLetters",
          JSON.stringify([...existingLetters, letter.letter])
        );
        if (existingLetters.length === 6) {
          setModalText("Game Over");
          setOpen(true);
          return;
        } else {
          setModalText("You Won");
          setOpen(true);
        }

        initialLetters();

        setLife(3);
        setPerfectLetter(0);
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

        return;
      }
      return;
      // console.log(randomLetters);
    } else if (letter?.letter !== randomL) {
      heart.pop();
      setLife((prev) => prev - 1);
      const remainingLettersObject = randomLetters[1]?.lettersObject.filter(
        (item, i) => {
          return item.id !== letter.id;
        }
      );
      let foundLetterArray = mainLetterId.filter((item) =>
        item[0]?.letters?.includes(letter.letter)
      );
      foundLetterArray[0][1].lettersObject = remainingLettersObject;
      setRandomLetters(foundLetterArray[0]);
      setMainLetterId([
        [
          { letters: ["q", "b", "p", "d"] },
          {
            lettersObject: [
              {
                id: 1,
                letter: "q",
              },
              {
                id: 2,
                letter: "b",
              },
              {
                id: 3,
                letter: "p",
              },
              {
                id: 4,
                letter: "d",
              },
              {
                id: 5,
                letter: "b",
              },
              {
                id: 6,
                letter: "d",
              },
              {
                id: 7,
                letter: "q",
              },
              {
                id: 8,
                letter: "p",
              },
              {
                id: 9,
                letter: "p",
              },
              {
                id: 10,
                letter: "q",
              },
              {
                id: 11,
                letter: "b",
              },
              {
                id: 12,
                letter: "d",
              },
            ],
          },
        ],
        [
          { letters: ["s", "z", "o", "c"] },
          {
            lettersObject: [
              {
                id: 1,
                letter: "s",
              },
              {
                id: 2,
                letter: "z",
              },
              {
                id: 3,
                letter: "o",
              },
              {
                id: 4,
                letter: "c",
              },
              {
                id: 5,
                letter: "z",
              },
              {
                id: 6,
                letter: "c",
              },
              {
                id: 7,
                letter: "s",
              },
              {
                id: 8,
                letter: "o",
              },
              {
                id: 9,
                letter: "o",
              },
              {
                id: 10,
                letter: "s",
              },
              {
                id: 11,
                letter: "z",
              },
              {
                id: 12,
                letter: "c",
              },
            ],
          },
        ],
      ]);
      // checking if the user tried more than 3 times
      if (life <= 1) {
        setSuccessPoints(0);
        localStorage.setItem(
          "existingLetters",
          JSON.stringify([...existingLetters, letter.letter])
        );
        if (existingLetters.length === 6) {
          setModalText("Game Over");
          //setModalText("You won");
          setOpen(true);
        } else {
          setModalText("You Lost");
          setOpen(true);
        }
        initialLetters();
        setLife(3);
        setPerfectLetter(0);
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
        return;
      }
    }
    return;
  };
  const handleBack = async () => {
    setOpen2(true);
  };

  if (perfectLetter === 2) {
    window.location.reload();
  }

  useEffect(() => {
    const extraCheck = () => {
      randomLetters?.map((item, i) => {
        item?.lettersObject?.map((letter, i) => {
          if (letter.letter === randomL) {
            setPerfectLetter((prev) => prev + 1);
          }
        });
      });
    };
    extraCheck();
  }, [randomLetters, randomL]);
  const [open2, setOpen2] = React.useState(false);
  const handleCloseConfirm = () => {
    setOpen2(false);
  };
  const handleOpenConfirm = async () => {
    const response = await axios.post("/api/letterGame", {
      user: user?.data?.user?.username,
      points: points,
    });
    if (response.status === 201) {
      navigate("/play");

      // remove from local storage
      localStorage.removeItem("letterPoints");
      localStorage.removeItem("existingLetters");
    } else if (response.data.message === "user already exists") {
      // if user already exists then update the points
      const response = await axios.put("/api/letterGame", {
        user: user?.data?.user?.username,
        points: points,
      });
      if (response.status === 200) {
        navigate("/play");

        // remove from local storage
        localStorage.removeItem("letterPoints");
        localStorage.removeItem("existingLetters");
      }
    } else {
      setModalText("Something went wrong!");
      setOpen(true);

      // remove from local storage
      localStorage.removeItem("letterPoints");
      localStorage.removeItem("existingLetters");
    }

    return;
  };

  return (
    <Box>
      {/* navbar */}
      <Navbar title={"Balloon-Game"} play={true} handleBack={handleBack} />
      <Container
        sx={{
          marginTop: 2,
        }}
      >
        <Typography
          sx={{
            textAlign: "right",
            marginRight: 8,
            marginTop: 2,
          }}
        >
          Points: <span>{points}</span>
        </Typography>

        <Typography
          sx={{
            fontWeight: "medium",
            fontSize: 24,
            textAlign: "center",
            marginTop: -1,
          }}
        >
          Match the Letters
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Box>
            <IconButton
              onClick={() => {
                const audio = new Audio(balloonAudio);
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
            click on the balloons with the target letter to complete the game and get points
          </Typography>
        </Box>
        <Typography
          sx={{
            textAlign: "right",
            marginRight: 8,
            marginTop: 2,
            fontSize: 24,
          }}
        >
          Target Letter: <span>{randomL}</span>
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          {randomLetters?.map((item, i) => {
            return item?.lettersObject?.map((letter, i) => {
              return (
                <Box
                  onClick={() => handleClick(letter)}
                  key={i}
                  sx={{
                    padding: 4,
                    cursor: "pointer",
                    backgroundImage: `url(${letterBg})`,
                    backgroundSize: "cover",
                    borderRadius: 2,
                    color: "#243763",
                    fontWeight: "bold",
                    fontSize: 24,
                    marginTop: `${
                      i === 0
                        ? 32
                        : i === 1
                        ? 0
                        : i === 2
                        ? 40
                        : i === 3
                        ? 80
                        : i === 4
                        ? 5
                        : i === 5
                        ? -30
                        : i === 6
                        ? 60
                        : i === 7
                        ? 0
                        : i === 8
                        ? 30
                        : i === 9
                        ? 50
                        : i === 10
                        ? 20
                        : i === 11
                        ? 0
                        : 12
                    }px`,
                  }}
                >
                  {letter?.letter}
                </Box>
              );
            });
          })}
        </Box>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "12px 0 0 12px",
            marginTop: 20,
          }}
        >
          {/* life heart */}
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
      </Container>
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
              modalText === "You Won"
                ? "green"
                : modalText === "You Lost"
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
          {modalText &&
            (modalText === "Game Over" ||
              modalText === "Something went wrong..") && (
              <BiGame
                size={44}
                style={{
                  color: "blue",
                }}
              />
            )}
          {modalText &&
            (modalText === "You Won" || modalText === "You Lost") && (
              <IoLogoGameControllerA
                size={44}
                style={{
                  color: "white",
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
            {modalText === "You Won"
              ? "Congratulations"
              : modalText === "You Lost"
              ? "Oops you lost"
              : "You have completed this game"}
          </Typography>
          {/* <Typography id="modal-modal-description" sx={{ mt: 2, paddingX: 8 }}>
            {modalText ? modalText : ""}
          </Typography> */}
          {modalText &&
            (modalText === "You Won" || modalText === "You Lost") && (
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
          {modalText &&
            (modalText === "Game Over" ||
              modalText === "Something went wrong..") && (
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
          {modalText && modalText === "Something went wrong!" && (
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
      {/* exiting the gamne */}
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

export default LetterMatch;
