# ベースイメージ
FROM node:18.19.0-slim AS base

# 作業ディレクトリを作成
WORKDIR /usr/src/app

# 必要なファイルをコピー
COPY . .
COPY pnpm-workspace.yaml .
COPY libs ./libs
COPY apps/backend ./apps/backend

# 必要なpnpmバージョンをインストール
RUN npm install -g pnpm@9.15.4

# `pnpm install` を実行
RUN pnpm install --frozen-lockfile

# アプリケーションのビルド（必要なら）
RUN pnpm run build --filter ./apps/backend && echo "Build completed successfully" || echo "Build failed"

RUN ls -la apps/backend/dist || echo "Directory not found or empty"

# ポートを開放
EXPOSE 5050

# アプリケーションを起動
CMD ["node", "./apps/backend/dist/index.js"]
#CMD ["pnpm", "run", "start", "--filter", "./apps/backend"]
