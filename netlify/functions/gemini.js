const fetch = require("node-fetch");

const apiKey = "AIzaSyA6mTy2kqtjQgHmGozsQ6XS3XcIIlZrA42o"; // 本物のキーを使う

exports.handler = async function (event, context) {
  const { prompt } = JSON.parse(event.body);

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "回答が取得できませんでした。";

  return {
    statusCode: 200,
    body: JSON.stringify({ text }),
  };
};
