FROM node:18-alpine

WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションコードをコピー
COPY data ./data
COPY views ./views
COPY public ./public
COPY index.js ./
COPY db.js ./

EXPOSE 3000

CMD ["npm", "start"]
