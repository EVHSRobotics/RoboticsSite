var Config = angular.module('Config', []);

Config.factory('configFactory', ['$q', '$http',
    function ($q, $http) {
        var promise = null;

        var update = function () {
            promise = null;
            promise = $http.get('config/config.json');
        };
        
        update();

        //returns a promise with data 
        var get = function () {
            return promise;
        };

        return {
            update: update,
            get: get
        };

}]);