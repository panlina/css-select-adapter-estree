var $ = require('./$.js');
var syntax = require('./syntax.js').syntax;
var Syntax = require('./syntax.js').Syntax;
function js2html(js) {
	if (js == undefined) return undefined;
	switch (js.type) {
		case 'Literal':
			return $("<literal>").text(js.raw);
			break;
		case 'Identifier':
			return $("<identifier>").append(js.name);
			break;
		case 'CallExpression':
			return $("<call>").append(
				$("<callee>").append(
					js2html(js.callee)
				),
				$("<arguments>").append(
					js.arguments.map(js2html)
				)
			);
			break;
		case 'MemberExpression':
			return translate(syntax.member)(js);
			break;
		case 'FunctionExpression':
			return $("<function>").append(
				$("<params>").append(
					js.params.map(js2html)
				),
				$("<body>").append(
					js2html(js.body)
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
		case "ExpressionStatement":
			return $("<expression>").append(js2html(js.expression));
			break;
		case "LabeledStatement":
			return js2html(js.body).attr('label', js.label.name);
			break;
		case "ReturnStatement":
			return $("<return>").append(js2html(js.argument));
			break;
		case "VariableDeclaration":
			return $("<var>").append(js.declarations.map(js2html))
			break;
		case "VariableDeclarator":
			return translate(syntax.decl)(js);
			break;
		case "BlockStatement":
			return $("<block>").append(js.body.map(js2html));
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
	function translate(syntax) {
		return function (js) {
			return $('<' + syntax.name + '>').append(
				Object.keys(syntax.property).map(function (name) {
					var type = syntax.property[name] || Syntax.type(js[name]);
					return $('<' + name + '>').append({
						expression: js2html,
						statement: js2html,
						string: function (x) { return x.toString();},
						bool: function (x) { return x.toString();}
					}[type](js[name]));
				})
			);
		};
	}
}
module.exports = js2html;
