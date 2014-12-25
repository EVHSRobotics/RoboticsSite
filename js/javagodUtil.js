var JavagodUtil = angular.module('JavagodUtil', []);

JavagodUtil.factory('prependChar', [
    function () {
        var prepend = function (num, char, length) {
            num = '' + num;
            if (num.length >= length) {
                return num;
            } else {
                return prepend(char + num, char, length);
            }
        };
        
        return prepend;
}]);

JavagodUtil.directive('godCountdown', [function() {
    return {
        restrict: 'A', 
        scope: {
            end: '@godCountdown', 
            postMessage: '@godCountdownPost', 
            id: '@godCountdownId'
        }, 
        template: '<h1 id="{{id}}">{{time}}<br><small>{{postMessage}}</small></h1>', 
        controller: ['$scope', '$interval', function($scope, $interval) {
            var timerDaemon = $interval(function() {
                $scope.time = moment.duration(moment($scope.end).valueOf() - moment().valueOf()).format('D | hh : mm : ss');
            }, 1000);            
        }]
    };
}]);