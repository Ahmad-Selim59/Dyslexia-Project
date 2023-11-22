import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import classes from "./Chat.module.css";
import ChatBox from "../Components/ChatBox";
import Conversations from "../Components/Conversations";
import Users from "../Components/Users";
import Navbar from "../Components/Navbar";

const Chat = () => {
  const [scope, setScope] = useState("Global Chat");
  const [tab, setTab] = useState(0);
  const [user, setUser] = useState(null);

  // changing Tab
  const handleChange = (e, newVal) => {
    setTab(newVal);
  };

  return (
    <React.Fragment>
      <Navbar title={"Messenger"} />
      <Grid container>
        <Grid item md={4} className={classes.sidebar}>
          <Paper className={classes.paper} square elevation={5}>
            <Paper square>
              <Tabs
                onChange={handleChange}
                variant="fullWidth"
                value={tab}
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="Chats" />
                <Tab label="Users" />
              </Tabs>
            </Paper>
            {tab === 0 && (
              <Conversations setUser={setUser} setScope={setScope} />
            )}
            {tab === 1 && <Users setUser={setUser} setScope={setScope} />}
          </Paper>
        </Grid>
        <Grid item md={8}>
          <ChatBox scope={scope} user={user} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default Chat;
