function before(syntax) {
	var parent = this.parent;
	for (var name in parent.syntax.property) {
		var p = parent.syntax.property[name];
		if (p.name == this.property)
			break;
	}
	var i = parent.value[name].indexOf(this.value);
	parent.value[name].splice(i, 0, syntax);
	var node = new this.constructor(syntax);
	node.parent = parent;
	var i = parent.getChildren().indexOf(this);
	parent.getChildren().splice(i, 0, node);
}
function after(syntax) {
	var parent = this.parent;
	for (var name in parent.syntax.property) {
		var p = parent.syntax.property[name];
		if (p.name == this.property)
			break;
	}
	var i = parent.value[name].indexOf(this.value);
	parent.value[name].splice(i + 1, 0, syntax);
	var node = new this.constructor(syntax);
	node.parent = parent;
	var i = parent.getChildren().indexOf(this);
	parent.getChildren().splice(i + 1, 0, node);
}
function append(syntax, property) {
	for (var name in this.syntax.property) {
		var p = this.syntax.property[name];
		if (p.name == property)
			break;
	}
	this.value[name].push(syntax);
	var node = new this.constructor(syntax);
	node.parent = this;
	node.property = property;
	this.getChildren().push(node);
}
function prepend(syntax, property) {
	for (var name in this.syntax.property) {
		var p = this.syntax.property[name];
		if (p.name == property)
			break;
	}
	this.value[name].unshift(syntax);
	var node = new this.constructor(syntax);
	node.parent = this;
	node.property = property;
	this.getChildren().unshift(node);
}
function remove() {
	var parent = this.parent;
	for (var name in parent.syntax.property) {
		var p = parent.syntax.property[name];
		if (typeof (p) == 'string')
			p = { name: name, type: p };
		if (p.name == this.property)
			break;
	}
	if (p.type == '[]') {
		var i = parent.value[name].indexOf(this.value);
		parent.value[name].splice(i, 1);
		var i = parent.getChildren().indexOf(this);
		parent.getChildren().splice(i, 1);
	} else if (p.type == '{}')
		parent.value[name] = null;
}
function replace(syntax) {
	var parent = this.parent;
	for (var name in parent.syntax.property) {
		var p = parent.syntax.property[name];
		if (typeof (p) == 'string')
			p = { name: name, type: p };
		if (p.name == this.property)
			break;
	}
	if (p.type == '[]') {
		var i = parent.value[name].indexOf(this.value);
		parent.value[name][i] = syntax;
	} else if (p.type == '{}')
		parent.value[name] = syntax;
	var node = new this.constructor(syntax);
	node.parent = parent;
	var i = parent.getChildren().indexOf(this);
	parent.getChildren()[i] = node;
}

module.exports = {
	before: before,
	after: after,
	append: append,
	prepend: prepend,
	remove: remove,
	replace: replace
};
