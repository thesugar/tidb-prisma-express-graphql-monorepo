import { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: 'schemas/**/*.graphql',
  documents: 'schemas/(queries|mutations)/*.graphql', // フロントエンドで使うクエリ・ミューテーション
  generates: {
    './dist/index.ts': { // 型定義ファイル
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
    './dist/fragment.json': {
      plugins: ['fragment-matcher'],
    },
    './dist/schema.json': {
      plugins: ['introspection'],
    },
    './dist/schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
      },
    },
    './dist/resolvers.ts': {
      plugins: [
        "typescript",
        "typescript-resolvers"
      ]
    }
  },
  hooks: {
    afterAllFileWrite: ['prettier --write'], // ファイル生成後に Prettier を適用
  },
  overwrite: true, // 既存ファイルを上書き
};

export default config;
