import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Contexts/AuthContext";
import axios from "axios";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@mui/material";
import TableComponent from "../Components/TableComponent";
import { useNavigate } from "react-router-dom";
import NavBar from "../Components/NavBar";

const StudentProfile = () => {
  const { token, user } = useContext(AuthContext);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/courses/student/enrolled",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setEnrolledCourses(response.data.courses);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEnrolledCourses();
  }, []);

  const columns = ["Course Title", "Instructor", "Course Description"];

  const rows = enrolledCourses.map((course) => [
    course.title,
    course.instructor.name,
    course.description,
  ]);

  const handleClick = () => {
    navigate("/studentdash");
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
      ) : (
        <div>
          <NavBar />
          <Container maxWidth={"lg"}>
            <Box
              sx={{
                mt: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
              }}
            >
              <Typography variant="h4" textAlign={"start"} fontWeight={"bold"}>
                {`Hello ${user.name}!`}
              </Typography>
              <Typography variant="h6" textAlign={"start"} sx={{ mt: 2 }}>
                Your Enrolled Courses:
              </Typography>
              <Box sx={{ width: "60%", mt: 2 }}>
                <TableComponent columns={columns} rows={rows} />
              </Box>
              <Button
                variant={"contained"}
                sx={{ mt: 2, borderRadius: "15px" }}
                onClick={handleClick}
              >
                {" "}
                View More Courses
              </Button>
            </Box>
          </Container>
        </div>
      )}
    </div>
  );
};

export default StudentProfile;
