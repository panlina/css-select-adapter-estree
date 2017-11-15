exports.adapter = require('./adapter.js');
var Node = require('./Node.js');
var manipulation = require('./manipulation.js');
for (var i in manipulation)
	Node.prototype[i] = manipulation[i];
exports.Node = Node;
