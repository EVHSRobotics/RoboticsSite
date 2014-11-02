////////////
//MAIN APP//
////////////

var Robotics = angular.module('Robotics', ['ui.router', 'Config', 'Components']);

///////////////
//MAIN ROUTES//
///////////////

Robotics.config(['$stateProvider', '$urlRouterProvider',
    function ($stateProvider, $urlRouterProvider) {
        //redirect to home 
        $urlRouterProvider.otherwise('/home/');

        //States// 

        //home 
        $stateProvider.state('home', {
            abstract: true,
            url: '/home/:sectionId',
            controller: ['$state', '$uiViewScroll',
                function ($state, $uiViewScroll) {
                    console.log($('#'+$state.params.sectionId));
                    //make this a service 
                    if($state.params.sectionId) {
                        var position = $('[ui-view='+$state.params.sectionId+']').scrollTop();
                        console.log(position);
                        
                    }
            }],
            templateUrl: 'templates/home.html',
        });

        $stateProvider.state('home.main', {
            url: '',
            views: {
                'about': {
                    templateUrl: 'templates/home.about.html'
                }
            }
        });

        //blog 
        $stateProvider.state('blog', {
            url: '/blog',
            templateUrl: 'templates/blog.html'
        });
}]);

/////////////////////
//GLOBAL CONTROLLER//
/////////////////////

Robotics.controller('mainController', ['configFactory',
    function (configFactory) {
        this.tabs = configFactory.get('navbar', 'tabs');
}]);