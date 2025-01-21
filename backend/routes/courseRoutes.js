const express = require("express");
const {
  createCourse,
  deleteCourse,
  updateCourse,
  getAllCourses,
  getCourseById,
  courseEnroll,
  getEnrolledCourses,
  getEnrolledStudents,
  getInstructorCourses,
} = require("../contrtollers/course");

const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/instructor", verifyToken, getInstructorCourses);
router.get("/", verifyToken, getAllCourses);
router.get("/:id", getCourseById);
router.get("/student/enrolled", verifyToken, getEnrolledCourses);
router.get("/enrolledSt/:id", verifyToken, getEnrolledStudents);
router.post("/new", verifyToken, createCourse);
router.delete("/delete/:id", verifyToken, deleteCourse);
router.put("/update/:id", verifyToken, updateCourse);
router.post("/enroll/:id", verifyToken, courseEnroll);

module.exports = router;
