const fetch = require("node-fetch");

const apiKey = "AIzaSyA6mTy2kqtjQgHmGozsQ6XS3XcIlIZrA42o"; // 本物のキーを使用

exports.handler = async function (event, context) {
  try {
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

    if (data.candidates && data.candidates.length > 0) {
      const text = data.candidates[0].content.parts[0].text;
      return {
        statusCode: 200,
        body: JSON.stringify({ text }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({ text: "回答が取得できませんでした。" }),
      };
    }
  } catch (error) {
    console.error("APIエラー:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ text: "エラーが発生しました。" }),
    };
  }
};
