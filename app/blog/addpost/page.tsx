"use client";
import {
  Box,
  Button,
  Grid,
  TextField,
  TextareaAutosize,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

const Font = Quill.import("formats/font");
Font.whitelist = ["sans-serif", "serif", "monospace"];
Quill.register(Font, true);

const modules = {
  toolbar: [
    [{ font: Font.whitelist }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ header: "1" }, { header: "2" }, "blockquote", "code-block"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ direction: "rtl" }, { align: [] }],
    ["link", "image", "video", "formula"],
    [["code-block"]],
    ["clean"],
  ],
};
type Post = {
  postTitle: string;
  postSummary: string;
  postBody: string;
  tags: string[];
  authorID: number;
  topicId: number;
};

function AddPost() {
  const [postTitle, setPostTitle] = useState<string>("");
  const [postSummary, setPostSummary] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [postBody, setPostBody] = useState<string>("");
  const [tagsString, setTagsString] = useState<string>("");

  useEffect(() => {
    const tagsArray = tagsString.split(",");
    setTags(tagsArray);
  }, [tagsString]);

  const handlePost = async () => {
    const request: Post = {
      postTitle,
      postBody,
      postSummary,
      tags,
      authorID: 1,
      topicId: 1,
    };
    console.log(request);
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsInJvbGVzIjpbIlJPTEVfQVVUSE9SIiwiUk9MRV9OT1JNQUxVU0VSIiwiUk9MRV9BRE1JTiJdLCJpYXQiOjE3MjEyNDEyOTAsImV4cCI6MTcyMTYwMTI5MH0.gZrKxaIuiwo1XjHYCRN0qY4NpdXq36Qu2MKf_R7ZXMI";
    const response = await fetch("http://localhost:8080/api/posts/addPost", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    });

    const data = await response.json();
    console.log(data);
  };

  return (
    <>
      <Box
        sx={{
          bgcolor: "background.paper",
          boxShadow: 3,
          borderRadius: 2,
          p: 5,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="title"
              label="Post Title"
              multiline
              rows={2}
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="summary"
              label="Post Summary"
              multiline
              rows={4}
              value={postSummary}
              onChange={(e) => setPostSummary(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Typography>Post</Typography>
            <ReactQuill
              theme="snow"
              modules={modules}
              value={postBody}
              onChange={setPostBody}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="tags"
              label="Tags"
              multiline
              placeholder="nature, animals etc.."
              maxRows={2}
              value={tagsString}
              onChange={(e) => setTagsString(e.target.value)}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" onClick={handlePost}>
              Publish
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default AddPost;
