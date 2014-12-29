//////////////////////////////////////////////
//EVHS ROBOTICS : THE PROTOTYPES : TEAM 2854//
//////////////////////////////////////////////
//Kevin Wang: https://github.com/wangkevin1///
//////////////////////////////////////////////

var Robotics = angular.module('Robotics', ['ui.router', 'ui.utils', 'headroom', 'HeadroomComponents', 'Config', 'Javagod', 'JavagodUtil', 'LogoComponents']);

//////////////
//PRODUCTION//
//////////////

Robotics.config(['$compileProvider',
    function ($compileProvider) {
        $compileProvider.debugInfoEnabled(false);
    }
]);

//////////////////
//JAVAGOD CONFIG//
//////////////////

Robotics.config(['FJavagodBlogProvider', 'FJavagodPageProvider',
  function (BlogProvider, PageProvider) {
        //Proto Blog//
        BlogProvider.createBlog('proto', 'data/data_god_blog', 'godPost', 'data/godBlogPostArray.json');
        //Home Page//
        PageProvider.createPage('home', 'templates/home.html');
  }
]);

///////////////
//MAIN ROUTES//
///////////////

//Base Url Config//
Robotics.config(['$locationProvider',
  function ($locationProvider) {
        //clean urls

        //$locationProvider.html5Mode(true);
  }
]);

/////////////////////
//GLOBAL CONTROLLER//
/////////////////////

Robotics.controller('mainController', ['configFactory', '$state',
  function (configFactory, $state) {
        this.tabs = configFactory.get('navbar', 'tabs');
  }
]);