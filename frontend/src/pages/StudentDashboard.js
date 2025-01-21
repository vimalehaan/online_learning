import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Stack, Button,
} from "@mui/material";

import CourseCard from "../Components/CourseCard";
import axios from "axios";
import { AuthContext } from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";
import SmartToyIcon from '@mui/icons-material/SmartToy';

const StudentDashboard = () => {
  const navigate = useNavigate();
  const { token, user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token || !user) {
      setLoading(true);
    }
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3001/courses", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourses(response.data.courses);
        setError(null);
      } catch (e) {
        console.error(
          "Error fetching courses:",
          e.response?.data?.message || e.message,
        );
        setError(
          e.response?.data?.message ||
            "An error occurred while fetching courses.",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleClick = (courseId) => {
    navigate(`/course/${courseId}`);
  };
  const handleBotClick = () => {
    navigate(`/aibot`);
  };

  return (
    <div>
      <NavBar />
      <Container maxWidth="lg" sx={{}}>
        <Box sx={{ width: "100%", minHeight: "100vh", p: 2 }}>
          <Stack direction="row" sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h4" textAlign={"start"} fontWeight={"600"}>
              Courses
            </Typography>
            <Button variant="contained" sx={{borderRadius: "15px"}} endIcon={<SmartToyIcon />} onClick={handleBotClick}>
              AI Bot
            </Button>
          </Stack>
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Box
              sx={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                gap: "30px 55px",
                mt: 3,
              }}
            >
              {courses.map((course) => (
                <CourseCard
                  key={course._id}
                  course={course}
                  onClick={() => handleClick(course._id)}
                />
              ))}
            </Box>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default StudentDashboard;
