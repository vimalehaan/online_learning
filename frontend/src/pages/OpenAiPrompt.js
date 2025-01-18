import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Typography } from '@mui/material';

const CourseSuggestion = () => {
    const [prompt, setPrompt] = useState('');
    // const [preferredCourses, setPreferredCourses] = useState('');
    const [courseSuggestions, setCourseSuggestions] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!prompt) return;

        setLoading(true);

        try {
            const response = await axios.post('http://localhost:3001/openai/get-course-suggestions', {
                prompt: prompt,
            });
            setCourseSuggestions(response.data.courseSuggestions);
        } catch (error) {
            console.error(error);
            setCourseSuggestions('Error generating course suggestions');
        } finally {
            setLoading(false);
        }
    };

    return (
      <Box sx={{ padding: 3 }}>
        <Typography variant="h6">Get Course Recommendations</Typography>
        <TextField
          label="Enter your career goal or interest"
          variant="outlined"
          fullWidth
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        {/*<TextField*/}
        {/*    label="Enter your preferred courses (comma separated)"*/}
        {/*    variant="outlined"*/}
        {/*    fullWidth*/}
        {/*    value={preferredCourses}*/}
        {/*    onChange={(e) => setPreferredCourses(e.target.value)}*/}
        {/*    sx={{ marginBottom: 2 }}*/}
        {/*/>*/}
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? "Loading..." : "Get Suggestions"}
        </Button>
        {courseSuggestions && (
          <Box sx={{ marginTop: 2, textAlign: 'left'}}>
            <Typography variant="h6">Suggested Courses:</Typography>
            <div dangerouslySetInnerHTML={{ __html: courseSuggestions }} />
          </Box>
        )}
      </Box>
    );
};

export default CourseSuggestion;
