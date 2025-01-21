import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid2,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Link,
  Stack,
} from "@mui/material";

import axios from "axios";
import { useNavigate } from "react-router-dom";

import { validateForm } from "../Functions/FormValidation";
import AlertDialog from "../Components/Dialogs/AlertDialog";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRoleChange = (event) => {
    setFormData({
      ...formData,
      role: event.target.value,
    });
  };

  const handleSubmit = async () => {
    const { isValid, errors } = validateForm(formData);
    if (isValid) {
      // Submit form logic here (e.g., API call)
      console.log("Form submitted", formData);
      try {
        const response = await axios.post(
          "http://localhost:3001/auth/register",
          {
            name: formData.name,
            email: formData.email,
            password: formData.password,
            role: formData.role,
          },
        );
        console.log(response.data);
        navigate("/login");
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setDialogMessage(error.response.data.message);
          setOpenDialog(true);
        } else {
          console.error("Error during registration:", error.response || error);
          setDialogMessage(
            "An error occurred while registering. Please try again later.",
          );
          setOpenDialog(true);
        }
      }
    } else {
      setErrors(errors);
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
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
          <Typography variant="h5">Sign Up</Typography>
          <Box sx={{ width: "100%", mt: "20px" }}>
            <Grid2 container spacing={4} sx={{ width: "100%" }}>
              <Grid2 size={12} sx={{ width: "100%" }}>
                <TextField
                  variant={"outlined"}
                  label={"Name"}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={Boolean(errors.name)}
                  helperText={errors.name}
                  sx={{ width: "100%" }}
                />
              </Grid2>
              <Grid2 size={12} sx={{ width: "100%" }}>
                <TextField
                  variant={"outlined"}
                  label={"Email"}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={Boolean(errors.email)}
                  helperText={errors.email}
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
                  error={Boolean(errors.password)}
                  helperText={errors.password}
                  sx={{ width: "100%" }}
                />
              </Grid2>
              <Grid2 size={12} sx={{ width: "100%" }}>
                <TextField
                  variant={"outlined"}
                  label={"Confirm Password"}
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={Boolean(errors.confirmPassword)}
                  helperText={errors.confirmPassword}
                  sx={{ width: "100%" }}
                />
              </Grid2>
              <Grid2
                size={12}
                sx={{ width: "100%", display: "flex", justifyContent: "start" }}
              >
                <FormControl component="fieldset" error={Boolean(errors.role)}>
                  <RadioGroup
                    row
                    aria-label="role"
                    name="role"
                    value={formData.role}
                    onChange={handleRoleChange}
                  >
                    <FormControlLabel
                      value="student"
                      control={<Radio />}
                      label="Student"
                    />
                    <FormControlLabel
                      value="instructor"
                      control={<Radio />}
                      label="Instructor"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid2>

              <Stack
                direction="row"
                spacing={4}
                sx={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  // justifyContent: 'space-between'
                }}
              >
                <Button variant={"contained"} onClick={handleSubmit}>
                  Register
                </Button>
                <Link href="/login" underline="hover">
                  {"Already have an account?"}
                </Link>
              </Stack>
            </Grid2>
          </Box>
        </Box>
      </Container>
      <AlertDialog
        open={openDialog}
        message={dialogMessage}
        onClose={handleDialogClose}
      />
    </div>
  );
};

export default SignUp;
