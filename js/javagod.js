/*  
 *    $$$$$\                                                        $$\
 *    \__$$ |                                                       $$ |
 *       $$ | $$$$$$\ $$\    $$\ $$$$$$\   $$$$$$\   $$$$$$\   $$$$$$$ |
 *       $$ | \____$$\\$$\  $$  |\____$$\ $$  __$$\ $$  __$$\ $$  __$$ |
 * $$\   $$ | $$$$$$$ |\$$\$$  / $$$$$$$ |$$ /  $$ |$$ /  $$ |$$ /  $$ |
 * $$ |  $$ |$$  __$$ | \$$$  / $$  __$$ |$$ |  $$ |$$ |  $$ |$$ |  $$ |
 * \$$$$$$  |\$$$$$$$ |  \$  /  \$$$$$$$ |\$$$$$$$ |\$$$$$$  |\$$$$$$$ |
 *  \______/  \_______|   \_/    \_______| \____$$ | \______/  \_______|
 *                                       $$\   $$ |
 *                                       \$$$$$$  |
 *                                        \______/
 *
 *  Kevin Wang: https://github.com/wangkevin1
 *
 */

var Javagod = angular.module('Javagod', ['ui.router', 'JavagodUtil']);

//Javagod.config(['$uiViewScrollProvider',
//    function ($uiViewScrollProvider) {
//        $uiViewScrollProvider.useAnchorScroll();
//    }
//]);

/////////
//BLOGS//
/////////

Javagod.provider('FJavagodBlog', ['$stateProvider',
    function ($stateProvider) {
        var _blogs = {};

        var BlogMeta = function (aData, aPrefix, aPostArray) {
            return {
                data: aData,
                prefix: aPrefix,
                postArray: aPostArray
            };
        };

        $stateProvider.state('blog', {
            abstract: true,
            url: '/blog',
            views: {
                'root@': {
                    templateUrl: 'templates/godBlog.html',
                    controller: ['$state', '$scope', 'FJavagodBlog',
                        function ($state, $scope, FJavagodBlog) {
                            $scope.getPost = function (blog, post) {
                                FJavagodBlog.getPostJson(blog, post, function (data) {
                                    $scope.god = data;
                                });
                            };
                            $scope.getArray = function (blog) {
                                FJavagodBlog.getPostArray(blog, function (data) {
                                    $scope.blogNav = data;
                                });
                            };
                        }
                    ]
                }
            }
        });

        var createBlog = function (name, aData, aPrefix, aPostArray) {
            _blogs[name] = new BlogMeta(aData, aPrefix, aPostArray);
            $stateProvider.state('blog.' + name, {
                url: '/' + name + '/:postId',
                views: {
                    'post@blog': {
                        templateUrl: 'templates/godBlogPost.html',
                        controller: ['$state', '$scope',
                            function ($state, $scope) {
                                $scope.getPost(name, $state.params.postId);
                            }
                        ]
                    },
                    'nav@blog': {
                        templateUrl: 'templates/godBlogNav.html',
                        controller: ['$scope',
                            function ($scope) {
                                $scope.blog = name;
                                $scope.getArray(name);
                        }]
                    }
                }
            });
        };

        var $get = ['$http',
            function ($http) {
                var blogs = _blogs;

                var getPostJson = function (blogName, postId, callback) {
                    if (postId == '') {
                        getPostArray(blogName, function (data) {
                            postId = data[0].id;
                            var blog = blogs[blogName];
                            $http.get(blog.data + '/' + blog.prefix + postId + '.json')
                                .success(function (data, status, headers, config) {
                                    if (callback) {
                                        callback(data);
                                    }
                                }).error(function (data, status, headers, config) {
                                    console.error('javagod failed to retrieve: ' + blog.prefix + postId + '.json', '\nstatus: ' + status);
                                });
                        });
                    } else {
                        var blog = blogs[blogName];
                        $http.get(blog.data + '/' + blog.prefix + postId + '.json')
                            .success(function (data, status, headers, config) {
                                if (callback) {
                                    callback(data);
                                }
                            }).error(function (data, status, headers, config) {
                                console.error('javagod failed to retrieve: ' + blog.prefix + postId + '.json', '\nstatus: ' + status);
                            });
                    }
                };

                var getPostArray = function (blogName, callback) {
                    $http.get(blogs[blogName].postArray).success(function (data, status, headers, config) {
                        if (callback) {
                            callback(data);
                        }
                    });
                };

                return {
                    getPostJson: getPostJson,
                    getPostArray: getPostArray
                };
            }
        ];

        return {
            $get: $get,
            createBlog: createBlog
        };
    }
]);


////////////////
//POST CREATOR//
////////////////

Javagod.config(['$stateProvider',
    function ($stateProvider) {
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

Javagod.constant('GOD_POST_SECTION_TYPE', {
    text: 0x0010,
    image: 0x0020,
    video: 0x0030
});

Javagod.factory('FGodPostSection', ['GOD_POST_SECTION_TYPE',
    function (GOD_POST_SECTION_TYPE) {
        var PostSection = function (aType, aContent, aCaption) {
            aContent = aContent || '';
            switch (aType) {
            case GOD_POST_SECTION_TYPE.text:
                return {
                    type: 'text',
                    content: aContent
                };
                break;
            case GOD_POST_SECTION_TYPE.image:
                aCaption = aCaption || '';
                return {
                    type: 'image',
                    content: aContent,
                    caption: aCaption
                };
                break;
            case GOD_POST_SECTION_TYPE.video:
                return {
                    type: 'video',
                    content: aContent,
                };
                break;
            }
        };
        return PostSection;
}]);

Javagod.controller('CPostCreator', ['$scope', 'FGodPostSection', 'GOD_POST_SECTION_TYPE',
    function ($scope, PostSection, GOD_POST_SECTION_TYPE) {
        this.thePost = {
            id: "",
            title: "",
            subtitle: "",
            date: "",
            author: "",
            sections: []
        };

        this.SECTION_TYPE = GOD_POST_SECTION_TYPE;

        this.addSection = function (sect) {
            this.thePost.sections.push(new PostSection(sect));
        };

        this.deleteSection = function (sectId) {
            this.thePost.sections.splice(sectId, 1);
        };

        this.dateSetToday = function () {
            $scope.godPost.date.$setViewValue('');
            this.thePost.date = moment().format('YYYYMMDD');
        };

        this.addSection(GOD_POST_SECTION_TYPE.text);

        this.exportJson = function () {
            var e = document.createElement('a');
            e.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.thePost)));
            e.setAttribute('download', 'godPost' + this.thePost.id + '.json');
            e.click();
        };
}]);


/////////
//PAGES//
/////////

Javagod.provider('FJavagodPage', ['$stateProvider',
    function ($stateProvider) {
        var _pages = {};

        var PageMeta = function (aData) {
            return {
                data: aData
            };
        };

        var createPage = function (name, aData) {
            _pages[name] = new PageMeta(aData);
            $stateProvider.state(name, {
                url: '/' + name + '/:sectionId',
                views: {
                    'root@': {
                        templateUrl: aData,
                        controller: ['$state', '$scope', '$uiViewScroll',
                            function ($state, $scope, $uiViewScroll) {
                                $scope.$on('$stateChangeSuccess', function (e) {
                                    if ($state.params.sectionId == '') {
                                        $('body').animate({scrollTop: '0'}, 64);
                                    } else {
                                        $uiViewScroll($('#' + $state.params.sectionId));
                                    }
                                });
                            }
                        ]
                    }
                }
            });
        };

        var $get = [

            function () {
                var pages = _pages;

                return {

                };
            }
        ];

        return {
            $get: $get,
            createPage: createPage
        };
    }
]);


console.log('%c\n' +
    '    $$$$$\\                                                        $$\\ \n' +
    '    \\__$$ |                                                       $$ |\n' +
    '       $$ | $$$$$$\\ $$\\    $$\\ $$$$$$\\   $$$$$$\\   $$$$$$\\   $$$$$$$ |\n' +
    '       $$ | \\____$$\\\\$$\\  $$  |\\____$$\\ $$  __$$\\ $$  __$$\\ $$  __$$ |\n' +
    ' $$\\   $$ | $$$$$$$ |\\$$\\$$  / $$$$$$$ |$$ /  $$ |$$ /  $$ |$$ /  $$ |\n' +
    ' $$ |  $$ |$$  __$$ | \\$$$  / $$  __$$ |$$ |  $$ |$$ |  $$ |$$ |  $$ |\n' +
    ' \\$$$$$$  |\\$$$$$$$ |  \\$  /  \\$$$$$$$ |\\$$$$$$$ |\\$$$$$$  |\\$$$$$$$ |\n' +
    '  \\______/  \\_______|   \\_/    \\_______| \\____$$ | \\______/  \\_______|\n' +
    '                                       $$\\   $$ |                    \n' +
    '                                       \\$$$$$$  |                    \n' +
    '                                        \\______/                     \n' +
    '\n' +
    'Kevin Wang: https://github.com/wangkevin1                            \n\n ',
    'font-family: Consolas, Monaco, monospace; color: #bc2200');