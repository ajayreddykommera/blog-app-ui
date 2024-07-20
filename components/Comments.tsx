import React, { useState } from "react";
import Comment from "./Comment";
import { Button, Grid, TextField } from "@mui/material";

type CommentsProps = {
  commentId: number;
  comment: string;
  userID: number;
  postID: number;
};

type CommentRequest = {
  comment: string;
  commentedDateTime: Date;
  userID: number;
  postID: number;
};

function Comments({ comments }: { comments: CommentsProps[] }) {
  const [comment, setComment] = useState<string>("");

  const handleComment = async () => {
    const request: CommentRequest = {
      comment: comment,
      commentedDateTime: new Date(),
      userID: 1,
      postID: 4,
    };
    console.log(request);
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjpbIlJPTEVfQVVUSE9SIiwiUk9MRV9OT1JNQUxVU0VSIiwiUk9MRV9BRE1JTiJdLCJpYXQiOjE3MjE1MDMxNjYsImV4cCI6MTcyMTg2MzE2Nn0.o9BlRdfbcR3H_7fIKi1sirChjKf6bRVaM7jG_Wzg1Dc";
    const response = await fetch(
      "http://localhost:8080/api/comments/addComment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(request),
      }
    );
    if (response.ok) {
      const data = await response.json();
      setComment("");
      console.log(data);
    }
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid
          container
          item
          xs={12}
          spacing={3}
          direction="row"
          justifyContent="center"
          alignItems="center"
        >
          <Grid item xs={10}>
            <TextField
              fullWidth
              id="comment"
              label="comment..."
              multiline
              rows={2}
              variant="outlined"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </Grid>
          <Grid item xs={2}>
            <Button variant="contained" onClick={handleComment}>
              Comment
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {comments.map((comment) => (
            <Comment key={comment.commentId} comment={comment} />
          ))}
        </Grid>
      </Grid>
    </>
  );
}

export default Comments;
