# ベースイメージ
FROM node:18.19.0-slim AS base
RUN apt-get update -y && apt-get install -y openssl ca-certificates

# 作業ディレクトリを作成
WORKDIR /usr/src/app

# 必要なファイルをコピー
COPY . .
COPY pnpm-workspace.yaml .
COPY turbo.json .
COPY libs ./libs
COPY apps/backend ./apps/backend
COPY apps/backend/certs/tidb_ca.pem /usr/local/share/ca-certificates/tidb-ca.crt
RUN update-ca-certificates
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

CMD ["/usr/src/app/apps/backend/entrypoint.sh"]
