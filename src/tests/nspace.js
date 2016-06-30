// DO NOT COMMIT THIS FILE IT IS FOR WORKING ON THE README ONLY ARRRGGGHH
(function nspace() {

    var root = {};
    
    function nspace(namespace, value) {
        
        var node = root,
            qualifiedNodeName,
            tokens;
            
        if (!root[namespace]) {
            tokens = namespace.split('.');
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
        
        return root[namespace];
    }

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = nspace;
    }
    else {
        window.nspace = nspace;
    }

}());
