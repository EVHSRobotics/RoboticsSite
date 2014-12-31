//////////////////////////////////////////////
//EVHS ROBOTICS : THE PROTOTYPES : TEAM 2854//
//////////////////////////////////////////////
//Kevin Wang: https://github.com/wangkevin1///
//////////////////////////////////////////////

var Robotics = angular.module('Robotics', ['ui.router', 'ui.utils', 'headroom', 'HeadroomComponents', 'Javagod', 'JavagodUtil', 'LogoComponents']);

//////////////////
//JAVAGOD CONFIG//
//////////////////

Robotics.config(['godRouterProvider', 'FJavagodBlogProvider', 'FJavagodPageProvider', 'FJavagodNavProvider',
  function (godRouterProvider, blogProvider, pageProvider, navProvider) {
        //BLOG//
        blogProvider
        //Proto Blog//
        .createBlog('proto', 'data/data_god_blog', 'godPost', 'data/godBlogPostArray.json');

        //PAGE//  
        pageProvider
        //Home Page//
        .createPage('home', 'templates/home.html');

        //NAV BAR//
        navProvider
            .addTab('Home', 'home({sectionId: ""})')
            .addTab('About', 'home({sectionId: "about"})')
            .addTab('Officer Bios', 'home({sectionId: "bios"})')
            .addTab('Blog', 'blog.proto({postId:""})');
        godRouterProvider
        //Default Route//
        .defaultRoute('/home/');
    }
]);

//////////////
//COMPONENTS//
//////////////

Robotics.directive('officerBios', [

    function () {
        return {
            restrict: 'A',
            scope: {

            },
            templateUrl: '',
            controller: [
                function () {

                }
            ]
        }
    }
]);