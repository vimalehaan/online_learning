import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import NavBar from "../Components/NavBar";
import { useLocation } from "react-router-dom";
import {API_BASE_URL} from "../config";

const CourseSuggestion = () => {
  const location = useLocation();
  const courses = location.state?.courses;

  const [prompt, setPrompt] = useState("");
  const [courseSuggestions, setCourseSuggestions] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    const courseTitles = courses.map((course) => course.title);
    console.log(courseTitles);
    if (!prompt) return;

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_BASE_URL}/openai/get-course-suggestions`,
        {
          prompt: prompt,
          courses: courseTitles,
        },
      );
      setCourseSuggestions(response.data.courseSuggestions);
    } catch (error) {
      console.error(error);
      setCourseSuggestions("Error generating course suggestions");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavBar />
      <Container maxWidth="lg">
        <Box
          sx={{
            padding: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "start",
          }}
        >
          <Typography variant="h5" fontWeight={"bold"}>
            Get Course Recommendations
          </Typography>
          <TextField
            label="Enter your career goal or interest"
            variant="outlined"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            sx={{ mt: 2, mb: 3, width: "70%" }}
            multiline
            rows={6}
          />
          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={loading}
            sx={{ borderRadius: "15px" }}
          >
            {loading ? "Loading..." : "Get Suggestions"}
          </Button>
          {courseSuggestions && (
            <Box sx={{ marginTop: 2, textAlign: "left" }}>
              <Typography variant="h6">Suggested Courses:</Typography>
              <div dangerouslySetInnerHTML={{ __html: courseSuggestions }} />
            </Box>
          )}
        </Box>
      </Container>
    </div>
  );
};

export default CourseSuggestion;
