var Components = angular.module('Components', ['Config']);

Components.directive('logoIcon', function () {
    return {
        restrict: 'A',
        templateUrl: 'assets/logo/PrototypeLogoIcon.svg',
        scope: {
            size: '@logoIcon'
        },
        controller: ['$scope', '$element', 'configFactory',
            function ($scope, $element, configFactory) {
                var type = $scope.size || 'navbar';

                configFactory.get().success(function (data) {
                    var num = data.logo[type];
                    $('svg').height(num).width(num);
                });
    }]
    };
});