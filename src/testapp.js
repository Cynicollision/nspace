(function testApp() {

    var testModule = { marco: 'polo' };
    nspace('nspaceTests.namespaceParent.namespaceMember', testModule);

    var nspaceTests = nspace('nspaceTests');
    log(nspaceTests.namespaceParent.namespaceMember.marco);

    function log(msg) {
        document.body.innerText += ('\n' + msg);
    }

}());