/*
##     ##    ###    #### ##    ##
###   ###   ## ##    ##  ###   ##
#### ####  ##   ##   ##  ####  ##
## ### ## ##     ##  ##  ## ## ##
##     ## #########  ##  ##  ####
##     ## ##     ##  ##  ##   ###
##     ## ##     ## #### ##    ##
*/

var Robotics = angular.module('Robotics', ['ui.router', 'ui.utils', 'headroom', 'HeadroomComponents', 'Config', 'Javagod', 'Scroll', 'LogoComponents']);
/*
      #
      #   ##   #    #   ##    ####   ####  #####
      #  #  #  #    #  #  #  #    # #    # #    #
      # #    # #    # #    # #      #    # #    #
#     # ###### #    # ###### #  ### #    # #    #
#     # #    #  #  #  #    # #    # #    # #    #
 #####  #    #   ##   #    #  ####   ####  #####

 #####
#     #  ####  #    # ###### #  ####
#       #    # ##   # #      # #    #
#       #    # # #  # #####  # #
#       #    # #  # # #      # #  ###
#     # #    # #   ## #      # #    #
 #####   ####  #    # #      #  ####
*/

Robotics.config(['FJavagodProvider',
  function (FJavagodProvider) {
        FJavagodProvider.setDataUrl('data/data_god_blog');
        FJavagodProvider.setPrefix('godPost');
        FJavagodProvider.setPostArrayUrl('data/godBlogPostArray.json');
  }
]);

/*
#     #                 ######
##   ##   ##   # #    # #     #  ####  #    # ##### ######  ####
# # # #  #  #  # ##   # #     # #    # #    #   #   #      #
#  #  # #    # # # #  # ######  #    # #    #   #   #####   ####
#     # ###### # #  # # #   #   #    # #    #   #   #           #
#     # #    # # #   ## #    #  #    # #    #   #   #      #    #
#     # #    # # #    # #     #  ####   ####    #   ######  ####
*/

//Base Url Config//

Robotics.config(['$locationProvider',
  function ($locationProvider) {
        //clean urls

        //$locationProvider.html5Mode(true);
  }
]);

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

          }
        ]
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

        //NEEDS TO GO IN A SEPARATE MODULE
        //blog
        $stateProvider.state('blog', {
            url: '/blog/:postId',
            views: {
                'root@': {
                    templateUrl: 'templates/godBlog.html',
                    controller: ['$state', '$scope', 'FJavagod',
            function ($state, $scope, FJavagod) {
                            FJavagod.getPostJson($state.params.postId, function (data) {
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

        //static site engine data creator
        $stateProvider.state('javagod', {
            url: '/javagod',
            views: {
                'root@': {
                    templateUrl: 'templates/javagod.html'
                }
            }
        });
  }
]);


/*
 #####
#     # #       ####  #####    ##   #
#       #      #    # #    #  #  #  #
#  #### #      #    # #####  #    # #
#     # #      #    # #    # ###### #
#     # #      #    # #    # #    # #
 #####  ######  ####  #####  #    # ######

 #####
#     #  ####  #    # ##### #####   ####  #      #      ###### #####
#       #    # ##   #   #   #    # #    # #      #      #      #    #
#       #    # # #  #   #   #    # #    # #      #      #####  #    #
#       #    # #  # #   #   #####  #    # #      #      #      #####
#     # #    # #   ##   #   #   #  #    # #      #      #      #   #
 #####   ####  #    #   #   #    #  ####  ###### ###### ###### #    #
*/

Robotics.controller('mainController', ['configFactory',
  function (configFactory) {
        this.tabs = configFactory.get('navbar', 'tabs');
  }
]);