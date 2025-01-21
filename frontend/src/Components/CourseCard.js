import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Typography,
} from "@mui/material";
import { AuthContext } from "../Contexts/AuthContext";


const CourseCard = ({ course, onClick }) => {
  const { user } = useContext(AuthContext);
  const truncateText = (text, limit) => {
    if (text && text.length > limit) {
      return text.slice(0, limit) + "...";
    }
    return text;
  };

  const [isEnrolled, setIsEnrolled] = useState(false);
  useEffect(() => {
    const enrolled = course.studentsEnrolled.includes(user.id);
    setIsEnrolled(enrolled);
  }, [user]);

  return (
    <div>
      <Card
        onClick={onClick}
        sx={{
          position: "relative",
          width: "330px",
          borderRadius: "15px",
          minHeight: "100px",
          boxShadow: 7,
          padding: "16px",
          overflow: "hidden",
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
            <Typography
              variant="h6"
              component="div"
              textAlign={"center"}
              sx={{
                color: "white",
                backgroundColor: "secondary.main",
                padding: "6px",
                borderRadius: "10px",
                fontWeight: "500",
              }}
            >
              {truncateText(course.title, 25)}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                textAlign: "justify",
                marginBottom: 1,
                marginTop: 1,
                color: "#757575",
              }}
            >
              {`Enrolls: ${course.studentsEnrolled.length}`}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              textAlign={"start"}
              sx={{}}
            >
              {`By ${course.instructor.name}`}
            </Typography>

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "end",
                mt: 1,
              }}
            >
              <Chip
                label= {isEnrolled ? "Already Enrolled" : "Enroll"}
                variant="filled"
                sx={{
                    height: "30px",
                    fontSize: "12px",
                    backgroundColor: isEnrolled ? "success.lighter" : "primary.lighter",
                    color: '#757575'
                }}
              />
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
};

export default CourseCard;
