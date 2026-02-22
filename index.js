const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  const today = new Date();
  const dateString = today.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });
  
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>今日の日付</title>
        <style>
          body {
            font-family: sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          .container {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            text-align: center;
          }
          h1 {
            color: #333;
            margin: 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>今日の日付</h1>
          <p style="font-size: 24px; color: #667eea;">${dateString}</p>
        </div>
      </body>
    </html>
  `);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`サーバーが起動しました: http://localhost:${port}`);
});
