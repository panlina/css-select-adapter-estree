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
syntax.unary = {
	name: 'unary',
	property: {
		argument: 'expression',
		operator: 'string',
		prefix: 'bool'
	}
};
syntax.binary = {
	name: 'binary',
	property: {
		left: 'expression',
		right: 'expression',
		operator: 'string'
	}
};
