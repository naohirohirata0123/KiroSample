const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://kirosample:password@localhost:5432/kirosample',
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

// データベース初期化（リトライ機能付き）
async function initDatabase(retries = 5, delay = 2000) {
  for (let i = 0; i < retries; i++) {
    try {
      const client = await pool.connect();
      try {
        await client.query(`
          CREATE TABLE IF NOT EXISTS favorites (
            id SERIAL PRIMARY KEY,
            type VARCHAR(20) NOT NULL,
            content TEXT NOT NULL,
            author VARCHAR(255),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            likes INTEGER DEFAULT 1
          )
        `);
        
        await client.query(`
          CREATE INDEX IF NOT EXISTS idx_favorites_type ON favorites(type)
        `);
        
        await client.query(`
          CREATE INDEX IF NOT EXISTS idx_favorites_created_at ON favorites(created_at DESC)
        `);
        
        console.log('Database initialized successfully');
        return;
      } finally {
        client.release();
      }
    } catch (err) {
      console.error(`Database connection attempt ${i + 1}/${retries} failed:`, err.message);
      if (i < retries - 1) {
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error('Failed to initialize database after all retries');
        throw err;
      }
    }
  }
}

// お気に入り追加
async function addFavorite(type, content, author = null) {
  const client = await pool.connect();
  try {
    // 既存のお気に入りをチェック
    const existing = await client.query(
      'SELECT id, likes FROM favorites WHERE type = $1 AND content = $2',
      [type, content]
    );
    
    if (existing.rows.length > 0) {
      // 既存の場合はいいね数を増やす
      const result = await client.query(
        'UPDATE favorites SET likes = likes + 1 WHERE id = $1 RETURNING *',
        [existing.rows[0].id]
      );
      return result.rows[0];
    } else {
      // 新規追加
      const result = await client.query(
        'INSERT INTO favorites (type, content, author) VALUES ($1, $2, $3) RETURNING *',
        [type, content, author]
      );
      return result.rows[0];
    }
  } finally {
    client.release();
  }
}

// お気に入り一覧取得
async function getFavorites(type = null, limit = 50) {
  const client = await pool.connect();
  try {
    let query = 'SELECT * FROM favorites';
    let params = [];
    
    if (type) {
      query += ' WHERE type = $1';
      params.push(type);
    }
    
    query += ' ORDER BY likes DESC, created_at DESC LIMIT $' + (params.length + 1);
    params.push(limit);
    
    const result = await client.query(query, params);
    return result.rows;
  } finally {
    client.release();
  }
}

// お気に入り削除
async function deleteFavorite(id) {
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM favorites WHERE id = $1', [id]);
  } finally {
    client.release();
  }
}

// 統計情報取得
async function getStats() {
  const client = await pool.connect();
  try {
    const result = await client.query(`
      SELECT 
        type,
        COUNT(*) as count,
        SUM(likes) as total_likes
      FROM favorites
      GROUP BY type
    `);
    return result.rows;
  } finally {
    client.release();
  }
}

module.exports = {
  pool,
  initDatabase,
  addFavorite,
  getFavorites,
  deleteFavorite,
  getStats
};
