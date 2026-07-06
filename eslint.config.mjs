// @ts-check
import { defineConfig } from 'eslint/config';
import { plugin, parser } from 'typescript-eslint';
import { tsPlugin, processInlineTemplates, templateParser, templatePlugin } from 'angular-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
  {
    files: ['**/*.ts'],
      plugins: {
      '@typescript-eslint': plugin,
      '@angular-eslint': tsPlugin,
      'prettier': eslintPluginPrettier,
    },
    processor: processInlineTemplates,
    languageOptions: {
      parser: parser,
      parserOptions: {
        project: ['tsconfig.json', 'tsconfig.app.json'], 
      },
    },
    rules: {
      
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error']
        }
      ],
      'padded-blocks': [
        'error',
        {
          classes: 'always',
        },
      ],
      'quotes': [
        'warn',
        'single',
        {
          avoidEscape: true,
        },
      ],
      'semi': [
        'warn',
        'always'
      ],
      'object-curly-spacing': [
        'warn',
        'always'
      ],
      'lines-between-class-members': [
        'error',
        'always',
        {
          exceptAfterSingleLine: true
        }
      ],
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'no-public',
        },
      ],
      'template-curly-spacing': [
        'warn',
        'always'
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'enumMember',
          format: ['UPPER_CASE'],
          custom: {
            regex: '^[^_]',
            match: true,
          },
        },
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: true,
          },
        },
        {
          selector: [
            'objectLiteralProperty', 
            'typeProperty'
          ],
          format: null,
        },
      ],
      'prettier/prettier': [
        'error',
        {
          tabWidth: 2,
          singleQuote: true,
          semi: true
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    languageOptions: {
      parser: templateParser,
    },
    plugins: {
      '@angular-eslint/template': templatePlugin,
    },
    rules: {
      '@angular-eslint/template/banana-in-box': 'error',
      '@angular-eslint/template/eqeqeq': [
        'warn',
        {
          allowNullOrUndefined: true,
        },
      ],
      '@angular-eslint/template/prefer-self-closing-tags': 'error',
    },
  },
]);
