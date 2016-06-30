(function nspace() {

    var root = {};
    
    function nspace(namespace, valueOrDependencies, value) {
        
        // defines the given namespace as a new module
        function defineModule() {
            var tokens = namespace.split('.'),
                node = root,
                qualifiedNodeName;
                
            value = value || {};
                
            if (tokens.length > 1) {
            
                for (var i = 0; i < tokens.length; i++) {

                    if (!node[tokens[i]]) {
                        node[tokens[i]] = (i === tokens.length - 1) ? value : {};
                    }
                    
                    node = node[tokens[i]];
                    qualifiedNodeName = tokens.slice(0, i + 1).join('.');
                    root[qualifiedNodeName] = node;
                }
            }
            else {
                root[namespace] = value || {};
            }
        }
        
        // calls 'value' argument as module, passing the named module dependencies
        function injectDependencies() {
            var dependencies = [];
            
            for (var i = 0; i < valueOrDependencies.length; i++) {
                dependencies.push(root[valueOrDependencies[i]]);
            }
            
            value = value.apply(null, dependencies);
        }
            
        if (!Array.isArray(valueOrDependencies)) {
            value = valueOrDependencies;
        }
        else {
            injectDependencies();
        }
            
        if (!root[namespace]) {
            defineModule();
        }
        
        return root[namespace];
    }

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = nspace;
    }
    else {
        window.nspace = nspace;
    }

}());
