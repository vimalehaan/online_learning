import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Container, TextField, Typography } from "@mui/material";
import NavBar from "../Components/NavBar";

const CourseSuggestion = () => {
  const [prompt, setPrompt] = useState("");
  // const [preferredCourses, setPreferredCourses] = useState('');
  const [courseSuggestions, setCourseSuggestions] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt) return;

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3001/openai/get-course-suggestions",
        {
          prompt: prompt,
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
          <Typography variant="h5" fontWeight={'bold'}>Get Course Recommendations</Typography>
          <TextField
            label="Enter your career goal or interest"
            variant="outlined"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            sx={{ mt: 2, mb: 3 , width: "70%" }}
            multiline
            rows={6}
          />
          <Button variant="contained" onClick={handleSubmit} disabled={loading} sx={{borderRadius: "15px"}}>
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
