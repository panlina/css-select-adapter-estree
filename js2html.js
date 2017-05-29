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
		}
	}
	function statement(js) {
		switch (js.type) {
			case "ReturnStatement":
				return $("<return>").append(expression(js.argument));
				break;
			case "VariableDeclaration":
				return $("<var>").append(js.declarations.map(decl))
				break;
			case "BlockStatement":
				return $("<block>").append(js.body.map(statement));
				break;
		}
	}
	function decl(js) {
		return $("<decl>")
			.append($("<name>").text(js.id.name))
			.append($("<value>").append(expression(js.init)));
	}
}
