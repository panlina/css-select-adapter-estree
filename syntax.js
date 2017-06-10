var syntax = {};
syntax.if = {
	name: 'if',
	property: {
		test: 'expression',
		consequent: 'statement',
		alternate: 'statement'
	}
};
syntax.while = {
	name: 'while',
	property: {
		test: 'expression',
		body: 'statement'
	}
};
