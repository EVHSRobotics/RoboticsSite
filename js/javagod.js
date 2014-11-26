var Javagod = angular.module('Javagod', []);

Javagod.provider('FJavagod', [
    function () {
        var _dataUrl = 'data_god_blog';
        var _prefix = 'godPost';
        var _dataPostArrayUrl = 'data_god_blog';
        
        var setDataUrl = function (url) {
            _dataUrl = url;
        };
        
        var setPrefix = function(prefix) {
            _prefix = prefix;
        };
        
        var setPostArrayUrl = function(url) {
            _dataPostArrayUrl = url;
        };
        
        var $get = ['$http' ,function($http) {
            var dataUrl = _dataUrl;
            var prefix = _prefix;
            var dataPostArrayUrl = _dataPostArrayUrl;
            
            var postArray = $http.get(dataPostArrayUrl + '.json');
            
            var appendZeroes = function(num, length) {
                num = '' + num;
                if(num.length >= length) {
                    return num;
                } else {
                    return appendZeroes('0' + num, length);
                }
            };
            
            var getPostJson = function(postId, callback) {
                postId = appendZeroes(postId, 4);
                $http.get(dataUrl + '/' + prefix + postId + '.json')
                .success(function(data, status, headers, config) {
                    if(callback) {
                        callback(data);
                    }
                }).error(function(data, status, headers, config) {
                    console.log('javagod failed to retrieve: ' + prefix+postId+'.json', '\nstatus: ' + status);
                });
            };
            
            var postArray = function(callback){
                postArray.success(function(data, status, headers, config) {
                    if(callback) {
                        callback(data);
                    }
                });
            };
            
            return {
                getPostJson: getPostJson, 
                postArray: postArray
            };
        }];
        
        return {
            $get: $get, 
            setDataUrl: setDataUrl,
            setPrefix: setPrefix, 
            setPostArrayUrl: setPostArrayUrl
        };
    }
]);