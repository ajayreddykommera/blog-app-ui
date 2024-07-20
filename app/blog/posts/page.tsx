"use client";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
interface PostResponse {
  postId: number;
  postTitle: string;
  postBody: string;
  postSummary: string;
  tags: string[];
  createdAt: string;
  modifiedAt: string | null;
  comments: any[];
  likes: any | null;
  userID: number;
}

function Posts() {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("http://localhost:8080/api/posts", {
        cache: "no-store",
      });
      const res = await response.json();
      setPosts(res);
    };

    fetchPosts();
  }, []);

  const handleReadMore = (postId: number) => {
    router.push(`/blog/posts/${postId}`);
  };
  return (
    <>
      {posts.map((post) => (
        <>
          <Card sx={{ display: "flex", borderRadius: 4, height: 200, m: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <CardMedia sx={{ height: 100 }} title="green iguana">
                  <Avatar aria-label="recipe" sx={{ height: 140, width: 140 }}>
                    R
                  </Avatar>
                </CardMedia>
              </Grid>
              <Grid item xs={10}>
                <CardContent sx={{ height: 130 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {post.postTitle}
                  </Typography>

                  <Typography variant="body2">{post.postSummary}</Typography>
                </CardContent>
                <CardActions
                  sx={{
                    height: 20,
                    display: "flex",
                    justifyContent: "end",
                  }}
                >
                  <Button
                    size="small"
                    onClick={() => handleReadMore(post.postId)}
                  >
                    Read More...
                  </Button>
                </CardActions>
              </Grid>
            </Grid>
          </Card>
        </>
      ))}
    </>
  );
}

export default Posts;
