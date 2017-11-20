module.exports = {
	isTag: function (node) { return node.isTag(); },
	getName: function (element) { return element.getName(); },
	getChildren: function (node) { return node.getChildren(); },
	getSiblings: function (node) { return node.getSiblings(); },
	getParent: function (node) { return node.getParent(); },
	hasAttrib: function (element, name) { return element.hasAttribute(name); },
	getAttributeValue: function (element, name) { return element.getAttribute(name); },
	existsOne: function (test, elems) { return elems.some(test); },
	findAll: function (test, nodes) {
		var $this = this;
		var all = [];
		function find(nodes) {
			for (var i in nodes) {
				var node = nodes[i];
				find($this.getChildren(node));
				if (test(node))
					all.push(node);
			};
		}
		find(nodes);
		return all;
	}
};
