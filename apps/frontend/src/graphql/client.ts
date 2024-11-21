import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:5050/graphql', // GraphQL サーバーのエンドポイント
  cache: new InMemoryCache(),          // キャッシュの設定
});

export default client;
