import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Container, Typography, Grid, Button, Box } from "@mui/material";
import CourseCard from "../../Components/Admin/AdminCourseCard";
import AddCourseForm from "../../Components/Admin/AddCourseForm";
import EditCourseForm from "../../Components/Admin/EditCourseForm";
import { AuthContext } from "../../Contexts/AuthContext";
import NavBar from "../../Components/NavBar";
import {API_BASE_URL} from "../../config";

const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [isAddCourseOpen, setIsAddCourseOpen] = useState(false);
  const [isEditCourseOpen, setIsEditCourseOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/courses/instructor`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        setCourses(response.data.courses || response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [token, isEditCourseOpen, isAddCourseOpen, courses]);

  const handleEdit = (course) => {
    setSelectedCourse(course);
    setIsEditCourseOpen(true);
  };

  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`http://localhost:3001/courses/delete/${courseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleAddCourse = (newCourse) => {
    setCourses((prevCourses) => [...prevCourses, newCourse]);
  };

  const handleUpdateCourse = async (updatedCourse) => {
    try {
      await axios.put(
        `http://localhost:3001/courses/update/${updatedCourse.id}`,
        updatedCourse,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setCourses(
        courses.map((course) =>
          course._id === updatedCourse._id ? updatedCourse : course,
        ),
      );
      setIsEditCourseOpen(false);
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#fafbfd" }}>
      <NavBar />
      <Container sx={{ minHeight: "100vh" }}>
        {/* Title and Add Course Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 3,
            marginBottom: 4,
          }}
        >
          <Typography variant="h4" gutterBottom sx={{ fontWeight: "600" }}>
            My Courses
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setIsAddCourseOpen(true)}
            size="small"
            sx={{
              marginTop: "6px",
              fontWeight: "500",
              height: "36px",
              padding: "6px 16px",
            }}
          >
            Add Course
          </Button>
        </Box>

        <Grid container spacing={2}>
          {courses && courses.length > 0 ? (
            courses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course._id}>
                <CourseCard
                  course={course}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </Grid>
            ))
          ) : (
            <Typography variant="body1" color="text.secondary">
              No Courses
            </Typography>
          )}
        </Grid>

        <AddCourseForm
          open={isAddCourseOpen}
          onClose={() => setIsAddCourseOpen(false)}
          onCourseAdded={handleAddCourse}
        />

        <EditCourseForm
          open={isEditCourseOpen}
          onClose={() => setIsEditCourseOpen(false)}
          course={selectedCourse}
          onCourseUpdated={handleUpdateCourse}
        />
      </Container>
    </Box>
  );
};

export default Dashboard;
