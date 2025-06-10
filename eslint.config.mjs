import { FlatCompat } from '@eslint/eslintrc'
import prettierConfig from 'eslint-config-prettier/flat'

import prettierImportPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname
})

const eslintConfig = [
	...compat.extends('next/core-web-vitals', 'next/typescript'),

	// Ignore variables that start with an underscore
	{
		files: ['**/*.ts', '**/*.tsx'],
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					argsIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					caughtErrorsIgnorePattern: '^_'
				}
			]
		}
	},

	// Enforce import rules
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		plugins: {
			import: prettierImportPlugin
		},
		settings: {
			'import/resolver': {
				typescript: true,
				node: true
			}
		},
		rules: {
			'import/no-unresolved': 'error',
			'import/first': 'error',
			'import/order': [
				'error',
				{
					groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
					'newlines-between': 'always',
					alphabetize: { order: 'asc', caseInsensitive: true }
				}
			]
		}
	},

	// Prettier configuration - MUST COME LAST!
	{
		files: ['**/*.{js,jsx,ts,tsx}'],
		plugins: {
			prettier: prettierPlugin
		},
		rules: {
			...prettierConfig.rules,
			'prettier/prettier': 'error',
			'@next/next/no-img-element': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-expressions': [
				'warn',
				{ allowShortCircuit: true, allowTernary: true }
			]
		}
	},

	// Ignore specific directories
	{
		ignores: ['.next/', 'node_modules/']
	}
]

export default eslintConfig
