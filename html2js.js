function html2js(html) {
	return expression(html);
	function expression(html) {
		if (html[0] == undefined) return undefined;
		switch (html[0].tagName) {
			case 'LITERAL':
				return {
					type: 'Literal',
					value: eval(html.html())
				}
				break;
			case 'IDENTIFIER':
				return {
					type: 'Identifier',
					name: html.html()
				};
				break;
			case 'CALL':
				return {
					type: 'CallExpression',
					callee: expression(html.children('callee').children()),
					arguments: html.children('arguments').children().map(function () { return expression($(this)); })
				};
				break;
			case 'MEMBER':
				return translate(syntax.member)(html);
				break;
			case 'FUNCTION':
				return {
					type: 'FunctionExpression',
					params: html.children('params').children().map(function () { return expression($(this)); }),
					body: statement(html.children('body').children())
				};
				break;
			case 'UNARY':
				var js = translate(syntax.unary)(html);
				if (js.operator == '++' || js.operator == '--')
					js.type = 'UpdateExpression';
				return js;
				break;
			case 'BINARY':
				return translate(syntax.binary)(html);
				break;
		}
	}
	function statement(html) {
		if (html[0] == undefined) return undefined;
		switch (html[0].tagName) {
			case 'EXPRESSION':
				return {
					type: 'ExpressionStatement',
					expression: expression(html.children())
				};
				break;
			case 'RETURN':
				return {
					type: 'ReturnStatement',
					argument: expression(html.children())
				};
				break;
			case 'VAR':
				return {
					type: 'VariableDeclaration',
					kind: 'var',
					declarations: html.children().map(function () { return decl($(this)); })
				};
				break;
			case 'BLOCK':
				return {
					type: 'BlockStatement',
					body: html.children().map(function () { return statement($(this)); })
				};
				break;
			case 'IF':
				return translate(syntax.if)(html);
			case 'WHILE':
				return translate(syntax.while)(html);
				break;
			case 'FOR':
				return translate(syntax.for)(html);
				break;
		}
	}
	function decl(html) {
		return {
			type: 'VariableDeclarator',
			id: { type: 'Identifier', name: html.children('name').html() },
			init: expression(html.children('value').children())
		};
	}
	function translate(syntax) {
		return function (html) {
			var js = {};
			js.type = syntax.type;
			for (var name in syntax.property) {
				var type = syntax.property[name] || Syntax.type(html.children(name).children());
				js[name] = {
					expression: expression,
					statement: statement,
					string: function (x) { return x.text(); },
					bool: function (x) { return x.text() != 'false'; }
				}[type](html.children(name).contents())
			};
			return js;
		};
	}
}
