var syntax = require('./syntax.js');

function Node(value) {
	this.value = value;
	if (value.type == 'LabeledStatement') {
		this.value = value.body;
		this.label = value.label.name;
	}
}
Node.prototype.isTag = function () { return true; };
Node.prototype.getName = function () {
	return this.syntax.name;
};
Node.prototype.getChildren = function () {
	if (this.children) return this.children;
	var property = this.syntax.property || {};
	var children = [];
	for (var name in property) {
		var value = this.value[name];
		if (value == null) continue;
		var p = property[name];
		if (typeof (p) == 'string')
			p = { name: name, type: p };
		if (p.type == '{}')
			children.push(Child.call(this, value));
		else if (p.type == '[]')
			for (var i in value)
				children.push(Child.call(this, value[i]));
		function Child(value) {
			var node = new Node(value);
			node.parent = this;
			if (p.name)
				node.property = p.name;
			return node;
		}
	}
	this.children = children;
	return children;
};
Node.prototype.getSiblings = function () {
	return this.parent.getChildren();
};
Node.prototype.getParent = function () {
	return this.parent;
};
Node.prototype.hasAttribute = function (name) {
	if (name == 'id') return 'property' in this;
	if (name == 'label') return 'label' in this;
	if (name == 'class') return 'class' in this.syntax;
	var p; if (this.syntax.property) p = this.syntax.property[name];
	switch (p) {
		case 'bool':
			return this.value[name];
		case 'string':
			return true;
		default:
			return false;
	}
};
Node.prototype.getAttribute = function (name) {
	if (name == 'id') return this.property;
	if (name == 'label') return this.label;
	if (name == 'class') return this.syntax.class;
	return this.value[name];
};
Object.defineProperty(Node.prototype, 'syntax', {
	get: function () {
		return syntax[this.value.type];
	}
});

module.exports = Node;
