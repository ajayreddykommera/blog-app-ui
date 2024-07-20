"use client";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardHeader,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { format } from "date-fns";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Comments from "@/components/Comments";
interface PostResponse {
  postId: number;
  postTitle: string;
  postBody: string;
  postSummary: string;
  tags: string[];
  createdAt: string;
  modifiedAt: string | null;
  comments: Comment[];
  likes: any | null;
  userID: number;
}
type Role = {
  id: number;
  roleName: string;
};

type Comment = {
  commentId: number;
  comment: string;
  userID: number;
  postID: number;
};

type User = {
  userId: number;
  fullName: string;
  userName: string;
  email: string;
  phone: string;
  roles: Role[];
};

function PostIdPage({
  params,
}: {
  params: {
    postId: string;
  };
}) {
  const [post, setPost] = useState<PostResponse>();
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch(
        `http://localhost:8080/api/posts/${params.postId}`,
        {
          cache: "no-store",
        }
      );
      const res = await response.json();
      setPost(res);
    };

    fetchPost();
  }, [params.postId]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!post?.userID) return;
      const response = await fetch(
        `http://localhost:8080/api/users/${post.userID}`,
        {
          cache: "no-store",
        }
      );
      const res = await response.json();
      setUser(res);
    };

    fetchUser();
  }, [post?.userID]);

  let formattedDate = "";
  if (post?.createdAt) {
    const date = new Date(post.createdAt);
    formattedDate = format(date, "EEEE, MMMM do yyyy");
  }

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Button startIcon={<ArrowBackIcon />} href="/blog/posts">
              Back to Blog
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle2" display="block">
              {formattedDate}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h3" display="block" id="title" gutterBottom>
              {post?.postTitle}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" display="block">
              Posted by
            </Typography>
            <Paper elevation={0} sx={{ maxWidth: 300 }}>
              <CardActionArea>
                <CardHeader
                  avatar={<Avatar aria-label="profile pic">R</Avatar>}
                  title={user?.fullName}
                  subheader={user?.userName}
                />
              </CardActionArea>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <ReactQuill
              theme="snow"
              readOnly={true}
              modules={{ toolbar: false }}
              value={post?.postBody}
            />
          </Grid>
          <Typography>Keywords</Typography>
          <Grid item xs={12}>
            {post?.tags.map((tag) => (
              <Chip key={tag} label={tag} sx={{ m: 1 }} />
            ))}
          </Grid>
          <Typography>Comments</Typography>
          <Grid item xs={12}>
            <Comments comments={post?.comments ?? []} />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default PostIdPage;
