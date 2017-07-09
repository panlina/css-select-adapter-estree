var $ = require('./$.js');
var syntax = require('./syntax.js').syntax;
var Syntax = require('./syntax.js').Syntax;
function js2html(js) {
	return expression(js);
	function expression(js) {
		if (js == undefined) return undefined;
		switch (js.type) {
			case 'Literal':
				return $("<literal>").append(js.raw);
				break;
			case 'Identifier':
				return $("<identifier>").append(js.name);
				break;
			case 'CallExpression':
				return $("<call>").append(
					$("<callee>").append(
						expression(js.callee)
					),
					$("<arguments>").append(
						js.arguments.map(expression)
					)
				);
				break;
			case 'MemberExpression':
				return translate(syntax.member)(js);
				break;
			case 'FunctionExpression':
				return $("<function>").append(
					$("<params>").append(
						js.params.map(expression)
					),
					$("<body>").append(
						statement(js.body)
					)
				);
				break;
			case 'UnaryExpression':
			case 'UpdateExpression':
				return translate(syntax.unary)(js);
				break;
			case 'BinaryExpression':
			case 'AssignmentExpression':
				return translate(syntax.binary)(js);
				break;
		}
	}
	function statement(js) {
		if (js == undefined) return undefined;
		switch (js.type) {
			case "ExpressionStatement":
				return $("<expression>").append(expression(js.expression));
				break;
			case "LabeledStatement":
				return statement(js.body).attr('label', js.label.name);
				break;
			case "ReturnStatement":
				return $("<return>").append(expression(js.argument));
				break;
			case "VariableDeclaration":
				return $("<var>").append(js.declarations.map(decl))
				break;
			case "BlockStatement":
				return $("<block>").append(js.body.map(statement));
				break;
			case "IfStatement":
				return translate(syntax.if)(js);
				break;
			case "WhileStatement":
				return translate(syntax.while)(js);
				break;
			case "ForStatement":
				return translate(syntax.for)(js);
				break;
		}
	}
	function decl(js) {
		return $("<decl>").append(
			$("<name>").text(js.id.name),
			$("<value>").append(expression(js.init))
		);
	}
	function translate(syntax) {
		return function (js) {
			return $('<' + syntax.name + '>').append(
				Object.keys(syntax.property).map(function (name) {
					var type = syntax.property[name] || Syntax.type(js[name]);
					return $('<' + name + '>').append({
						expression: expression,
						statement: statement,
						string: function (x) { return x.toString();},
						bool: function (x) { return x.toString();}
					}[type](js[name]));
				})
			);
		};
	}
}
module.exports = js2html;
