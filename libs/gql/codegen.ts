import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'schemas/**/*.graphql',
  documents: '../../apps/frontend/src/**/*.graphql', // フロントエンドで使うクエリ・ミューテーション
  generates: {
    './generated/index.ts': { // 型定義ファイル
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
      ],
      config: {
        enumsAsTypes: true, // EnumをTypeScript型で出力
        enumPrefix: false,
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
