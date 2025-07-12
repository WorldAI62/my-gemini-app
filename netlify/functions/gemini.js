const fetch = require("node-fetch");

const apiKey = "AIzaSyA6mTy2kqtjQgHmGozsQ6XS3xCIlZrA42o"; // ← あなたの正しいAPIキーに置き換えてください

exports.handler = async function(event, context) {
  try {
    const { prompt } = JSON.parse(event.body);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: prompt }]
            }
          ]
        })
      }
    );

    const data = await response.json();

    // エラーチェック（Google Gemini APIからのエラーも含める）
    if (!response.ok) {
      throw new Error(data.error?.message || "Gemini APIからエラーが返されました");
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "回答が取得できませんでした。";

    return {
      statusCode: 200,
      body: JSON.stringify({ text })
    };
  } catch (error) {
    console.error("APIエラー:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({ text: `エラーが発生しました: ${error.message}` })
    };
  }
};
