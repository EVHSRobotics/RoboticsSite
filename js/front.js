/*
##     ##    ###    #### ##    ##
###   ###   ## ##    ##  ###   ##
#### ####  ##   ##   ##  ####  ##
## ### ## ##     ##  ##  ## ## ##
##     ## #########  ##  ##  ####
##     ## ##     ##  ##  ##   ###
##     ## ##     ## #### ##    ##
*/

var Robotics = angular.module('Robotics', ['ui.router', 'ui.utils', 'headroom', 'HeadroomComponents', 'Config', 'Javagod', 'JavagodUtil', 'Scroll', 'LogoComponents']);
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
        FJavagodProvider.createBlog('proto', 'data/data_god_blog', 'godPost', 'data/godBlogPostArray.json');
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
            },
            'bios@home': {
                templateUrl: 'templates/home.bios.html'
            }
        };

        //home
        $stateProvider.state('home', {
            url: '/home/:sectionId',

            views: homeViews
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

var state;

Robotics.controller('mainController', ['configFactory', '$state',
  function (configFactory, $state) {
        this.tabs = configFactory.get('navbar', 'tabs');
        state = $state;
  }
]);