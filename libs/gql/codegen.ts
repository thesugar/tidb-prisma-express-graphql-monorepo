import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'schemas/**/*.graphql',
  documents: '../../apps/frontend/src/**/*.graphql', // フロントエンドで使うクエリ・ミューテーション
  generates: {
    './generated/types.ts': { // 型定義ファイル
      plugins: [
        'typescript',
        'typescript-operations',
      ],
      config: {
        enumsAsTypes: true, // EnumをTypeScript型で出力
        enumPrefix: false,
      }
    },
    './generated/hooks.tsx': { // React Apolloフック
      plugins: [
        'typescript-react-apollo',
      ],
      config: { 
        withHooks: true,
      } 
    },
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'], // ファイル生成後に Prettier を適用
  },
  overwrite: true, // 既存ファイルを上書き
};

export default config;
