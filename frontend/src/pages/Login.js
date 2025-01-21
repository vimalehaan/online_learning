import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";

import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid2,
  Link,
  Stack,
} from "@mui/material";
import { jwtDecode } from "jwt-decode";
import {API_BASE_URL} from "../config";

const Login = () => {
  const { logIn, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/auth/login`,
        formData,
      );

      if (response.data.token) {
        const token = response.data.token;
        logIn(token);
        const { role } = jwtDecode(token);
        if (role === "student") {
          navigate("/studentdash");
        } else if (role === "instructor") {
          navigate("/admin");
        }
      } else {
        console.error("No token received");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        if (message === "User does not exist") {
          setError({ email: message, password: "" });
        } else if (message === "Invalid credential") {
          setError({ email: "", password: message });
        } else {
          console.error("Unexpected error:", message);
        }
      }
    }
  };

  return (
    <div>
      <Container
        maxWidth="md"
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100vh",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            p: 5,
            mt: -20,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: "20px",
            boxShadow: 5,
            width: "60%",
          }}
        >
          <Typography variant="h5">Log In</Typography>
          <Box sx={{ width: "100%", mt: "20px" }}>
            <Grid2 container spacing={4} sx={{ width: "100%" }}>
              <Grid2 size={12} sx={{ width: "100%" }}>
                <TextField
                  variant={"outlined"}
                  label={"Email"}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={Boolean(error.email)}
                  helperText={error.email}
                  sx={{ width: "100%" }}
                />
              </Grid2>
              <Grid2 size={12} sx={{ width: "100%" }}>
                <TextField
                  variant={"outlined"}
                  label={"Password"}
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={Boolean(error.password)}
                  helperText={error.password}
                  sx={{ width: "100%" }}
                />
              </Grid2>

              <Stack
                direction="row"
                spacing={4}
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Button variant={"contained"} onClick={handleSubmit}>
                  Login
                </Button>
                <Link href="/signup" underline="hover">
                  {"Don't you have an account?"}
                </Link>
              </Stack>
            </Grid2>
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default Login;
