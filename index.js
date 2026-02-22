const express = require('express');
const path = require('path');
const ejs = require('ejs');
const horoscopes = require('./data/horoscopes');
const quotes = require('./data/quotes');

const app = express();
const port = 3000;

// ビューエンジンの設定
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 静的ファイルの設定
app.use(express.static(path.join(__dirname, 'public')));

// レイアウトヘルパー関数
const renderWithLayout = (view, data) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(path.join(__dirname, 'views', `${view}.ejs`), data, (err, body) => {
      if (err) return reject(err);
      ejs.renderFile(path.join(__dirname, 'views', 'layout.ejs'), {
        ...data,
        body
      }, (err, html) => {
        if (err) return reject(err);
        resolve(html);
      });
    });
  });
};

// ポータル画面
app.get('/', async (req, res) => {
  try {
    const html = await renderWithLayout('portal', {
      title: 'ポータル',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      navColor: '#667eea',
      customStyle: ''
    });
    res.send(html);
  } catch (err) {
    res.status(500).send('エラーが発生しました');
  }
});

// 日付画面
app.get('/date', async (req, res) => {
  try {
    const today = new Date();
    const dateString = today.toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
    
    const html = await renderWithLayout('date', {
      title: '今日の日付',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      navColor: '#667eea',
      customStyle: '',
      dateString
    });
    res.send(html);
  } catch (err) {
    res.status(500).send('エラーが発生しました');
  }
});

// 星座占い画面
app.get('/horoscope', async (req, res) => {
  try {
    const today = new Date();
    const signParam = req.query.sign;
    
    let index;
    if (signParam !== undefined && signParam !== '') {
      index = parseInt(signParam);
    } else {
      index = today.getDate() % horoscopes.length;
    }
    
    const todayHoroscope = horoscopes[index];
    
    const html = await renderWithLayout('horoscope', {
      title: '今日の星座占い',
      background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      navColor: '#f5576c',
      customStyle: '',
      horoscope: todayHoroscope,
      allHoroscopes: horoscopes,
      selectedIndex: index
    });
    res.send(html);
  } catch (err) {
    res.status(500).send('エラーが発生しました');
  }
});

// 偉人の名言画面
app.get('/quote', async (req, res) => {
  try {
    const today = new Date();
    const isRandom = req.query.random === 'true';
    
    let index;
    if (isRandom) {
      index = Math.floor(Math.random() * quotes.length);
    } else {
      index = today.getDate() % quotes.length;
    }
    
    const todayQuote = quotes[index];
    
    const html = await renderWithLayout('quote', {
      title: '偉人の名言',
      background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
      navColor: '#00f2fe',
      customStyle: '',
      quote: todayQuote
    });
    res.send(html);
  } catch (err) {
    res.status(500).send('エラーが発生しました');
  }
});

// 404エラーハンドリング
app.use(async (req, res) => {
  try {
    const html = await renderWithLayout('404', {
      title: '404 - ページが見つかりません',
      background: 'linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)',
      navColor: '#e74c3c',
      customStyle: ''
    });
    res.status(404).send(html);
  } catch (err) {
    res.status(404).send('ページが見つかりません');
  }
});

app.listen(port, '0.0.0.0', () => {
  console.log(`サーバーが起動しました: http://localhost:${port}`);
});
