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
				return $("<unary>").append(
					$("<argument>").append(expression(js.argument)),
					$("<operator>").append(js.operator),
					$("<prefix>").append(js.prefix.toString())
				);
				break;
			case 'BinaryExpression':
			case 'AssignmentExpression':
				return $("<binary>").append(
					$("<left>").append(expression(js.left)),
					$("<right>").append(expression(js.right)),
					$("<operator>").append(js.operator)
				);
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
				return $("<for>").append(
					$('<init>').append(js.init &&
						(js.init.type == 'VariableDeclaration' ?
							statement : expression
						)(js.init)
					),
					$('<test>').append(expression(js.test)),
					$('<update>').append(expression(js.update)),
					$('<body>').append(statement(js.body))
				);
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
					var type = syntax.property[name];
					return $('<' + name + '>').append({
						expression: expression,
						statement: statement
					}[type](js[name]));
				})
			);
		};
	}
}
