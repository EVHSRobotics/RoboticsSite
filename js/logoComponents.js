////////////////////////
//COMPONENT DIRECTIVES//
////////////////////////

var LogoComponents = angular.module('LogoComponents', ['Config']);

//Logo Typographic// 

LogoComponents.directive('logo', function () {
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

LogoComponents.directive('logoLight', function () {
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

LogoComponents.directive('logoIcon', function () {
    return {
        restrict: 'EA',
        templateUrl: 'assets/logo/PrototypeLogoIcon.svg',
        scope: {
            size: '@logoIconSize'
        },
        controller: ['$scope', '$element', 'configFactory',
            function ($scope, $element, configFactory) {
                var type = $scope.size || 'navbar';

                var dim = configFactory.get('logo', 'icon', type);
                $element.children(1).height(dim.val).width(dim.val);

    }]
    };
});

LogoComponents.directive('logoIconLight', function () {
    return {
        restrict: 'EA',
        templateUrl: 'assets/logo/PrototypeLogoIconWhite.svg',
        scope: {
            size: '@logoIconSize'
        },
        controller: ['$scope', '$element', 'configFactory',
            function ($scope, $element, configFactory) {
                var type = $scope.size || 'navbar';

                var dim = configFactory.get('logo', 'icon', type);
                $element.children(1).height(dim.val).width(dim.val);
    }]
    };
});

//Logo Cougar// 

LogoComponents.directive('logoMark', function () {
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

LogoComponents.directive('logoMarkLight', function () {
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