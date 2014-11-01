var Robotics = angular.module('Robotics', ['ui.router']);

Robotics.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    //redirect to home 
    $urlRouterProvider.otherwise("/home");
    
    //states 
    $stateProvider.state('home', {
        url: "/home", 
        templateUrl: "templates/home.html"
    });
}]);