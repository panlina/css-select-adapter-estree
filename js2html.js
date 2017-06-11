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
			case 'FunctionExpression':
				return $("<function>").append(statement(js.body));
				break;
			case 'UnaryExpression':
			case 'UpdateExpression':
				return html(syntax.unary)(js);
				break;
			case 'BinaryExpression':
			case 'AssignmentExpression':
				return html(syntax.binary)(js);
				break;
		}
	}
	function statement(js) {
		if (js == undefined) return undefined;
		switch (js.type) {
			case "ExpressionStatement":
				return $("<expression>").append(expression(js.expression));
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
				return html(syntax.if)(js);
				break;
			case "WhileStatement":
				return html(syntax.while)(js);
				break;
			case "ForStatement":
				return html(syntax.for)(js);
				break;
		}
	}
	function decl(js) {
		return $("<decl>").append(
			$("<name>").text(js.id.name),
			$("<value>").append(expression(js.init))
		);
	}
	function html(syntax) {
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
