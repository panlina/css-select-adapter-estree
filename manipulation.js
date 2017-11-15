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

module.exports = {
	before: before
};
