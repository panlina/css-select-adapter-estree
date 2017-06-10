var syntax = {};
syntax.if = {
	name: 'if',
	type: 'IfStatement',
	property: {
		test: 'expression',
		consequent: 'statement',
		alternate: 'statement'
	}
};
syntax.while = {
	name: 'while',
	type: 'WhileStatement',
	property: {
		test: 'expression',
		body: 'statement'
	}
};
syntax.unary = {
	name: 'unary',
	type: 'UnaryExpression',
	property: {
		argument: 'expression',
		operator: 'string',
		prefix: 'bool'
	}
};
syntax.binary = {
	name: 'binary',
	type: 'BinaryExpression',
	property: {
		left: 'expression',
		right: 'expression',
		operator: 'string'
	}
};
