var syntax = {};
syntax.var = {
	name: 'var',
	type: 'VariableDeclaration'
};
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
syntax.for = {
	name: 'for',
	type: 'ForStatement',
	property: {
		init: null,
		test: 'expression',
		update: 'expression',
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
syntax.member = {
	name: 'member',
	type: 'MemberExpression',
	property: {
		object: 'expression',
		property: 'expression',
		computed: 'bool'
	}
};
var Syntax = {};
Syntax.type = function (jshtml) {
	var type = jshtml instanceof $ ?
		syntax[jshtml[0].tagName.toLowerCase()].type :
		jshtml.type;
	return endsWith(type, "Declaration") || endsWith(type, "Statement") ?
		'statement' : 'expression';
	function endsWith(s, t) {
		return s.lastIndexOf(t) + t.length == s.length;
	}
};
