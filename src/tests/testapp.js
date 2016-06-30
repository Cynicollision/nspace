(function testApp() {
        
    var data = 0;

    nspace('MyApp.Service', [], function () {

        function Service(params) {

            var data = [];
            
            if (params && params.data) {
                data = params.data;
            }
            
            this.getDataPlusOne = function () {
                return data + 1;
            };
        }
        
        return Service;
    });

    nspace('MyApp.Logic',
        ['MyApp.Service'],
        function (Service) {
            
            var svc = new Service({
                data: 100,
            });
            
            function Logic() {
            }
            
            Logic.getData = function () {
                return svc.getDataPlusOne();
            };
            
            return Logic;
        });

    nspace('MyApp.Consumer', 
        ['MyApp.Logic'],
        function (Logic) {
        
            function Consumer() {
                
                this.init = function () {
                    data = Logic.getData();
                };
            }
            
            return Consumer;
            
        });

    // main.js
    var Consumer = nspace('MyApp.Consumer');
    (new Consumer()).init();

    
    log(data);

    function log(msg) {
        document.body.innerText += ('\nLOG: ' + msg);
    }

}());
