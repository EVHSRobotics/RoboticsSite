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

JavagodUtil.filter('date8', [

    function () {
        var date8 = function (date, format) {
            date = date || '';
            date = date.trim();
            format = format || false;
            if (date.length == 8) {
                var m = moment(date, 'YYYYMMDD');
                if (format == 'long') {
                    return m.format('MMMM Do, YYYY');
                } else if (format == 'us') {
                    return m.format('MM-DD-YYYY');
                } else {
                    return m.format('YYYY-MM-DD');
                }
            } else {
                return '0000-00-00';
            }
        };

        return date8;
    }
]);

JavagodUtil.directive('godCountdown', [

    function () {
        return {
            restrict: 'A',
            scope: {
                end: '@godCountdown',
                postMessage: '@godCountdownPost',
                id: '@godCountdownId'
            },
            template: '<h1 id="{{id}}">{{time}}<br><small>{{postMessage}}</small></h1>',
            controller: ['$scope', '$interval',
                function ($scope, $interval) {
                    var timerDaemon = $interval(function () {
                        $scope.time = moment.duration(moment($scope.end).valueOf() - moment().valueOf()).format('D | hh : mm : ss');
                    }, 1000);
        }]
        };
}]);