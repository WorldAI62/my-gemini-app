const fetch = require("node-fetch");

const apiKey = "あなたのAPIキー";

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
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  const result = await response.json();

  // 👇この1行だけ追加（ログ表示用）
  console.log("Gemini API response:", result);

  const text =
    result.candidates?.[0]?.content?.parts?.[0]?.text || "回答がありません。";

  return {
    statusCode: 200,
    body: JSON.stringify({ result: text }),
  };
};
