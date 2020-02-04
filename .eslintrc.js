module.exports = {
	root: true,

	env: {
		"browser": true,
		"amd"    : true,
		"node"   : true
	},

	parserOptions: {
		parser     : 'babel-eslint',
		ecmaVersion: 8,
		sourceType : 'module'
	},

	extends: [],

	plugins: [
		'import'
	],

	'extends': [
		'eslint:recommended'
	],

	globals: {
		'__env__'              : 'readonly',
		'__redis__'            : 'readonly',
		'__redisSessionStore__': 'readonly'
	},

	// add your custom rules here
	rules: {
		// allow async-await
		'generator-star-spacing': 'off',
		// allow paren-less arrow functions
		'arrow-parens': 0,
		'one-var': 0,

		'quote-props': ['error', 'consistent'],
		'no-tabs': 0,
		'semi': ['error', 'never'],
		'spaced-comment': 0,
		'no-extra-boolean-cast': 0,
		'space-before-function-paren': 0,
		'space-infix-ops': 0,
		'padded-blocks': 0,
		'no-useless-call': 0,
		'standard/no-callback-literal': 0,
		'no-multiple-empty-lines': ["error", { "max": 2, "maxEOF": 1 }],
		'indent': ['error', 'tab', { "SwitchCase": 1 }],
		'key-spacing': ['error', { 'align': 'colon' }],
		'eol-last': ["error", "always"],
		'import/first': 0,
		'import/named': 2,
		'import/namespace': 2,
		'import/default': 2,
		'import/export': 2,
		'import/extensions': 0,
		'import/no-unresolved': 0,
		'import/no-extraneous-dependencies': 0,

		// allow console.log during development only
		'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
		// allow debugger during development only
		'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
	}
}
