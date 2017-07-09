var cheerio = require('cheerio');
var $ = cheerio.load("", { xmlMode: true });
module.exports = $;
