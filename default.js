var fs = require('fs');
var js = fs.readFileSync("js.js", { encoding: 'utf8' });
var acorn = require("acorn");
var js = acorn.parse(js);
var adapter = require('.').adapter;
var Node = require('.').Node;
var select = require('css-select');
var element = select(":root>.var>decl", new Node(js), { adapter: adapter });
var escodegen = require("escodegen");
for (var i in element)
	console.log(escodegen.generate(element[i].value));
