var fs = require('fs');
var js = fs.readFileSync("js.js", { encoding: 'utf8' });
var acorn = require("acorn");
var js = acorn.parse(js);
var adapter = require('.').adapter;
var Node = require('.').Node;
var select = require('css-select');
var escodegen = require("escodegen");
var node = new Node(js);
var selector = [
	":root>.var>decl",
	"[label]",
	".unary[prefix]",
	".func>#body>:last-child"
];
for (var i in selector) {
	console.log('\x1b[1m', selector[i], '\x1b[0m');
	var element = select(selector[i], node, { adapter: adapter });
	for (var i in element)
		console.log(escodegen.generate(element[i].value));
}
