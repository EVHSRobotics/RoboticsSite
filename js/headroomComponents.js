var headroomComponents = angular.module('headroomComponents', []);

headroomComponents.directive('headroomSpacer', function () {
    return {
        restrict: 'A',
        scope: {
            headroomParent: '@headroomSpacer'
        },
        controller: ['$scope', '$element',
            function ($scope, $element) {
                $element.height($('#'+$scope.headroomParent).height());
            }]
    };
});