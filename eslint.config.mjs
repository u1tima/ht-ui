import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginTs from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import withNuxt from './.nuxt/eslint.config.mjs';

const globalIgnores = {
	ignores: [
		'**/node_modules/*',
		'**/tests/coverage/*',
		'**/public/*',
		'**/dist/*',
	],
};

const globalRules = {
	rules: {
		'eol-last': 'error',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-var': 'error',
		semi: ['error', 'always'],
		'no-extra-semi': 'error',
		quotes: ['error', 'single'],
		'brace-style': ['error'],
		'comma-dangle': [
			'error',
			{
				arrays: 'always-multiline',
				objects: 'always-multiline',
				imports: 'always-multiline',
				exports: 'always-multiline',
				functions: 'never',
			},
		],
		'comma-spacing': ['error', { before: false, after: true }],
		'comma-style': ['error', 'last'],
		'computed-property-spacing': ['error', 'never'],
		'func-call-spacing': ['error', 'never'],
		'max-params': ['error', 4],
		'require-await': 'error',
		'space-before-function-paren': [
			'error',
			{
				anonymous: 'always',
				named: 'never',
				asyncArrow: 'always',
			},
		],
		'operator-linebreak': ['error', 'before'],
		'quote-props': ['error', 'as-needed'],
	},
};

const tsConfig = [
	...pluginTs.configs.strict,
	{
		files: ['**/*.ts'],
		rules: {
			'@typescript-eslint/naming-convention': [
				'error',
				{
					selector: 'interface',
					format: ['PascalCase'],
					custom: {
						regex: '^I[A-Z]',
						match: true,
					},
				},
			],
			'@typescript-eslint/no-unused-vars': ['error'],
			'@typescript-eslint/no-use-before-define': ['error', { functions: false }],
			semi: ['error', 'always'],
		},
	},
];

const vueConfig = [
	...pluginVue.configs['flat/recommended'],
	{
		files: ['**/*.vue'],
		languageOptions: {
			parserOptions: {
				parser: pluginTs.parser,
			},
		},
		rules: {
			// indent: 'off',
			semi: ['error', 'always'],
			'vue/html-indent': 'off',
			'vue/script-indent': 'off',
			'vue/html-closing-bracket-newline': [
				'error',
				{
					singleline: 'never',
					multiline: 'never',
					selfClosingTag: {
						singleline: 'never',
						multiline: 'never',
					},
				},
			],
			'vue/component-definition-name-casing': ['error', 'PascalCase'],
			'vue/prop-name-casing': ['error', 'camelCase'],
			'vue/attribute-hyphenation': ['error', 'always'],
			'vue/order-in-components': ['error'],
			'vue/max-attributes-per-line': ['error', {
				singleline: {
					max: 1,
				},
				multiline: {
					max: 1,
				},
			}],
			'vue/no-v-html': 'off',
			'vue/first-attribute-linebreak': ['error', {
				singleline: 'beside',
				multiline: 'beside',
			}],
			// TODO vue/attributes-order rule can't order attributes by our guidelines. Need to create own plugin.
			'vue/attributes-order': 'off',
			// 'vue/attributes-order': ['error', {
			//     'order': [
			//         'DEFINITION',
			//         'LIST_RENDERING',
			//         'CONDITIONALS',
			//         'CONTENT',
			//         'RENDER_MODIFIERS',
			//         'SLOT',
			//         'OTHER_DIRECTIVES',
			//         'TWO_WAY_BINDING',
			//         'OTHER_ATTR',
			//         'GLOBAL',
			//         'UNIQUE',
			//         'EVENTS',
			//     ],
			//     'alphabetical': false,
			// }],
			'vue/v-slot-style': ['error', {
				atComponent: 'longform',
				default: 'longform',
				named: 'longform',
			}],
			'vue/component-name-in-template-casing': [
				'error',
				'PascalCase',
				{
					registeredComponentsOnly: false,
					ignores: [],
				}],
			'vue/no-mutating-props': ['error', {
				shallowOnly: true,
			}],
			'vue/no-multiple-template-root': ['off', {
				disallowComments: false,
			}],
		},
	},
];

const overrides = [
	{
		rules: {
			'@typescript-eslint/no-require-imports': 'off', // TODO Update after migration to ESModules
			'vue/multi-word-component-names': 'off', // TODO Update component names and enable this rule
		},
	},
	{
		files: ['**/*.d.ts'],
		rules: {
			'@typescript-eslint/interface-name-prefix': 'off',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unused-vars': 'off',
			'@typescript-eslint/naming-convention': 'off',
		},
	},
	{
		files: ['**/jest-setup.js'],
		languageOptions: {
			globals: {
				jest: 'readonly',
			},
		},
	},
];

export default withNuxt([
	globalIgnores,
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
	},
	pluginJs.configs.recommended,
	globalRules,
	...tsConfig,
	...vueConfig,
	...overrides,
]);
