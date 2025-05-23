var express = require('express');
var app = express();

app.use(function(req, res) {
	let tainted = req.query.tainted; // $ Source[js/polynomial-redos]

	tainted.replace(/^\s+|\s+$/g, ''); // $ Alert[js/polynomial-redos]
	tainted.split(/ *, */); // $ Alert[js/polynomial-redos]
	tainted.replace(/\s*\n\s*/g, ' '); // $ Alert[js/polynomial-redos]
	tainted.split('\n');
	tainted.replace(/.*[/\\]/, ''); // $ Alert[js/polynomial-redos]
	tainted.replace(/.*\./, ''); // $ Alert[js/polynomial-redos]
	tainted.replace(/^.*[/\\]/, '');
	tainted.replace(/^.*\./, '');
	tainted.replace(/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/); // $ Alert[js/polynomial-redos]
	tainted.replace(/^(`+)([\s\S]*?[^`])\1(?!`)/); // $ Alert[js/polynomial-redos]
	/^(.*,)+(.+)?$/.test(tainted); // $ Alert[js/polynomial-redos] Alert[js/redos]
	tainted.match(/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i); // $ Alert[js/polynomial-redos]
	tainted.match(/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{1,256}|[\u0600-\u06FF\/]{1,256}(\s*?[\u0600-\u06FF]{1,256}){1,2}/i); // $ Alert[js/polynomial-redos] - even though it is a proposed fix for the above
	tainted.match(/^(\+|-)?(\d+|(\d*\.\d*))?(E|e)?([-+])?(\d+)?$/); // $ Alert[js/polynomial-redos]
	if (tainted.length < 7000) {
		tainted.match(/^(\+|-)?(\d+|(\d*\.\d*))?(E|e)?([-+])?(\d+)?$/); // OK - but flagged
	}

	tainted.match(/^([a-z0-9-]+)[ \t]+([a-zA-Z0-9+\/ \t\n]+[=]*)(.*)$/); // $ Alert[js/polynomial-redos]
	tainted.match(/^([a-z0-9-]+)[ \t\n]+([a-zA-Z0-9+\/][a-zA-Z0-9+\/ \t\n=]*)([^a-zA-Z0-9+\/ \t\n=].*)?$/);
	/[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/.test(tainted); // $ MISSING: Alert[js/polynomial-redos] - not detected due to not supporting ranges
	/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/.test(tainted);

	tainted.replace(/[?]+.*$/g, ""); // $ SPURIOUS: Alert[js/polynomial-redos] - can not fail once a match has started
	tainted.replace(/\-\-+/g, "-").replace(/-+$/, ""); // OK - indirectly sanitized
	tainted.replace(/\n\n\n+/g, "\n").replace(/\n*$/g, "");  // OK - indirectly sanitized
	tainted.match(/(.)*solve\/challenges\/server-side(.)*/); // $ Alert[js/polynomial-redos]
	tainted.match(/<head>(?![\s\S]*<head>)/i);

	tainted.match(/<.*class="([^"]+)".*>/); // $ Alert[js/polynomial-redos]
	tainted.match(/<.*style="([^"]+)".*>/); // $ Alert[js/polynomial-redos]
	tainted.match(/<.*href="([^"]+)".*>/); // $ Alert[js/polynomial-redos]

	tainted.match(/^([^-]+)-([A-Za-z0-9+/]+(?:=?=?))([?\x21-\x7E]*)$/); // $ Alert[js/polynomial-redos]
	tainted.match(/^([^-]+)-([A-Za-z0-9+/=]{44,88})(\?[\x21-\x7E]*)*$/); // $ Alert[js/redos] - it is a fix for the above, but it introduces exponential complexity elsewhere

	tainted.match(/^([a-z0-9-]+)[ \t]+([a-zA-Z0-9+\/]+[=]*)([\n \t]+([^\n]+))?$/); // $ Alert[js/polynomial-redos]
	tainted.match(/^([a-z0-9-]+)[ \t]+([a-zA-Z0-9+\/]+[=]*)([ \t]+([^ \t][^\n]*[\n]*)?)?$/);

        tainted.match(/^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)+$/); // $ Alert[js/redos]
	tainted.match(/^(?:\.?[a-zA-Z_][a-zA-Z_0-9]*)(?:\.[a-zA-Z_][a-zA-Z_0-9]*)*$/);
	tainted.replaceAll(/\s*\n\s*/g, ' '); // $ Alert[js/polynomial-redos]

	/Y.*X/.test(tainted); // $ Alert[js/polynomial-redos]
	/B?(YH|K)(YH|J)*X/.test(tainted) // $ Alert[js/polynomial-redos]
	(/B?(YH|K).*X/.test(tainted)); // $ Alert[js/polynomial-redos]
	/(B|Y)+(Y)*X/.test(tainted) // $ Alert[js/polynomial-redos]
	(/(B|Y)+(.)*X/.test(tainted)) // $ Alert[js/polynomial-redos]
	(/f(B|Y)+(Y)*X/.test(tainted)); // $ Alert[js/polynomial-redos]
	/f(B|Y)+(Y)*X/.test(tainted) // $ Alert[js/polynomial-redos]
	(/f(B|Y)+(Y|K)*X/.test(tainted)) // $ Alert[js/polynomial-redos]
	(/f(B|Y)+.*X/.test(tainted)) // $ Alert[js/polynomial-redos]
	(/f(B|Y)+(.)*X/.test(tainted)) // $ Alert[js/polynomial-redos]
	(/^(.)*X/.test(tainted));
	(/^Y(Y)*X/.test(tainted));
	(/^Y*Y*X/.test(tainted)); // $ Alert[js/polynomial-redos]
	(/^(K|Y)+Y*X/.test(tainted)); // $ Alert[js/polynomial-redos]
	(/^foo(K|Y)+Y*X/.test(tainted)); // $ Alert[js/polynomial-redos]
	(/^foo(K|Y)+.*X/.test(tainted)); // $ Alert[js/polynomial-redos]
	(/(K|Y).*X/.test(tainted)); // $ Alert[js/polynomial-redos]
	(/[^Y].*X/.test(tainted)); // $ Alert[js/polynomial-redos]
	(/[^Y].*$/.test(req.url)); // OK - the input cannot contain newlines.
	(/[^Y].*$/.test(req.body)); // $ Alert[js/polynomial-redos]

	tainted.match(/^([^-]+)-([A-Za-z0-9+/]+(?:=?=?))([?\x21-\x7E]*)$/); // $ Alert[js/polynomial-redos]

	tainted.match(new RegExp("(MSIE) (\\d+)\\.(\\d+).*XBLWP7")); // $ Alert[js/polynomial-redos]

	tainted.match(/<.*class="([^"]+)".*>/); // $ Alert[js/polynomial-redos]

	tainted.match(/Y.*X/); // $ Alert[js/polynomial-redos]
	tatined.match(/B?(YH|K)(YH|J)*X/); // $ MISSING: Alert[js/polynomial-redos]

	tainted.match(/a*b/); // $ Alert[js/polynomial-redos] - the initial repetition can start matching anywhere.
	tainted.match(/cc*D/); // $ Alert[js/polynomial-redos]
	tainted.match(/^ee*F/);
	tainted.match(/^g*g*/);
	tainted.match(/^h*i*/);

	tainted.match(/^(ab)*ab(ab)*X/); // $ Alert[js/polynomial-redos]

	tainted.match(/aa*X/); // $ Alert[js/polynomial-redos]
	tainted.match(/^a*a*X/); // $ Alert[js/polynomial-redos]
	tainted.match(/\wa*X/); // $ Alert[js/polynomial-redos]
	tainted.match(/a*b*c*/);
	tainted.match(/a*a*a*a*/);

	tainted.match(/^([3-7]|A)*([2-5]|B)*X/); // $ Alert[js/polynomial-redos]
	tainted.match(/^\d*([2-5]|B)*X/); // $ Alert[js/polynomial-redos]
	tainted.match(/^([3-7]|A)*\d*X/); // $ Alert[js/polynomial-redos]

	tainted.match(/^(ab)+ab(ab)+X/); // $ Alert[js/polynomial-redos]

	tainted.match(/aa+X/); // $ Alert[js/polynomial-redos]
	tainted.match(/a+X/); // $ Alert[js/polynomial-redos]
	tainted.match(/^a+a+X/); // $ Alert[js/polynomial-redos]
	tainted.match(/\wa+X/); // $ Alert[js/polynomial-redos]
	tainted.match(/a+b+c+/); // $ Alert[js/polynomial-redos]
	tainted.match(/a+a+a+a+/);

	tainted.match(/^([3-7]|A)+([2-5]|B)+X/); // $ Alert[js/polynomial-redos]
	tainted.match(/^\d+([2-5]|B)+X/); // $ Alert[js/polynomial-redos]
	tainted.match(/^([3-7]|A)+\d+X/); // $ Alert[js/polynomial-redos]

	tainted.match(/\s*$/); // $ Alert[js/polynomial-redos]
	tainted.match(/\s+$/); // $ Alert[js/polynomial-redos]

	tainted.match(/^\d*5\w*$/); // $ Alert[js/polynomial-redos]

	tainted.match(/\/\*[\d\D]*?\*\//g); // $ Alert[js/polynomial-redos]

	tainted.match(/(#\d+)+/); // $ SPURIOUS: Alert[js/polynomial-redos] - flagged due to insufficient suffix-checking.

	(function foo() {
		var replaced = tainted.replace(/[^\w\s\-\.\_~]/g, '');
		var result = ""
		result += replaced;
		result = result.replace(/^\s+|\s+$/g, ''); // $ Alert[js/polynomial-redos]
	})();

	tainted.match(/(https?:\/\/[^\s]+)/gm);

	var modified = tainted.replace(/a/g, "b");
	modified.replace(/cc+D/g, "b"); // $ Alert[js/polynomial-redos]
	
	var modified2 = tainted.replace(/a|b|c|\d/g, "e");
	modified2.replace(/ff+G/g, "b"); // $ Alert[js/polynomial-redos]

    var modified3 = tainted.replace(/\s+/g, "");
    modified3.replace(/hh+I/g, "b"); // $ Alert[js/polynomial-redos]

    tainted.match(/(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)(AA|BB)C.*X/); // $ Alert[js/polynomial-redos]
	
	modified3.replace(new RegExp("hh+I", "g"), "b"); // $ Alert[js/polynomial-redos]
	modified3.replace(new RegExp("hh+I", unknownFlags()), "b"); // $ Alert[js/polynomial-redos]
	modified3.replace(new RegExp("hh+I", ""), "b"); // $ Alert[js/polynomial-redos]
});
