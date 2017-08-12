var $ = require('./$.js');
var syntax = require('./syntax.js').syntax;
var Syntax = require('./syntax.js').Syntax;
function html2js(html) {
	if (html[0] == undefined) return undefined;
	var js;
	switch (html[0].tagName) {
		case 'literal':
			js = {
				type: 'Literal',
				value: eval(html.text())
			}
			break;
		case 'identifier':
			js = {
				type: 'Identifier',
				name: html.text()
			};
			break;
		case 'call':
			js = {
				type: 'CallExpression',
				callee: html2js(html.children('callee').children()),
				arguments: html.children('arguments').children().map(function () { return html2js($(this)); })
			};
			break;
		case 'member':
			js = translate(syntax.member)(html);
			break;
		case 'function':
			js = {
				type: 'FunctionExpression',
				params: html.children('params').children().map(function () { return html2js($(this)); }),
				body: html2js(html.children('body').children())
			};
			break;
		case 'unary':
			js = translate(syntax.unary)(html);
			if (js.operator == '++' || js.operator == '--')
				js.type = 'UpdateExpression';
			break;
		case 'binary':
			js = translate(syntax.binary)(html);
			break;
		case 'array':
			js = {
				type: 'ArrayExpression',
				elements: html.children().map(function () { return html2js($(this)); })
			};
			break;
		case 'object':
			js = {
				type: 'ObjectExpression',
				properties: html.children().map(function () { return html2js($(this)); })
			};
			break;
		case 'property':
			js = translate(syntax.property)(html);
			break;
		case 'program':
			js = {
				type: 'Program',
				body: html.children().map(function () { return html2js($(this)); })
			};
			break;
		case 'expression':
			js = {
				type: 'ExpressionStatement',
				expression: html2js(html.children())
			};
			break;
		case 'return':
			js = {
				type: 'ReturnStatement',
				argument: html2js(html.children())
			};
			break;
		case 'var':
			js = {
				type: 'VariableDeclaration',
				kind: 'var',
				declarations: html.children().map(function () { return html2js($(this)); })
			};
			break;
		case 'decl':
			js = translate(syntax.decl)(html);
			break;
		case 'func':
			js = {
				type: 'FunctionDeclaration',
				id: html2js(html.children('id').children()),
				params: html.children('params').children().map(function () { return html2js($(this)); }),
				body: html2js(html.children('body').children())
			};
			break;
		case 'block':
			js = {
				type: 'BlockStatement',
				body: html.children().map(function () { return html2js($(this)); })
			};
			break;
		case 'if':
			js = translate(syntax.if)(html);
			break;
		case 'while':
			js = translate(syntax.while)(html);
			break;
		case 'for':
			js = translate(syntax.for)(html);
			break;
	}
	var label = html.attr('label');
	if (label)
		js = {
			type: 'LabeledStatement',
			label: { type: 'Identifier', name: label },
			body: js
		};
	return js;
	function translate(syntax) {
		return function (html) {
			var js = {};
			js.type = syntax.type;
			for (var name in syntax.property) {
				var type = syntax.property[name] || Syntax.type(html.children(name).children());
				js[name] = {
					expression: html2js,
					statement: html2js,
					string: function (x) { return x.text(); },
					bool: function (x) { return x.text() != 'false'; }
				}[type](html.children(name).contents())
			};
			return js;
		};
	}
}
module.exports = html2js;
