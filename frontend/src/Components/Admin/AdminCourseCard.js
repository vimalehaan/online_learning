import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EnrolledStudentsDialog from "./EnrolledStudentsDialog";

const AdminCourseCard = ({ course, onEdit, onDelete }) => {
  const [openDialog, setOpenDialog] = useState(false);

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const truncateText = (text, limit) => {
    if (text && text.length > limit) {
      return text.slice(0, limit) + "...";
    }
    return text;
  };

  return (
    <Card
      sx={{
        margin: 2,
        position: "relative",
        borderRadius: "15px",
        p: "16px",
        height: "300px",
        boxShadow: 3,
        backgroundColor: "white",
        overflow: "hidden",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            color: "white",
            backgroundColor: "secondary.main",
            p: "6px",
            borderRadius: "10px",
            fontWeight: "500",
            fontSize: "1.1rem",
          }}
        >
          {truncateText(course.title, 25)}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            textAlign: "justify",
            mb: 2,
            mt: 2,
            fontSize: "0.95rem",
            color: "#757575",
          }}
        >
          {truncateText(course.description, 270)}
        </Typography>
      </CardContent>

      <Box
        sx={{
          position: "absolute",
          bottom: 24,
          left: 24,
          right: 8,
          display: "flex",
          justifyContent: "space-between",
        }}
      >

        <Button
          variant="contained"
          color="primary"
          onClick={handleDialogOpen}
          sx={{
            p: "6px 12px",
            borderRadius: "15px",
          }}
        >
          View Students
        </Button>

        <Box>
          <IconButton
            onClick={() => onEdit(course)}
            sx={{
              color: "black",
              ml: "8px",
              ":hover": { backgroundColor: "primary.lighter" },
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            onClick={() => onDelete(course.id)}
            sx={{
              color: "error.light",
              ml: "8px",
              ":hover": { backgroundColor: "error.lighter" },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>

      <EnrolledStudentsDialog
        open={openDialog}
        onClose={handleDialogClose}
        courseId={course.id}
      />
    </Card>
  );
};

export default AdminCourseCard;
