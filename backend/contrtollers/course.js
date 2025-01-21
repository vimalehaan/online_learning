const Course = require("../models/courseSchema");
const User = require("../models/userSchema");

const createCourse = async (req, res) => {
  try {
    const { title, description, content } = req.body;
    if (!title || !description || !content) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const user = await User.findById(req.user.id);
    console.log(user);
    if (!user || user.role !== "instructor") {
      return res
        .status(403)
        .json({ message: "Only instructors can create courses." });
    }

    const course = new Course({
      title,
      description,
      content,
      instructor: user._id,
    });

    const savedCourse = await course.save();

    res.status(201).json({
      message: "Course created successfully.",
      course: savedCourse,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const deleteCourse = async (req, res) => {
  try {
    const courseId = req.params.id; // Get course ID from request params
    const userId = req.user.id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    if (course.instructor.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this course." });
    }

    await course.deleteOne();
    res.status(200).json({ message: "Course deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const updateCourse = async (req, res) => {
  try {
    const courseId = req.params.id; // Get course ID from request params
    const userId = req.user.id;

    const { title, description, content } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    if (course.instructor.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "You are not authorized to update this course." });
    }

    if (title) course.title = title;
    if (description) course.description = description;
    if (content) course.content = content;

    const updatedCourse = await course.save();

    res.status(200).json({
      message: "Course updated successfully.",
      course: updatedCourse,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("instructor", "name");
    res.status(200).json({ courses });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const getCourseById = async (req, res) => {
  try {
    const courseId = req.params.id;

    const course = await Course.findById(courseId).populate(
      "instructor",
      "name",
    );

    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    res.status(200).json({ course });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const courseEnroll = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.id;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    if (course.studentsEnrolled.includes(userId)) {
      return res
        .status(400)
        .json({ message: "You are already enrolled in this course." });
    }

    course.studentsEnrolled.push(userId);
    await course.save();

    res.status(200).json({
      message: "Successfully enrolled in the course.",
      courseId: course._id,
      courseTitle: course.title,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;

    const enrolledCourses = await Course.find({
      studentsEnrolled: userId,
    }).populate("instructor", "name");

    if (!enrolledCourses || enrolledCourses.length === 0) {
      return res.status(404).json({ message: "No enrolled courses found." });
    }

    res.status(200).json({
      message: "Enrolled courses retrieved successfully.",
      courses: enrolledCourses,
    });
  } catch (error) {
    console.error("Error fetching enrolled courses:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getEnrolledStudents = async (req, res) => {
  try {
    const courseId = req.params.id;
    const userId = req.user.id;

    const course = await Course.findById(courseId).populate(
      "studentsEnrolled",
      "name",
    );
    if (!course) {
      return res.status(404).json({ message: "Course not found." });
    }

    if (course.instructor.toString() !== userId) {
      return res
        .status(403)
        .json({
          message: "You are not authorized to view this course's students.",
        });
    }

    res.status(200).json({
      message: "Enrolled students retrieved successfully.",
      courseTitle: course.title,
      students: course.studentsEnrolled,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id;

    const courses = await Course.find({ instructor: instructorId });

    if (!courses || courses.length === 0) {
      return res
        .status(404)
        .json({ message: "No courses found for this instructor." });
    }

    res.status(200).json({
      message: "Courses fetched successfully.",
      courses: courses.map((course) => ({
        id: course._id,
        title: course.title,
        description: course.description,
        content: course.content,
        studentsEnrolled: course.studentsEnrolled.length,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = {
  createCourse,
  deleteCourse,
  updateCourse,
  getAllCourses,
  getCourseById,
  courseEnroll,
  getEnrolledCourses,
  getEnrolledStudents,
  getInstructorCourses,
};
