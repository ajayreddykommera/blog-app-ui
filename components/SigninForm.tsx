"use client";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ISigninRequest from "@/models/Signin";
import ISigninResponse from "@/models/SigninResponse";
import { useRouter } from "next/navigation";

function SigninForm() {
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertMsg, setShowAlertMsg] = useState("");
  const [showAlertVariant, setShowAlertVariant] = useState<
    AlertColor | undefined
  >(undefined);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = async (): Promise<void> => {
    setShowAlert(false);
    if (!username || !password) {
      setShowAlertMsg("All fields must be filled out before submitting.");
      setShowAlertVariant("error");
      setShowAlert(true);
      return;
    }
    const request: ISigninRequest = {
      username: username,
      password: password,
    };

    try {
      const response = await fetch("http://localhost:8080/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      const data: ISigninResponse = await response.json();
      if (data.code == 0) {
        setShowAlertVariant("success");
        setShowAlert(true);
        router.push("/posts");
        console.log("response", data);
      } else if (data.code == 1) {
        localStorage.setItem("user_jwttoken", data.type + " " + data.token);
        setShowAlertMsg(data.message);
        setShowAlertVariant("error");
        setShowAlert(true);
        console.log(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: "500px", // Maximum width of the form
          bgcolor: "background.paper",
          boxShadow: 3,
          borderRadius: 1,
          p: 5,
        }}
      >
        <Grid container direction="column" spacing={3}>
          <Grid item xs={12}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              align="center"
              color={"blue"}
            >
              Signin
            </Typography>
          </Grid>
          {showAlert ? (
            <Alert variant="filled" severity={showAlertVariant}>
              {showAlertMsg}
            </Alert>
          ) : (
            ""
          )}
          <Grid item>
            <TextField
              required
              fullWidth
              id="username-input"
              label="Username"
              variant="outlined"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Grid>
          <Grid item>
            <TextField
              required
              fullWidth
              id="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Button fullWidth variant="contained" onClick={handleSubmit}>
              Signin
            </Button>
          </Grid>

          <Grid item xs={12}>
            <Typography gutterBottom align="left">
              Not have an account ? {<Link href={"/signup"}>Signup</Link>}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default SigninForm;
