import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";

import { AuthContext } from "../Contexts/AuthContext";
import NavBar from "../Components/NavBar";
import {API_BASE_URL} from "../config";

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
        const response = await axios.get(`${API_BASE_URL}/courses/${id}`);
        setCourse(response.data);
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
        <div>
          <NavBar />
          <Container maxWidth="lg" sx={{}}>
            <Box
              sx={{
                mt: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography variant="h4" textAlign={"start"}>
                {title}
              </Typography>
              <Typography
                variant="subtitle1"
                textAlign={"start"}
                fontWeight={"bold"}
                sx={{ mt: 3 }}
              >
                Course Description:
              </Typography>
              <Typography
                variant="subtitle1"
                textAlign={"start"}
                sx={{ ml: 2 }}
              >
                {`${description}`}
              </Typography>

              <Typography
                variant="subtitle1"
                textAlign={"start"}
                fontWeight={"bold"}
                sx={{ mt: 2 }}
              >
                Course Content:
              </Typography>
              <Typography
                variant="subtitle1"
                textAlign={"start"}
                sx={{ ml: 2 }}
              >
                {content}
              </Typography>
              <Typography
                variant="subtitle1"
                textAlign={"start"}
                fontWeight={"bold"}
                sx={{ mt: 3, fontSize: "20px" }}
              >
                {`Instructor: ${instructor}`}
              </Typography>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 3, borderRadius: '15px' }}
                onClick={handleEnroll}
                disabled={isEnrolled}
              >
                {isEnrolled ? "Already Enrolled" : "Enroll Now"}
              </Button>
            </Box>
          </Container>
        </div>
      )}
    </div>
  );
};

export default CoursePage;
