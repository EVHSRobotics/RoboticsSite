var Config = angular.module('Config', []);

Config.factory('configFactory', ['$q', '$http',
    function ($q, $http) {
        var promise = null;

        var update = function () {
            promise = null;
            promise = $http.get('config/config.json');
        };

        update();

        //executes callback on section data 
        var get = function (section, callback) {
            promise.success(function (data) {
                callback(data[section]);
            });
        };

        return {
            update: update,
            get: get
        };

}]);