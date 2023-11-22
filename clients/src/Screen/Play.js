import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { Fragment } from "react";
import Navbar from "../Components/Navbar";
import wordGameImg from "../assets/word-game.png";
import HangmanGame from "../assets/hangman/hangman.png";
import LetterMatch from "../assets/ballon/letter-match.png";
import { Link } from "react-router-dom";

// now use this style in box

const Play = () => {
  return (
    <Fragment>
      <Navbar title={"Play"} />
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={4}
          maxWidth={1200}
          sx={{
            margin: "0 auto",
            marginTop: 6,
          }}
        >
          <Grid xs={12} md={4}>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: 20,
                marginBottom: 2,
                textAlign: "center",
              }}
            >
              Game 1
            </Typography>
            <Box
              sx={{
                backgroundColor: "#000000",
                padding: 1,
                borderRadius: "4px",
                height: 220,
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <Link to="/play/word-game">
                <img src={wordGameImg} alt="word game img" width={200} />
              </Link>
            </Box>
          </Grid>
          <Grid xs={12} md={4}>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: 20,
                marginBottom: 2,
                textAlign: "center",
              }}
            >
              Game 2
            </Typography>
            <Box
              sx={{
                // border: "0.1px solid",
                borderColor: "darkgray",
                boxShadow: 4,
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 220,
              }}
            >
              {/* adding hangman game */}
              <Link
                to="/play/hangman-game"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <img
                  src={HangmanGame}
                  alt="hangman gaming"
                  width={"100%"}
                  height={"100%"}
                />
              </Link>
            </Box>
          </Grid>
          <Grid xs={12} md={4}>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: 20,
                marginBottom: 2,
                textAlign: "center",
              }}
            >
              Game 3
            </Typography>
            {/* use the box style here */}

            <Box
              sx={{
                // border: "0.1px solid",
                borderColor: "darkgray",
                boxShadow: 4,
                borderRadius: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: 220,
                cursor: "pointer",
              }}
            >
              <Link
                to="/play/letter-game"
                style={{
                  width: "100%",
                  height: "100%",
                }}
              >
                <img
                  src={LetterMatch}
                  alt="LetterMatch game"
                  width={"100%"}
                  height={"100%"}
                />
              </Link>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  );
};

export default Play;
