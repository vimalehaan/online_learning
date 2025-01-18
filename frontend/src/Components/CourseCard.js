import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";

const CourseCard = ({ course, onClick }) => {
  return (
    <div>
      <Card
        onClick={onClick}
        sx={{
          width: "330px",
          borderRadius: "15px",
          minHeight: "100px",
          boxShadow: 7,
        }}
      >
        <CardActionArea
          sx={{
            height: "100%",
            "&[data-active]": {
              backgroundColor: "action.selected",
              "&:hover": {
                backgroundColor: "action.selectedHover",
              },
            },
          }}
        >
          <CardContent sx={{ height: "100%" }}>
            <Typography variant="h5" component="div" textAlign={"start"}>
              {course.title}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign={"start"}
            >
              {course.description}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign={"start"}
              sx={{ mt: "4px" }}
            >
              {`By ${course.instructor.name}`}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default CourseCard;
