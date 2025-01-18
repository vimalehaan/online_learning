import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Stack,
  Typography,
} from "@mui/material";

import { AuthContext } from "../Contexts/AuthContext";

const CoursePage = () => {
  const { token, user } = useContext(AuthContext);
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/courses/${id}`);
        setCourse(response.data); // Adjust based on your backend response format
        setError(null);

        const enrolled = response.data.course.studentsEnrolled.includes(
          user.id,
        );
        setIsEnrolled(enrolled);
      } catch (err) {
        console.error(
          "Error fetching course:",
          err.response?.data?.message || err.message,
        );
        setError(err.response?.data?.message || "Failed to fetch course.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id, user]);

  // console.log(course.course.title);
  const title = course?.course.title;
  const description = course?.course.description;
  const content = course?.course.content;
  const instructor = course?.course.instructor.name;

  const handleEnroll = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3001/courses/enroll/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      console.log(response.data);
      alert(response.data.message);
      setIsEnrolled(true);
    } catch (error) {
      console.error(
        "Enrollment error:",
        error.response?.data?.message || error.message,
      );
      alert(
        error.response?.data?.message || "An error occurred during enrollment.",
      );
    }
  };

  return (
    <div>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ textAlign: "center" }}>
          {error}
        </Alert>
      ) : (
        <Container maxWidth="lg" sx={{}}>
          <Box
            sx={{
              mt: 3,
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
            }}
          >
            <Stack direction="column" spacing={0.6}>
              <Typography variant="h4" textAlign={"start"}>
                {title}
              </Typography>
              <Typography variant="subtitle1" textAlign={"start"}>
                {`Course Description: ${description}`}
              </Typography>
              <Typography variant="subtitle1" textAlign={"start"}>
                {`Instructor: ${instructor}`}
              </Typography>
            </Stack>

            <Typography variant="subtitle1" textAlign={"start"} sx={{ mt: 3 }}>
              dgvsdfbj vsbfjkfdb fgsjknjvfdb bnsfkdjbnksrgtbg fnnsgbdgb
              nfvsjfdbn snfjnsgb nfjbsjgbngf jsfnkbnsfdjknb bvsjfndb
              vjbnfsjkbnsjtrb tjrg tgjsfvoi bsfjbnrti tsnbjfnvbg jdksbftrs
              jfnbfgskdjbvg rjfndkbnsjkbf njkfdsbnfjkdvs fjnbsjbsdff fsdbjknfdbv
              sdfjbnjsgfkbfd nsdfjbnfjnbskfb jsdnfbnsfdjknb njknsdbf
            </Typography>
            <Button
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={handleEnroll}
              disabled={isEnrolled}
            >
              {isEnrolled ? "Already Enrolled" : "Enroll Now"}
            </Button>
          </Box>
        </Container>
      )}
    </div>
  );
};

export default CoursePage;
