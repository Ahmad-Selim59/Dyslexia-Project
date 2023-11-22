import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import socketIOClient from "socket.io-client";
import classes from "./Users.module.css";
import GetInitialsFromName from "../Utilities/common";
import { useGetUsers } from "../Services/userServices";
import { useAuth } from "../context/AuthContext";

const Users = (props) => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState(null);

  // get all user from API
  const getUsers = useGetUsers();

  // logged in user info
  const { user } = useAuth();

  useEffect(() => {
    getUsers().then((res) => setUsers(res));
  }, [newUser]);

  // realtime message update
  useEffect(() => {
    const socket = socketIOClient(process.env.REACT_APP_API_URL);
    socket.on("users", (data) => {
      setNewUser(data);
    });
  }, []);
  const participators = users.filter((u) => u._id !== user.userId);

  return (
    <List className={classes.list}>
      {participators && (
        <React.Fragment>
          {participators.map((u) => (
            <ListItem
              className={classes.listItem}
              key={u._id}
              onClick={() => {
                props.setUser(u);
                props.setScope(u.username);
              }}
              button
            >
              <ListItemAvatar className={classes.avatar}>
                <Avatar>{GetInitialsFromName(u.username)}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={u.username} />
            </ListItem>
          ))}
        </React.Fragment>
      )}
    </List>
  );
};

export default Users;
