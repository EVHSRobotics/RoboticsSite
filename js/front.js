////////////
//MAIN APP//
////////////

var Robotics = angular.module('Robotics', ['ui.router', 'headroom', 'HeadroomComponents', 'Config', 'Javagod', 'Scroll', 'LogoComponents']);

//////////////////
//JAVAGOD CONFIG//
//////////////////

Robotics.config(['FJavagodProvider',
    function (FJavagodProvider) {
        FJavagodProvider.setDataUrl('data/data_god_blog');
        FJavagodProvider.setPrefix('godPost');
        FJavagodProvider.setPostArrayUrl('data/data_god_blog/godPostArray');
    }]);

///////////////
//MAIN ROUTES//
///////////////

//Base Url Config//

Robotics.config(['$locationProvider',
    function ($locationProvider) {
        //clean urls 

        //$locationProvider.html5Mode(true);
}]);

Robotics.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        //redirect to home 
        $urlRouterProvider.otherwise('/home/');

        //States// 
        //DYNAMICALLY OBTAIN THESE VALUES FROM CONFIG 

        var homeViews = {
            'root@': {
                templateUrl: 'templates/home.html',
                controller: ['$state', '$scope', 'scrollFactory',
                        function ($state, $scope, scrollFactory) {
                        $scope.$on('$viewContentLoaded', function (event) {
                            //PREVENT DUPLICATE CALLS 
                            console.log('start-----------------------');
                            console.log('$state.params.sectionId:' + $state.params.sectionId);
                            scrollFactory.sectionIdScroll(125);
                        });

                        }]
            },
            'about@home': {
                templateUrl: 'templates/home.about.html'
            }
        };

        //home 
        $stateProvider.state('home', {
            url: '/home/:sectionId',

            views: homeViews
        });

        //blog 
        $stateProvider.state('blog', {
            url: '/blog/:postId',
            views: {
                'root@': {
                    templateUrl: 'templates/godBlog.html',
                    controller: ['$state', '$scope', 'FJavagod',
                        function ($state, $scope, FJavagod) {
                            FJavagod.getPostJson($state.params.postId, function(data) {
                                $scope.god = data;
                            });
                        }
                    ]
                },
                'post@blog': {
                    templateUrl: 'templates/godBlogPost.html'
                }
            }
        });

        //post creator 
        $stateProvider.state('javagod', {
            url: '/javagod',
            views: {
                'root@': {
                    templateUrl: 'templates/javagod.html',
                    controller: [

                        function () {

                    }]
                }
            }
        });
}]);

/////////////////////
//GLOBAL CONTROLLER//
/////////////////////

Robotics.controller('mainController', ['configFactory',
    function (configFactory) {
        this.tabs = configFactory.get('navbar', 'tabs');
}]);