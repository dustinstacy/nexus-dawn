import { FlatCompat } from '@eslint/eslintrc'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
	baseDirectory: __dirname
})

export default [
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	{
		rules: {
			'@next/next/no-img-element': 'off',
			'react-hooks/exhaustive-deps': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-expressions': [
				'warn',
				{ allowShortCircuit: true, allowTernary: true }
			]
		}
	},
	eslintConfigPrettier
]
