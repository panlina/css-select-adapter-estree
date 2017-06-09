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
			case 'FUNCTION':
				return {
					type: 'FunctionExpression',
					params: [],
					body: statement(html.children())
				};
				break;
			case 'UNARY':
				var operator = html.children('operator').text();
				return {
					type: operator != '++' && operator != '--' ? 'UnaryExpression' : 'UpdateExpression',
					argument: expression(html.children('argument').children()),
					operator: operator,
					prefix: html.children('prefix').text() == 'true'
				};
				break;
			case 'BINARY':
				return {
					type: 'BinaryExpression',
					left: expression(html.children('left').children()),
					right: expression(html.children('right').children()),
					operator: html.children('operator').text()
				};
				break;
		}
	}
	function statement(html) {
		if (html[0] == undefined) return undefined;
		switch (html[0].tagName) {
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
				return {
					type: 'IfStatement',
					test: expression(html.children('test').children()),
					consequent: statement(html.children('consequent').children()),
					alternate: statement(html.children('alternate').children())
				};
			case 'WHILE':
				return {
					type: 'WhileStatement',
					test: expression(html.children('test').children()),
					body: statement(html.children('body').children())
				};
				break;
			case 'FOR':
				var init = html.children('init').children();
				return {
					type: 'ForStatement',
					init: init[0] && (init[0].tagName == 'VAR' ? statement : expression)(init),
					test: expression(html.children('test').children()),
					update: expression(html.children('update').children()),
					body: statement(html.children('body').children())
				};
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
}
