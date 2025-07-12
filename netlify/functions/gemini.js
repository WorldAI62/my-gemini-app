import fetch from "node-fetch";

export default async function handler(event) {
  const { prompt } = JSON.parse(event.body);

  const apiKey = "AIzaSyA6mTy2kqtjQgHmGozsQ6XS3XcIIZrA42o"; // ここに直書きOK

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
            parts: [{ text: prompt }]
          }
        ]
      })
    }
  );

  const result = await response.json();

  const text =
    result?.candidates?.[0]?.content?.parts?.[0]?.text || "回答がありません。";

  return {
    statusCode: 200,
    body: JSON.stringify({ result: text })
  };
}
