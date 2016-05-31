(function nspaceTests() {
    'use strict';

    describe('nspace', function () {

        describe('initializes a namespace', function () {

            it('as an empty object when selected and no value is passed', function () {
                var ns = nspace('nspace.tests.TestOne');
                ns.someProperty = 'testing';

                var retrievedNamespace = nspace('nspace.tests.TestOne');

                expect(retrievedNamespace).toBe(ns);
                expect(retrievedNamespace.someProperty).toBe('testing');
            });

            it('as the specified value when selected and a value is passed', function () {
                var testModule = {
                    someMethod: function () {
                        return 'testing';
                    }
                };

                var ns = nspace('nspace.tests.TestTwo', testModule);

                var retrievedNamespace = nspace('nspace.tests.TestTwo');

                expect(retrievedNamespace).toBe(ns);
                expect(retrievedNamespace.someMethod()).toBe('testing');
            });

            it('throws an error if a value is passed but the namespace has already been defined.', function () {
                nspace('nspace.tests.TestThree', { foo: 'bar' });

                var reinitialize = nspace.bind(null, 'nspace.tests.TestThree', { beep: 'boop' });

                expect(reinitialize).toThrow();
            });
        });

        describe('selects a namespace', function () {
            var testModule = { marco: 'polo' };
            nspace('nspaceTests.namespaceParent.namespaceMember', testModule);

            it('by full namespace name or as an object member', function () {
                var ns1 = nspace('nspaceTests.namespaceParent.namespaceMember');
                var ns2 = nspace('nspaceTests');

                expect(ns1).toBe(ns2.namespaceParent.namespaceMember);
                expect(ns1).toBe(testModule);
            });

            it('and returns an object with namespace members as object members', function () {
                var nspaceTests = nspace('nspaceTests');
                expect(nspaceTests.namespaceParent.namespaceMember).toBe(testModule);
            });
        });
    });
}());
