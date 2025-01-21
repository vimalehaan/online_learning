import React, { useState, useEffect, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import axios from "axios";
import { AuthContext } from "../../Contexts/AuthContext";

const EnrolledStudentsDialog = ({ open, onClose, courseId }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (open) {
      fetchEnrolledStudents();
    }
  }, [open]);

  const fetchEnrolledStudents = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `http://localhost:3001/courses/enrolledSt/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setStudents(response.data.students || []);
    } catch (err) {
      setError("Failed to fetch enrolled students. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Enrolled Students</DialogTitle>
      <DialogContent>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : students.length > 0 ? (
          <List>
            {students.map((student) => (
              <ListItem key={student.id}>
                <ListItemText primary={student.name} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography>No students enrolled in this course.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="outlined" color="#e68919">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EnrolledStudentsDialog;
