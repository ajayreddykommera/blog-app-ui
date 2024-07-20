"use client";
import {
  Alert,
  AlertColor,
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  SnackbarContent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useRouter } from "next/navigation";
import ISignupRequest from "@/models/Signup";

function SignupForm() {
  const router = useRouter();

  const [firstname, setFirstname] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [roles, setroles] = useState<string[]>([]);
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
    if (!username || !email || !password || !phone || !firstname || !lastname) {
      console.error("All fields must be filled out before submitting.");
      setShowAlertMsg("All fields must be filled out before submitting.");
      setShowAlertVariant("error");
      setShowAlert(true);
      return;
    }

    if (password !== confirmPassword) {
      console.error("Passwords do not match.");
      setShowAlertMsg("Passwords do not match.");
      setShowAlertVariant("error");
      return;
    }

    const request: ISignupRequest = {
      username: username,
      email: email,
      password: password,
      phone: phone,
      fullName: firstname + " " + lastname,
      roles: roles,
    };

    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      const data = await response.json();
      setShowAlertMsg(data.message);
      if (data.code == 0) {
        setShowAlertVariant("success");
        setShowAlert(true);
        router.push("/signin");
        console.log("response", data);
      } else if (data.code == 1) {
        setShowAlertVariant("error");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
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
            maxWidth: "500px",
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
                Signup
              </Typography>
            </Grid>
            {showAlert ? (
              <Alert variant="filled" severity={showAlertVariant}>
                {showAlertMsg}
              </Alert>
            ) : (
              ""
            )}

            <Grid item container spacing={3}>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="firstname"
                  label="First Name"
                  variant="outlined"
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  variant="outlined"
                  onChange={(e) => setLastname(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                id="username"
                label="Username"
                variant="outlined"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Grid>
            <Grid item>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                variant="outlined"
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item container spacing={3}>
              <Grid item xs={3}>
                <TextField
                  fullWidth
                  id="phone-number"
                  label="Code"
                  variant="outlined"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>
              <Grid item xs={9}>
                <TextField
                  required
                  fullWidth
                  id="phone-number"
                  label="Phone Number"
                  variant="outlined"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Grid>
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                id="address"
                label="Address"
                variant="outlined"
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>

            <Grid item container spacing={3}>
              <Grid item xs={6}>
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
              <Grid item xs={6}>
                <TextField
                  required
                  fullWidth
                  id="password-input"
                  label="Confirm Password"
                  variant="outlined"
                  error={confirmPassword != "" && password != confirmPassword}
                  helperText={
                    confirmPassword != "" && password != confirmPassword
                      ? "Password didn't match"
                      : ""
                  }
                  type={showPassword ? "text" : "password"}
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
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Typography gutterBottom align="left">
                Already had an account ? {<Link href={"/signin"}>Signin</Link>}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default SignupForm;
