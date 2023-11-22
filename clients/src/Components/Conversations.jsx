import React, { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import LanguageIcon from "@mui/icons-material/Language";
import Divider from "@mui/material/Divider";
import classes from "./Conversations.module.css";
import socketIOClient from "socket.io-client";

// message system: API from backend
import { useGetConversations } from "../Services/chatService";

// for name in avatar
import GetInitialsFromName from "../Utilities/common";

import { useAuth } from "../context/AuthContext";

const Conversations = (props) => {
  const [conversations, setConversations] = useState([]);
  const [newConversation, setNewConversation] = useState(null);
  const getConversations = useGetConversations([]);

  // logged in user info
  const { user } = useAuth();

  // Returns the recipient name that does not
  // belong to the current user.
  const handleRecipient = (recipients) => {
    for (let i = 0; i < recipients.length; i++) {
      if (recipients[i].username !== user.username) {
        return recipients[i];
      }
    }
    return null;
  };

  useEffect(() => {
    getConversations().then((res) => setConversations(res));
  }, [newConversation]);

  // realtime message update
  useEffect(() => {
    let socket = socketIOClient(process.env.REACT_APP_API_URL);
    socket.on("messages", (data) => setNewConversation(data));

    return () => {
      socket.removeListener("messages");
    };
  }, []);

  // return loading until data finishes loading
  if (!conversations) {
    return <p>Loading...</p>;
  }

  return (
    <List className={classes.list}>
      <ListItem
        classes={{ root: classes.subheader }}
        onClick={() => {
          props.setScope("Global Chat");
        }}
      >
        <ListItemAvatar>
          <Avatar className={classes.globe}>
            <LanguageIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText className={classes.subheaderText} primary="Global Chat" />
      </ListItem>
      <Divider />

      {conversations && (
        <React.Fragment>
          {conversations.map((c) => (
            <ListItem
              className={classes.listItem}
              key={c._id}
              button
              onClick={() => {
                props.setUser(handleRecipient(c.recipientObj));
                props.setScope(handleRecipient(c.recipientObj).username);
              }}
            >
              <ListItemAvatar>
                <Avatar>
                  {GetInitialsFromName(
                    handleRecipient(c.recipientObj).username
                  )}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={handleRecipient(c.recipientObj).username}
                secondary={<React.Fragment>{c.lastMessage}</React.Fragment>}
              />
            </ListItem>
          ))}
        </React.Fragment>
      )}
    </List>
  );
};

export default Conversations;
