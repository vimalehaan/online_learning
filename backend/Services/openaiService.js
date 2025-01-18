// openaiService.js
require("dotenv").config();

const axios = require('axios');


// Your OpenAI API key
// const API_KEY = process.env.OPEN_AI_KEY;
const API_KEY = "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";

const formatResponseForFrontend = (text) => {
    // Break the content into lines for processing
    const lines = text.split("\n").filter(line => line.trim() !== "");

    // Construct HTML elements
    let formattedHTML = "<div>";

    lines.forEach(line => {
        if (line.startsWith("1.") || line.startsWith("2.") || line.startsWith("3.") || line.startsWith("4.")) {
            // Format numbered list items
            formattedHTML += `<li>${line.slice(3).trim()}</li>`;
        } else if (line.startsWith("###")) {
            // Format headers
            formattedHTML += `<h3>${line.slice(4).trim()}</h3>`;
        } else {
            // Format paragraphs
            formattedHTML += `<p>${line.trim()}</p>`;
        }
    });

    formattedHTML += "</div>";
    return formattedHTML;
};

const getCourseSuggestions = async (userPrompt) => {
    const courses = ["Machine Learning", "Software Engineering for Beginner", "Software Architecture", "Management", "Operating System"];
    try {
        // Create a detailed prompt using the user's request and preferred courses
        const detailedPrompt = `
        These are our courese ${courses} 
        Student prompt is :${userPrompt}
        Suggest Courses from Our Courses
    `;

        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4o-mini',
                messages: [{"role": "user", "content": `${detailedPrompt}`}],
                // prompt: detailedPrompt,
                max_tokens: 150,
                temperature: 0.7,  // Controls randomness
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}`,
                },
            }
        );
        console.log(response.data.choices[0].message.content);
        const completion = response.data.choices[0].message.content;
        return formatResponseForFrontend(completion); // Returning the AI-generated text
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        throw new Error('Failed to get course suggestions.');
    }
};

module.exports = { getCourseSuggestions };
