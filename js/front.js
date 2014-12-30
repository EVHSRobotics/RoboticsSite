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

Robotics.config(['godRouterProvider',
  function (godRouterProvider) {
      godRouterProvider
        //Proto Blog//
            .createBlog('proto', 'data/data_god_blog', 'godPost', 'data/godBlogPostArray.json')
        //Home Page//
            .createPage('home', 'templates/home.html')
        //NAV BAR//
            .addTab('Home', 'home({sectionId: ""})')
            .addTab('About', 'home({sectionId: "about"})')
            .addTab('Officer Bios', 'home({sectionId: "bios"})')
            .addTab('Blog', 'blog.proto({postId:""})')
        //Default Route//
            .defaultRoute('/home/')
      ;
    }
]);
