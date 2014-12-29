//////////////////////////////////////////////
//EVHS ROBOTICS : THE PROTOTYPES : TEAM 2854//
//////////////////////////////////////////////
//Kevin Wang: https://github.com/wangkevin1///
//////////////////////////////////////////////

var Robotics = angular.module('Robotics', ['ui.router', 'ui.utils', 'headroom', 'HeadroomComponents', 'Javagod', 'JavagodUtil', 'LogoComponents']);

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

Robotics.config(['FJavagodBlogProvider', 'FJavagodPageProvider', 'FJavagodNavProvider',
  function (BlogProvider, PageProvider, NavProvider) {
        //Proto Blog//
        BlogProvider
            .createBlog('proto', 'data/data_god_blog', 'godPost', 'data/godBlogPostArray.json');
        //Home Page//
        PageProvider
            .createPage('home', 'templates/home.html');
        //NAV BAR//
        NavProvider
            .addTab('Home', 'home({sectionId: ""})')
            .addTab('About', 'home({sectionId: "about"})')
            .addTab('Officer Bios', 'home({sectionId: "bios"})')
            .addTab('Blog', 'blog.proto({postId:""})');
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

//Redirect to Home//
Robotics.config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home/');
  }
]);