import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: import.meta.env.VITE_BACKEND_URL, // GraphQL サーバーのエンドポイント
  cache: new InMemoryCache(),          // キャッシュの設定
});

export default client;
