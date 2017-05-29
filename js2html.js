function js2html(js) {
	return expression(js);
	function expression(js) {
		switch (js.type) {
			case 'Literal':
				return $("<literal>").append(js.raw);
				break;
			case 'Identifier':
				return $("<identifier>").append(js.name);
				break;
		}
	}
}
