const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  try {
    const { prompt } = JSON.parse(event.body);
    const apiKey = process.env.GEMINI_API_KEY;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        }),
      }
    );

    const result = await response.json();
    const text = result?.candidates?.[0]?.content?.parts?.[0]?.text || "回答が得られませんでした。";

    return {
      statusCode: 200,
      body: JSON.stringify({ result: text }),
    };
  } catch (error) {
    console.error("エラー:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ result: "サーバーエラーが発生しました。" }),
    };
  }
};
