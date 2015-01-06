//////////////////////////////////////////////
//EVHS ROBOTICS : THE PROTOTYPES : TEAM 2854//
//////////////////////////////////////////////
//Kevin Wang: https://github.com/wangkevin1///
//////////////////////////////////////////////

var Robotics = angular.module('Robotics', ['Atlas', 'LogoComponents']);

//////////////////
//JAVAGOD CONFIG//
//////////////////

Robotics.config(['atProvider',
  function (at) {
        //BLOG//
        at
        //Proto Blog//
        .createBlog('proto', 'data/data_proto_blog', 'protoPost', 'data/blogPostArray.json')

        //PAGE//  
        //Home Page//
        .createPage('home', 'templates/home.html')

        //NAV BAR//
        .setBrand('templates/navBrand.html', 'home({sectionId: ""})')
            .addTab('Home', 'home({sectionId: ""})')
            .addTab('About', 'home({sectionId: "about"})')
            .addTab('Officer Bios', 'home({sectionId: "bios"})')
            .addTab('Blog', 'blog.proto({postId:""})')
            .addRightTab('Contact', 'home({sectionId: "contact"})')
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
            templateUrl: 'templates/officerBios.html',
            controller: ['$scope', '$http',
                function ($scope, $http) {
                    $http.get('data/data_bios/officerBios.json')
                        .success(function (data, status, headers, config) {
                            $scope.bios = data;
                        });
                }
            ]
        };
    }
]);