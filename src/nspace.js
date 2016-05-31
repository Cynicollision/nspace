(function nspace() {

    var root = {};
	
    var nspace = function (namespace, value) {
		
		var node = root,
			tokens;
			
		if (!root[namespace]) {
			tokens = namespace.split('.');
			
			if (tokens.length > 1) {
			
				for (var i = 0; i < tokens.length; i++) {

					if (!node[tokens[i]]) {
						node[tokens[i]] = (value && i === tokens.length - 1) ? value : {};
					}
					
					node = node[tokens[i]];

					var qualifiedNodeName = tokens.slice(0, i + 1).join('.');
					root[qualifiedNodeName] = node;
				}
			}
		}
		else if (value) {
			throw "Namespace is already defined.";
		}
		
		return root[namespace];
    };

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = nspace;
    }
    else {
        window.nspace = nspace;
    }

}());
