const express = require("express");

const { getCourseSuggestions } = require('../Services/openaiService');
const router = express.Router();

router.post("/get-course-suggestions", async (req, res) => {
  const { prompt, courses } = req.body;
  console.log(prompt)
  if (!prompt) {
    return res
      .status(400)
      .send({
        message:
          "Please provide a valid prompt and a list of preferred courses.",
      });
  }

  try {
    const courseSuggestions = await getCourseSuggestions(
      prompt, courses
    );
    return res.status(200).send({ courseSuggestions });

  } catch (error) {
    console.log(error);
    return res
      .status(500)

      .send({ message: "Error generating course suggestions." });
  }
});

module.exports = router;