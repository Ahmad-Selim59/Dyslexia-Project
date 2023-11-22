import React, { Fragment, useEffect, useState } from "react";
import Chart from "../Components/Chart";
import styles from "./Charts.module.css";
import Navbar from "../Components/Navbar";
import axios from "axios";
import { Box } from "@mui/system";
import { Container, Typography } from "@mui/material";
import ironImg from "../assets/badges/iron.png";
import bronzeImg from "../assets/badges/bronze.PNG";
import silverImg from "../assets/badges/silver.PNG";
import goldImg from "../assets/badges/gold.PNG";
import platinumImg from "../assets/badges/platinum.PNG";
import diamondImg from "../assets/badges/diamond.PNG";
import masterImg from "../assets/badges/masters.PNG";

function Charts() {
  const [userDataWordGame, setUserDataWordGame] = useState([]);
  const [userDataHangmanGame, setUserDataHangmanGame] = useState([]);
  const [userDataLetterGame, setUserDataLetterGame] = useState([]);
  const [myWordGameData, setMyWordGameData] = useState([]);
  const [myHangmanGameData, setMyHangmanGameData] = useState([]);
  const [myLetterGameData, setMyLetterGameData] = useState([]);
  const [averagePoints, setaveragePoints] = useState();
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    // fetch user data for word game
    const fetchUserWord = async () => {
      const response = await axios.get("/api/wordGame");
      setUserDataWordGame(response.data);
    };
    // fetch user data for hangman game
    const fetchUserHangman = async () => {
      const response = await axios.get("/api/hangmanGame");
      setUserDataHangmanGame(response.data);
    };
    const fetchUserLetter = async () => {
      const response = await axios.get("/api/letterGame");
      setUserDataLetterGame(response.data);
    };
    fetchUserWord();
    fetchUserHangman();
    fetchUserLetter();
  }, []);

  const removeUnnecessaryData = (data) => {
    const newData = data?.map((item) => {
      return {
        name: item?.user,
        score: item?.points,
      };
    });
    return newData;
  };

  useEffect(() => {
    setLoading(true);
    const filterMyDataFromWordGame = async () => {
      if (user) {
        const data = await userDataWordGame.filter(
          (item) => item?.user === user?.data?.user?.username
        );
        setMyWordGameData(data[0]?.points);
      }
    };

    const filterMyDataFromHangmanGame = async () => {
      if (user) {
        const data = await userDataHangmanGame.filter(
          (item) => item?.user === user?.data?.user?.username
        );
        setMyHangmanGameData(data[0]?.points);
      }
    };
    const filterMyDataFromLetterGame = async () => {
      if (user) {
        const data = await userDataLetterGame.filter(
          (item) => item?.user === user?.data?.user?.username
        );
        setMyLetterGameData(data[0]?.points);
      }
    };

    filterMyDataFromWordGame();

    filterMyDataFromHangmanGame();

    filterMyDataFromLetterGame();
    setLoading(false);
  }, [userDataWordGame, userDataHangmanGame, userDataLetterGame]);

  const getTheaveragePoints = (num1, num2, num3) => {
    let average = 0;
    
    // if user has not played the games before
    if (num1 === undefined) {
      average = parseInt((num2 + num3) / 2);
    }
    if (num2 === undefined) {
      average = parseInt((num1 + num3) / 2);
    }

    if (num3 === undefined) {
      average = parseInt((num1 + num2) / 2);
    }
    if (num1 === undefined && num2 === undefined) {
      average = num3;
    }
    if (num1 === undefined && num3 === undefined) {
      average = num2;
    }
    if (num2 === undefined && num3 === undefined) {
      average = num1;
    }

    if (num1 !== undefined && num2 !== undefined && num3 !== undefined) {
      average = parseInt((num1 + num2 + num3) / 3);
    }
    setaveragePoints(average);
  };
  useEffect(() => {
    getTheaveragePoints(myWordGameData, myHangmanGameData, myLetterGameData);
  }, [myWordGameData, myHangmanGameData, myLetterGameData]);

  // data for word game
  const game1 = removeUnnecessaryData(userDataWordGame);
  // data for hangman game
  const game2 = removeUnnecessaryData(userDataHangmanGame);
  const game3 = removeUnnecessaryData(userDataLetterGame);
  return (
    <Fragment>
      <Navbar title={"Stats"} />
      {user && (
        <Box>
          <Box>
            <Container>
              <Typography
                sx={{
                  textAlign: "center",
                  fontSize: "1.5rem",
                  fontWeight: "medium",
                }}
              >
                These are your badges
              </Typography>
            </Container>
            {!loading && (
              <div
                className={styles.charts}
                style={{
                  marginTop: "2.5rem",
                  marginBottom: "2.5rem",
                  justifyContent: "space-around",
                }}
              >
                {myWordGameData !== undefined ? (
                  <Box
                    sx={{
                      textAlign: "center",
                      width: "30%",
                    }}
                  >
                    {!loading && myWordGameData > -1 && (
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: "medium",
                            fontSize: 24,
                            textAlign: "center",
                            marginTop: -1,
                          }}
                        >
                          Match the Image
                        </Typography>
                        <img
                          src={`${
                            myWordGameData === 0
                              ? ironImg
                              : myWordGameData === 1
                              ? bronzeImg
                              : myWordGameData === 2
                              ? silverImg
                              : myWordGameData === 3
                              ? goldImg
                              : myWordGameData === 4
                              ? platinumImg
                              : myWordGameData === 5
                              ? diamondImg
                              : myWordGameData >= 6 && masterImg
                          }`}
                          alt="badges pictueres"
                        />
                      </Box>
                    )}
                    {!loading && myWordGameData > -1 && (
                      <Box>
                        <Typography>
                          {myWordGameData === 0
                            ? "Iron"
                            : myWordGameData === 1
                            ? "Bronze"
                            : myWordGameData === 2
                            ? "Silver"
                            : myWordGameData === 3
                            ? "Gold"
                            : myWordGameData === 4
                            ? "Platinum"
                            : myWordGameData === 5
                            ? "Diamond"
                            : myWordGameData >= 6 && "Master"}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                ) : (
                  <Box
                    sx={{
                      width: "30%",
                    }}
                  >
                    <Typography
                      sx={{
                        marginTop: 3,
                        textAlign: "center",
                      }}
                    >
                      You have not played the word game yet
                    </Typography>
                  </Box>
                )}
                {myHangmanGameData !== undefined ? (
                  <Box
                    sx={{
                      textAlign: "center",
                      width: "30%",
                    }}
                  >
                    {!loading && myHangmanGameData > -1 && (
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: "medium",
                            fontSize: 24,
                            textAlign: "center",
                            marginTop: -1,
                          }}
                        >
                          Hangman
                        </Typography>
                        <img
                          src={`${
                            myHangmanGameData === 0
                              ? ironImg
                              : myHangmanGameData === 1
                              ? bronzeImg
                              : myHangmanGameData === 2
                              ? silverImg
                              : myHangmanGameData === 3
                              ? goldImg
                              : myHangmanGameData === 4
                              ? platinumImg
                              : myHangmanGameData === 5
                              ? diamondImg
                              : myHangmanGameData >= 6 && masterImg
                          }`}
                          alt="badges pictueres"
                        />
                      </Box>
                    )}
                    {!loading && myHangmanGameData > -1 && (
                      <Box>
                        <Typography>
                          {myHangmanGameData === 0
                            ? "Iron"
                            : myHangmanGameData === 1
                            ? "Bronze"
                            : myHangmanGameData === 2
                            ? "Silver"
                            : myHangmanGameData === 3
                            ? "Gold"
                            : myHangmanGameData === 4
                            ? "Platinum"
                            : myHangmanGameData === 5
                            ? "Diamond"
                            : myHangmanGameData >= 6 && "Master"}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                ) : (
                  <Box
                    sx={{
                      width: "30%",
                    }}
                  >
                    <Typography
                      sx={{
                        marginTop: 3,
                        textAlign: "center",
                      }}
                    >
                      You have not played the hangman game yet
                    </Typography>
                  </Box>
                )}
                {myLetterGameData !== undefined ? (
                  <Box
                    sx={{
                      textAlign: "center",
                      width: "30%",
                    }}
                  >
                    {!loading && myLetterGameData > -1 && (
                      <Box>
                        <Typography
                          sx={{
                            fontWeight: "medium",
                            fontSize: 24,
                            textAlign: "center",
                            marginTop: -1,
                          }}
                        >
                          Pop the Balloons
                        </Typography>
                        <img
                          src={`${
                            myLetterGameData === 0
                              ? ironImg
                              : myLetterGameData === 1
                              ? bronzeImg
                              : myLetterGameData === 2
                              ? silverImg
                              : myLetterGameData === 3
                              ? goldImg
                              : myLetterGameData === 4
                              ? platinumImg
                              : myLetterGameData === 5
                              ? diamondImg
                              : myLetterGameData >= 6 && masterImg
                          }`}
                          alt="badges pictueres"
                        />
                      </Box>
                    )}
                    {!loading && myLetterGameData > -1 && (
                      <Box>
                        <Typography>
                          {myLetterGameData === 0
                            ? "Iron"
                            : myLetterGameData === 1
                            ? "Bronze"
                            : myLetterGameData === 2
                            ? "Silver"
                            : myLetterGameData === 3
                            ? "Gold"
                            : myLetterGameData === 4
                            ? "Platinum"
                            : myLetterGameData === 5
                            ? "Diamond"
                            : myLetterGameData >= 6 && "Master"}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                ) : (
                  <Box
                    sx={{
                      width: "30%",
                    }}
                  >
                    <Typography
                      sx={{
                        marginTop: 3,
                        textAlign: "center",
                      }}
                    >
                      You have not played the letter game yet
                    </Typography>
                  </Box>
                )}
              </div>
            )}
          </Box>

          <Container>
            <Typography
              sx={{
                textAlign: "center",
                fontSize: "1.5rem",
                fontWeight: "medium",
              }}
            >
              Your Combined badge
            </Typography>
          </Container>
          {!loading && (
            <div
              className={styles.charts}
              style={{
                marginTop: "2.5rem",
                justifyContent: "space-around",
              }}
            >
              {((myWordGameData !== undefined && myWordGameData > -1) ||
                (myHangmanGameData !== undefined && myHangmanGameData > -1) ||
                (myLetterGameData !== undefined && myLetterGameData > -1)) && (
                <Box
                  sx={{
                    textAlign: "center",
                  }}
                >
                  {
                    <img
                      src={`${
                        averagePoints === 0
                          ? ironImg
                          : averagePoints === 1
                          ? bronzeImg
                          : averagePoints === 2
                          ? silverImg
                          : averagePoints === 3
                          ? goldImg
                          : averagePoints === 4
                          ? platinumImg
                          : averagePoints === 5
                          ? diamondImg
                          : averagePoints >= 6 && masterImg
                      }`}
                      alt="badges pictueres"
                    />
                  }
                  {
                    <Typography>
                      {averagePoints === 0
                        ? "Iron"
                        : averagePoints === 1
                        ? "Bronze"
                        : averagePoints === 2
                        ? "Silver"
                        : averagePoints === 3
                        ? "Gold"
                        : averagePoints === 4
                        ? "Platinum"
                        : averagePoints === 5
                        ? "Diamond"
                        : averagePoints >= 6 && "Master"}
                    </Typography>
                  }
                </Box>
              )}
              {myWordGameData === undefined &&
                myHangmanGameData === undefined &&
                myLetterGameData === undefined && (
                  <Box>
                    <Typography>
                      You have not played any games yet. Play some games to get
                      your badge.
                    </Typography>
                  </Box>
                )}
            </div>
          )}
        </Box>
      )}
      <Container>
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "1.5rem",
          }}
        >
          Charts
        </Typography>
      </Container>
      <div className={styles.charts}>
        <Chart data={game1} label={"Match the Image"} />
        <Chart data={game2} label={"Hangman"} />
        <Chart data={game3} label={"Balloon Pop"} />
      </div>
    </Fragment>
  );
}

export default Charts;
