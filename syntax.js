var syntax = {};
syntax.var = {
	name: 'statement',
	class: 'var',
	type: 'VariableDeclaration',
	property: {
		declarations: { type: '[]' }
	}
};
syntax.decl = {
	name: 'decl',
	type: 'VariableDeclarator',
	property: {
		id: '{}',
		init: '{}'
	}
};
syntax.func = {
	name: 'statement',
	class: 'func',
	type: 'FunctionDeclaration',
	property: {
		id: '{}',
		params: { name: 'param', type: '[]' },
		body: '{}'
	}
};
syntax.if = {
	name: 'statement',
	class: 'if',
	type: 'IfStatement',
	property: {
		test: '{}',
		consequent: '{}',
		alternate: '{}'
	}
};
syntax.while = {
	name: 'statement',
	class: 'while',
	type: 'WhileStatement',
	property: {
		test: '{}',
		body: '{}'
	}
};
syntax.for = {
	name: 'statement',
	class: 'for',
	type: 'ForStatement',
	property: {
		init: '{}',
		test: '{}',
		update: '{}',
		body: '{}'
	}
};
syntax.return = {
	name: 'statement',
	class: 'return',
	type: 'ReturnStatement',
	property: {
		argument: '{}'
	}
};
syntax.expression = {
	name: 'statement',
	class: 'expression',
	type: 'ExpressionStatement',
	property: {
		expression: '{}'
	}
};
syntax.empty = {
	name: 'statement',
	class: 'empty',
	type: 'EmptyStatement'
};
syntax.block = {
	name: 'statement',
	class: 'block',
	type: 'BlockStatement',
	property: {
		body: { type: '[]' }
	}
};
syntax.program = {
	name: 'program',
	type: 'Program',
	property: {
		body: { type: '[]' }
	}
};
syntax.literal = {
	name: 'expression',
	class: 'literal',
	type: 'Literal'
};
syntax.identifier = {
	name: 'expression',
	class: 'identifier',
	type: 'Identifier'
};
syntax.object = {
	name: 'expression',
	class: 'object',
	type: 'ObjectExpression',
	property: {
		properties: { type: '[]' }
	}
};
syntax.array = {
	name: 'expression',
	class: 'array',
	type: 'ArrayExpression',
	property: {
		elements: { type: '[]' }
	}
};
syntax.call = {
	name: 'expression',
	class: 'call',
	type: 'CallExpression',
	property: {
		callee: '{}',
		arguments: { name: 'argument', type: '[]' }
	}
};
syntax.function = {
	name: 'expression',
	class: 'function',
	type: 'FunctionExpression',
	property: {
		body: '{}',
		params: { name: 'param', type: '[]' }
	}
};
syntax.unary = {
	name: 'expression',
	class: 'unary',
	type: 'UnaryExpression',
	property: {
		argument: '{}',
		operator: 'string',
		prefix: 'bool'
	}
};
syntax.binary = {
	name: 'expression',
	class: 'binary',
	type: 'BinaryExpression',
	property: {
		left: '{}',
		right: '{}',
		operator: 'string'
	}
};
syntax.member = {
	name: 'expression',
	class: 'member',
	type: 'MemberExpression',
	property: {
		object: '{}',
		property: '{}',
		computed: 'bool'
	}
};
syntax.property = {
	name: 'property',
	type: 'Property',
	property: {
		key: '{}',
		value: '{}'
	}
};
for (var name in syntax)
	syntax[syntax[name].type] = syntax[name];
syntax.UpdateExpression = syntax.unary;
syntax.AssignmentExpression = syntax.binary;
module.exports = syntax;
