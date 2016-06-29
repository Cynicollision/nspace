(function testApp() {

    var testModule = { marco: 'polo' };
    nspace('nspaceTests.namespaceParent.namespaceMember', testModule);
    
    var testModule2 = { options: { on: true, mode: 'big' } };
    nspace('nspaceTests.Config', testModule2);
    
    nspace('Module', 
        ['nspaceTests.namespaceParent.namespaceMember', 'nspaceTests.Config'],
        function (namespaceMember, Config) {
            log(namespaceMember.marco);
            log(Config.options.mode);
        }
    );

    function log(msg) {
        document.body.innerText += ('\n' + msg);
    }

}());
