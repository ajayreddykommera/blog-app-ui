import {
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";

type CommentProps = {
  comment: {
    commentId: number;
    comment: string;
    userID: number;
    postID: number;
  };
};

function Comment({ comment }: CommentProps) {
  return (
    <>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
            </ListItemAvatar>
            <ListItemText
              primary={comment.userID}
              secondary={
                <>
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {comment.comment}
                  </Typography>
                </>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </>
      </List>
    </>
  );
}

export default Comment;
