////////////////////////
//COMPONENT DIRECTIVES//
////////////////////////

var Components = angular.module('Components', ['Config']);

//Logo Typographic// 

Components.directive('logo', function () {
    return {
        restrict: 'A',
        templateUrl: 'assets/logo/PrototypeLogo.svg',
        scope: {
            size: '@logoIconLight'
        },
        controller: ['$scope', '$element', 'configFactory',
            function ($scope, $element, configFactory) {
                var type = $scope.size || 'large';
                var dim = configFactory.get('logo', 'typographic', type);
                $element.children(1).height(dim.val).width(2.2 * dim.val).css('position', 'relative').css('top', -dim.offsetTop);
            }]
    };
});

Components.directive('logoLight', function () {
    return {
        restrict: 'A',
        templateUrl: 'assets/logo/PrototypeLogoWhite.svg',
        scope: {
            size: '@logoIconLight'
        },
        controller: ['$scope', '$element', 'configFactory',
            function ($scope, $element, configFactory) {
                var type = $scope.size || 'large';

                var dim = configFactory.get('logo', 'typographic', type);
                $element.children(1).height(dim.val).width(2.2 * dim.val).css('position', 'relative').css('top', -dim.offsetTop);

    }]
    };
});

//Logo Icon//

Components.directive('logoIcon', function () {
    return {
        restrict: 'A',
        templateUrl: 'assets/logo/PrototypeLogoIcon.svg',
        transclude: true,
        scope: {
            size: '@logoIcon'
        },
        controller: ['$scope', '$element', 'configFactory',
            function ($scope, $element, configFactory) {
                var type = $scope.size || 'navbar';

                var dim = configFactory.get(['logo', 'icon', type]);
                $element.children(1).height(dim.val).width(dim.val).css('position', 'relative').css('top', -dim.offsetTop);

    }]
    };
});

Components.directive('logoIconLight', function () {
    return {
        restrict: 'A',
        templateUrl: 'assets/logo/PrototypeLogoIconWhite.svg',
        transclude: true,
        scope: {
            size: '@logoIconLight'
        },
        controller: ['$scope', '$element', 'configFactory',
            function ($scope, $element, configFactory) {
                var type = $scope.size || 'navbar';

                var dim = configFactory.get('logo', 'icon', type);
                $element.children(1).height(dim.val).width(dim.val).css('position', 'relative').css('top', -dim.offsetTop);
    }]
    };
});

//Logo Cougar// 

Components.directive('logoMark', function () {
    return {
        restrict: 'A',
        scope: {
            size: '@logoMark',
        },
        templateUrl: 'assets/logo/PrototypeCougar.svg',
        controller: ['$scope', '$element', 'configFactory',
            function ($scope, $element, configFactory) {
                var type = $scope.size || 'navbar';

                var dim = configFactory.get('logo', 'mark', type);
                $element.children(1).height(dim.val).width(dim.val).css('position', 'relative').css('top', -dim.offsetTop);
    }]
    };
});

Components.directive('logoMarkLight', function () {
    return {
        restrict: 'A',
        scope: {
            size: '@logoMarkLight',
        },
        templateUrl: 'assets/logo/PrototypeCougarWhite.svg',
        controller: ['$scope', '$element', 'configFactory',
            function ($scope, $element, configFactory) {
                var type = $scope.size || 'navbar';

                var dim = configFactory.get('logo', 'mark', type);
                $element.children(1).height(dim.val).width(dim.val).css('position', 'relative').css('top', -dim.offsetTop);
    }]
    };
});