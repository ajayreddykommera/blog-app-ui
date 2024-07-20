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

type Role = {
  id: number;
  roleName: string;
};

type UserResponse = {
  userId: number;
  fullName: string;
  userName: string;
  email: string;
  phone: string;
  roles: Role[];
};

function Users() {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const router = useRouter();
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("http://localhost:8080/api/users", {
        cache: "no-store",
      });
      const res: UserResponse[] = await response.json();
      setUsers(res);
    };

    fetchPosts();
  }, []);

  const handleReadMore = (userId: number) => {
    router.push(`/blog/posts/${userId}`);
  };
  return (
    <>
      {users.map((user) => (
        <>
          <Card
            sx={{
              display: "flex",
              borderRadius: 4,
              height: 200,
              width: 200,
              m: 3,
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <CardMedia sx={{ height: 10 }} title="green iguana">
                  <Avatar aria-label="recipe" sx={{ height: 30, width: 30 }}>
                    R
                  </Avatar>
                </CardMedia>
              </Grid>
              <Grid item xs={10}>
                <CardContent sx={{ height: 10 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    {user.fullName}
                  </Typography>

                  <Typography variant="body2">@{user.userName}</Typography>
                </CardContent>
                <CardActions
                  sx={{
                    height: 20,
                    display: "flex",
                    justifyContent: "end",
                  }}
                ></CardActions>
              </Grid>
            </Grid>
          </Card>
        </>
      ))}
    </>
  );
}

export default Users;
