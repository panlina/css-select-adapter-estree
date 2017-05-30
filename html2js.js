function html2js(html) {
	return expression(html);
	function expression(html) {
		if (html == undefined) return undefined;
		switch (html[0].tagName) {
			case 'LITERAL':
				return {
					type: 'Literal',
					value: eval(html.html())
				}
				break;
		}
	}
}
