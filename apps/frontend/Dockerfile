# ベースイメージ
FROM node:18.19.0-slim AS base
WORKDIR /usr/src/app

# 必要なファイルをコピー
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml turbo.json ./
COPY apps/frontend/package.json apps/frontend/
COPY libs ./libs

# pnpm をインストール
RUN npm install -g pnpm@9.15.4

# 依存関係のインストール（キャッシュを活用）
RUN pnpm install --frozen-lockfile

# ソースコードをコピー
COPY . .

# フロントエンドのビルド
RUN pnpm run build --filter ./apps/frontend

# Production Image
FROM node:18.19.0-slim
WORKDIR /usr/src/app

# ビルド成果物のみコピー
COPY --from=base /usr/src/app/apps/frontend/dist /usr/src/app/dist

# `serve` をインストール
RUN npm install -g serve

# ポートを開放
EXPOSE 8080

# `serve` で静的ファイルを提供
CMD ["serve", "-s", "dist", "-l", "8080"]
