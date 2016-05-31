(function nspace() {

    'use strict';

    var root = {};

    var nspace = function (namespace, value) {

        if (root[namespace] && value) {
            throw "Namespace is already defined.";
        }

        var tokens = namespace.split('.'),
            node = root;

        if (tokens.length > 1) {

            for (var i = 0; i < tokens.length; i++) {

                if (!node[tokens[i]]) {

                    if (value && i === tokens.length - 1) {
                        node[tokens[i]] = value;
                    }
                    else {
                        node[tokens[i]] = {};
                    }
                }

                node = node[tokens[i]];

                var qualifiedNodeName = tokens.slice(0, i + 1).join('.');
                root[qualifiedNodeName] = node;
            }
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
