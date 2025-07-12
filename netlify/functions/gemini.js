const fetch = require("node-fetch");

const apiKey = "AIzaSyA6mTy2kqtjQgHmGozsQ6XS3XcIIZrA42o"; // ←ここに本物のキーを使っているか確認

exports.handler = async function (event, context) {
  const { prompt } = JSON.parse(event.body);

  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
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
  const text =
    data.candidates?.[0]?.content?.parts?.[0]?.text || "返答がありませんでした。";

  return {
    statusCode: 200,
    body: JSON.stringify({ text }),
  };
};
