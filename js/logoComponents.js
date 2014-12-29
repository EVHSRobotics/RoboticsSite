////////////////////////
//COMPONENT DIRECTIVES//
////////////////////////

var LogoComponents = angular.module('LogoComponents', []);

//Config//

LogoComponents.provider('FLogoConfig', [

    function () {
        var _Config = {
            "logo": {
                "icon": {
                    "navbar": {
                        "val": 42,
                        "offsetTop": 12
                    },
                    "large": {
                        "val": 128,
                        "offsetTop": 0
                    }
                },
                "mark": {
                    "navbar": {
                        "val": 56,
                        "offsetTop": 16
                    },
                    "large": {
                        "val": 256,
                        "offsetTop": 0
                    }
                },
                "typographic": {
                    "large": {
                        "val": 192,
                        "offsetTop": 0
                    }
                }
            }
        };
        var $get = function () {
            var Config = _Config;

            var get = function (section) {
                var val = Config;
                for (var i = 0; i < arguments.length; i++) {
                    val = val[arguments[i]];
                }
                return val;
            };

            return {
                get: get
            };
        };

        return {
            $get: $get
        };
    }
]);


//Logo Typographic//

LogoComponents.directive('logo', function () {
    return {
        restrict: 'A',
        templateUrl: 'assets/logo/PrototypeLogo.svg',
        scope: {
            size: '@logoIconLight'
        },
        controller: ['$scope', '$element', 'FLogoConfig',
            function ($scope, $element, configFactory) {
                var type = $scope.size || 'large';
                var dim = configFactory.get('logo', 'typographic', type);
                $element.children(1).height(dim.val).width(2.2 * dim.val).css('position', 'relative').css('top', -dim.offsetTop);
            }
        ]
    };
});

LogoComponents.directive('logoLight', function () {
    return {
        restrict: 'A',
        templateUrl: 'assets/logo/PrototypeLogoWhite.svg',
        scope: {
            size: '@logoIconLight'
        },
        controller: ['$scope', '$element', 'FLogoConfig',
            function ($scope, $element, configFactory) {
                var type = $scope.size || 'large';

                var dim = configFactory.get('logo', 'typographic', type);
                $element.children(1).height(dim.val).width(2.2 * dim.val).css('position', 'relative').css('top', -dim.offsetTop);

            }
        ]
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
        controller: ['$scope', '$element', 'FLogoConfig',
            function ($scope, $element, configFactory) {
                var type = $scope.size || 'navbar';

                var dim = configFactory.get('logo', 'icon', type);
                $element.children(1).height(dim.val).width(dim.val);

            }
        ]
    };
});

LogoComponents.directive('logoIconLight', function () {
    return {
        restrict: 'EA',
        templateUrl: 'assets/logo/PrototypeLogoIconWhite.svg',
        scope: {
            size: '@logoIconSize'
        },
        controller: ['$scope', '$element', 'FLogoConfig',
            function ($scope, $element, configFactory) {
                var type = $scope.size || 'navbar';

                var dim = configFactory.get('logo', 'icon', type);
                $element.children(1).height(dim.val).width(dim.val);
            }
        ]
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
        controller: ['$scope', '$element', 'FLogoConfig',
            function ($scope, $element, configFactory) {
                var type = $scope.size || 'navbar';

                var dim = configFactory.get('logo', 'mark', type);
                $element.children(1).height(dim.val).width(dim.val).css('position', 'relative').css('top', -dim.offsetTop);
            }
        ]
    };
});

LogoComponents.directive('logoMarkLight', function () {
    return {
        restrict: 'A',
        scope: {
            size: '@logoMarkLight',
        },
        templateUrl: 'assets/logo/PrototypeCougarWhite.svg',
        controller: ['$scope', '$element', 'FLogoConfig',
            function ($scope, $element, configFactory) {
                var type = $scope.size || 'navbar';

                var dim = configFactory.get('logo', 'mark', type);
                $element.children(1).height(dim.val).width(dim.val).css('position', 'relative').css('top', -dim.offsetTop);
            }
        ]
    };
});