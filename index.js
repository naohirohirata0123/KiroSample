const express = require('express');
const app = express();
const port = 3000;

const horoscopes = [
  { sign: '牡羊座', fortune: '新しいチャレンジに最適な日です', lucky: 'ラッキーカラー: 赤' },
  { sign: '牡牛座', fortune: '落ち着いて行動すれば良い結果が得られます', lucky: 'ラッキーカラー: 緑' },
  { sign: '双子座', fortune: 'コミュニケーションが鍵となる日です', lucky: 'ラッキーカラー: 黄色' },
  { sign: '蟹座', fortune: '家族との時間を大切にしましょう', lucky: 'ラッキーカラー: 白' },
  { sign: '獅子座', fortune: '自信を持って行動すれば成功します', lucky: 'ラッキーカラー: 金色' },
  { sign: '乙女座', fortune: '細かい部分に注意を払うと良いでしょう', lucky: 'ラッキーカラー: 青' },
  { sign: '天秤座', fortune: 'バランスを保つことが重要です', lucky: 'ラッキーカラー: ピンク' },
  { sign: '蠍座', fortune: '直感を信じて行動しましょう', lucky: 'ラッキーカラー: 紫' },
  { sign: '射手座', fortune: '冒険心が幸運を呼び込みます', lucky: 'ラッキーカラー: オレンジ' },
  { sign: '山羊座', fortune: '計画的に進めることで成果が出ます', lucky: 'ラッキーカラー: 茶色' },
  { sign: '水瓶座', fortune: '独創的なアイデアが評価されます', lucky: 'ラッキーカラー: 水色' },
  { sign: '魚座', fortune: '感性を大切にすると良い日です', lucky: 'ラッキーカラー: 銀色' }
];

const quotes = [
  { author: 'アルベルト・アインシュタイン', quote: '想像力は知識よりも重要である' },
  { author: 'スティーブ・ジョブズ', quote: 'Stay hungry, stay foolish' },
  { author: '孔子', quote: '学びて思わざれば則ち罔し、思いて学ばざれば則ち殆し' },
  { author: 'ガンジー', quote: '明日死ぬかのように生きよ。永遠に生きるかのように学べ' },
  { author: 'ヘレン・ケラー', quote: '人生は勇気ある冒険か、無か、そのどちらかである' },
  { author: 'ウォルト・ディズニー', quote: '夢を求め続ける勇気さえあれば、すべての夢は必ず実現できる' },
  { author: 'ネルソン・マンデラ', quote: '生まれたときから、肌の色や育ちや宗教で他人を憎む人などいない' },
  { author: 'マザー・テレサ', quote: '愛は、大きな愛情をもって小さなことをすることです' }
];

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>ポータル</title>
        <style>
          body {
            font-family: sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          .container {
            background: white;
            padding: 50px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            text-align: center;
            max-width: 800px;
          }
          h1 {
            color: #333;
            margin: 0 0 40px 0;
            font-size: 36px;
          }
          .menu {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-top: 30px;
          }
          .menu-item {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 30px 20px;
            border-radius: 10px;
            text-decoration: none;
            color: white;
            font-size: 20px;
            font-weight: bold;
            transition: transform 0.3s, box-shadow 0.3s;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
          }
          .menu-item:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0,0,0,0.3);
          }
          .menu-item.date {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          }
          .menu-item.horoscope {
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          }
          .menu-item.quote {
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          }
          .icon {
            font-size: 40px;
            margin-bottom: 10px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🌟 ポータル 🌟</h1>
          <p style="color: #666; font-size: 18px;">見たいページを選んでください</p>
          <div class="menu">
            <a href="/date" class="menu-item date">
              <div class="icon">📅</div>
              <div>今日の日付</div>
            </a>
            <a href="/horoscope" class="menu-item horoscope">
              <div class="icon">⭐</div>
              <div>星座占い</div>
            </a>
            <a href="/quote" class="menu-item quote">
              <div class="icon">💭</div>
              <div>偉人の名言</div>
            </a>
          </div>
        </div>
      </body>
    </html>
  `);
});

app.get('/date', (req, res) => {
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
          .nav {
            margin-top: 20px;
          }
          .nav a {
            margin: 0 10px;
            color: #667eea;
            text-decoration: none;
            font-weight: bold;
          }
          .nav a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>今日の日付</h1>
          <p style="font-size: 24px; color: #667eea;">${dateString}</p>
          <div class="nav">
            <a href="/">ホーム</a>
            <a href="/horoscope">星座占い</a>
            <a href="/quote">偉人の名言</a>
          </div>
        </div>
      </body>
    </html>
  `);
});

app.get('/horoscope', (req, res) => {
  const today = new Date();
  const index = today.getDate() % horoscopes.length;
  const todayHoroscope = horoscopes[index];
  
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>今日の星座占い</title>
        <style>
          body {
            font-family: sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          }
          .container {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            text-align: center;
            max-width: 500px;
          }
          h1 {
            color: #333;
            margin: 0 0 20px 0;
          }
          .sign {
            font-size: 32px;
            color: #f5576c;
            margin: 20px 0;
          }
          .fortune {
            font-size: 18px;
            color: #555;
            margin: 15px 0;
          }
          .lucky {
            font-size: 16px;
            color: #888;
            margin: 10px 0;
          }
          .nav {
            margin-top: 30px;
          }
          .nav a {
            margin: 0 10px;
            color: #f5576c;
            text-decoration: none;
            font-weight: bold;
          }
          .nav a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>今日の星座占い</h1>
          <div class="sign">${todayHoroscope.sign}</div>
          <div class="fortune">${todayHoroscope.fortune}</div>
          <div class="lucky">${todayHoroscope.lucky}</div>
          <div class="nav">
            <a href="/">ホーム</a>
            <a href="/date">今日の日付</a>
            <a href="/quote">偉人の名言</a>
          </div>
        </div>
      </body>
    </html>
  `);
});

app.get('/quote', (req, res) => {
  const today = new Date();
  const index = today.getDate() % quotes.length;
  const todayQuote = quotes[index];
  
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>偉人の名言</title>
        <style>
          body {
            font-family: sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
          }
          .container {
            background: white;
            padding: 40px;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            text-align: center;
            max-width: 600px;
          }
          h1 {
            color: #333;
            margin: 0 0 30px 0;
          }
          .quote {
            font-size: 24px;
            color: #555;
            font-style: italic;
            margin: 20px 0;
            line-height: 1.6;
          }
          .author {
            font-size: 18px;
            color: #00f2fe;
            margin: 20px 0;
            font-weight: bold;
          }
          .nav {
            margin-top: 30px;
          }
          .nav a {
            margin: 0 10px;
            color: #00f2fe;
            text-decoration: none;
            font-weight: bold;
          }
          .nav a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>偉人の名言</h1>
          <div class="quote">"${todayQuote.quote}"</div>
          <div class="author">- ${todayQuote.author}</div>
          <div class="nav">
            <a href="/">ホーム</a>
            <a href="/date">今日の日付</a>
            <a href="/quote">偉人の名言</a>
          </div>
        </div>
      </body>
    </html>
  `);
});

app.listen(port, '0.0.0.0', () => {
  console.log(`サーバーが起動しました: http://localhost:${port}`);
});
