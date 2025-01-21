const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    studentsEnrolled: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});

module.exports = mongoose.model("Course", courseSchema);