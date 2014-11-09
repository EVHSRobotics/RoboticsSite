////////////
//MAIN APP//
////////////

var Robotics = angular.module('Robotics', ['ui.router', 'headroom', 'headroomComponents', 'Config', 'LogoComponents']);

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

        //home 
        $stateProvider.state('home', {
            url: '/home/:sectionId',

            views: {
                'root@': {
                    templateUrl: 'templates/home.html',
                    controller: ['$state', '$uiViewScroll', '$scope',
                        function ($state, $uiViewScroll, $scope) {
                            $scope.$on('$viewContentLoaded', function (event) {
                                console.log('start-----------------------');
                                console.log('$state.params.sectionId:' + $state.params.sectionId);
                                //MAKE THIS A SERVICE  
                                if ($state.params.sectionId != '') {
                                    var view = $('[ui-view="' + $state.params.sectionId + '"]').first();
                                    $('html, body').animate({
                                        scrollTop: view.offset().top
                                    }, 125);
                                } else {
                                    $('html, body').animate({
                                        scrollTop: 0
                                    }, 125);
                                }
                            });

                        }]
                },
                'about@home': {
                    templateUrl: 'templates/home.about.html'
                }
            }
        });

        //blog 
        $stateProvider.state('blog', {
            url: '/blog',
            views: {
                'root@': {
                    templateUrl: 'templates/blog.html'
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