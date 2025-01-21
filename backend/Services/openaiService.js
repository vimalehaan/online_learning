require("dotenv").config();

const axios = require("axios");

const API_KEY = process.env.OPEN_AI_KEY;

const formatResponseForFrontend = (text) => {
  const lines = text.split("\n").filter((line) => line.trim() !== "");

  let formattedHTML = "<div>";

  lines.forEach((line) => {
    if (
      line.startsWith("1.") ||
      line.startsWith("2.") ||
      line.startsWith("3.") ||
      line.startsWith("4.")
    ) {
      formattedHTML += `<li>${line.slice(3).trim()}</li>`;
    } else if (line.startsWith("###")) {
      formattedHTML += `<h3>${line.slice(4).trim()}</h3>`;
    } else {
      formattedHTML += `<p>${line.trim()}</p>`;
    }
  });

  formattedHTML += "</div>";
  return formattedHTML;
};

const getCourseSuggestions = async (userPrompt) => {
  const courses = [
    "Machine Learning",
    "Software Engineering for Beginner",
    "Software Architecture",
    "Management",
    "Operating System",
  ];
  try {
    const detailedPrompt = `
        These are our courese ${courses} 
        Student prompt is :${userPrompt}
        Suggest Courses from Our Courses
    `;

    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: `${detailedPrompt}` }],
        max_tokens: 150,
        temperature: 0.7,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      },
    );
    console.log(response.data.choices[0].message.content);
    const completion = response.data.choices[0].message.content;
    return formatResponseForFrontend(completion);
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw new Error("Failed to get course suggestions.");
  }
};

module.exports = { getCourseSuggestions };
