const fetch = require('node-fetch');

exports.handler = async function (event, context) {
  const { prompt } = JSON.parse(event.body);

  const apiKey = "AIzaSyA6mTy2kqtjQgHmGozsQ6XS3XcIIZrA42o"; // ここに直接APIキーを記述

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      })
    }
  );

  const result = await response.json();
  const text = result.candidates?.[0]?.content?.parts?.[0]?.text || "エラーが発生しました";

  return {
    statusCode: 200,
    body: JSON.stringify({ result: text }),
  };
};
