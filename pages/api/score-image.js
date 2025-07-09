// pages/api/score-image.js

export default async function handler(req, res) {
  const { score = 0 } = req.query;

  const svg = `
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="630" fill="#ff69b4"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="72" fill="#fff">
        You have ${score} points!
      </text>
    </svg>
  `;

  res.setHeader("Content-Type", "image/svg+xml");
  res.status(200).send(svg);
}

