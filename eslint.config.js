import { configApp } from '@adonisjs/eslint-config'
export default configApp({
  rules: {
    '@typescript-eslint/explicit-function-return-type': [
      'error',
      {
        allowTypedFunctionExpressions: true,
      },
    ],
    '@typescript-eslint/naming-convention': 'off',
    'eslint-plugin-unicorn/filename-case': 'off',
  },
})
