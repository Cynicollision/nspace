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
			
			it('as an un-nested identifier only (no dots in name) when selected and no value is passed.', function () {
				var ns = nspace('MySharedModule');
				expect(ns).toBeDefined();
			});
			
			it('as an un-nested identifier only (no dots in name) when selected and a value is passed.', function () {
				var testModule = { cat: 'dog' };
				var ns = nspace('MyPets', testModule);
				
				expect(ns).toBe(testModule);
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
			
			it('and preserves nearby namespaced modules.', function () {
				var testModule1 = { name: 'TM01' };
				var testModule2 = { name: 'TM02' };
				var testModule3 = { name: 'TM03' };
				
				nspace('Org.Spacename.One', testModule1);
				nspace('Org.Spacename.Elsewhere.Three', testModule3);
				nspace('Org.Spacename.Two', testModule2);
				
				var retrievedNamespace1 = nspace('Org.Spacename.One');
				var retrievedNamespace2 = nspace('Org.Spacename.Two');
				var retrievedNamespace3 = nspace('Org.Spacename.Elsewhere.Three');
				
				expect(retrievedNamespace1).toBe(testModule1);
				expect(retrievedNamespace2).toBe(testModule2);
				expect(retrievedNamespace3).toBe(testModule3);
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
