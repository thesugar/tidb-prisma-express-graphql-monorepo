# ベースイメージ
FROM node:18.19.0-slim AS base

# 作業ディレクトリを作成
WORKDIR /usr/src/app

RUN ls -R

# 必要なファイルをコピー
COPY . .
COPY pnpm-workspace.yaml .
COPY turbo.json .
COPY libs ./libs
COPY apps/backend ./apps/backend
RUN chmod +x /usr/src/app/apps/backend/entrypoint.sh

# 必要なpnpmバージョンをインストール
RUN npm install -g pnpm@9.15.4

RUN pnpm install --frozen-lockfile

WORKDIR /usr/src/app/apps/backend
RUN npx prisma generate

# アプリケーションのビルド
WORKDIR /usr/src/app
RUN pnpm run build --filter ./apps/backend && echo "Build completed successfully" || echo "Build failed"

# ポートを開放
EXPOSE 5050

# CMD を entrypoint.sh に変更
CMD ["/usr/src/app/entrypoint.sh"]
