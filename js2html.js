function js2html(js) {
	switch (js.type) {
		case 'Literal':
			return $("<literal>").append(js.raw);
			break;
	}
}
