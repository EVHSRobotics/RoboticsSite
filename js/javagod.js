var Javagod = angular.module('Javagod', ['ui.router']);

/////////
//BLOGS//
/////////

Javagod.config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('blog', {
            abstract: true,
            url: '/blog', //try url with blogId parameter 
            views: {
                'root@': {
                    templateUrl: 'templates/godBlog.html',
                    controller: ['$state', '$scope', 'FJavagod',
                        function ($state, $scope, FJavagod) {
                            $scope.getPost = function (blog, post) {
                                FJavagod.getPostJson(blog, post, function (data) {
                                    $scope.god = data;
                                });
                            };
                        }
                    ]
                }
            }
        });
    }
]);

Javagod.provider('FJavagod', [

    function () {

        var _blogs = {};

        var BlogMeta = function (aData, aPrefix, aPostArray) {
            return {
                data: aData,
                prefix: aPrefix,
                postArray: aPostArray
            };
        };

        var createBlog = function (name, aData, aPrefix, aPostArray) {
            _blogs[name] = new BlogMeta(aData, aPrefix, aPostArray);
            console.count(name);
            Javagod.config(['$stateProvider',
                function ($stateProvider) {
                    console.count(name);
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
                            }
                        }
                    });
                    console.count(name);
                }
            ]);
        };

        var deleteBlog = function (name) {
            delete _blogs[name];
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
            createBlog: createBlog,
            deleteBlog: deleteBlog
        };
  }
]);

/////////
//PAGES//
/////////

Javagod.config(['$stateProvider',
    function ($stateProvider) {
        $stateProvider.state('page', {
            abstract: true,
            url: '',
            views: {
                'root@': {
                    templateUrl: 'templates/godBlog.html',
                    controller: ['$state', '$scope', 'FJavagod',
                        function ($state, $scope, FJavagod) {

                        }
                    ]
                }
            }
        });
    }
]);

Javagod.provider('FJavagodPage', [

    function () {
        var _pages = {};

        var PageMeta = function (aData) {
            return {
                data: aData
            };
        };

        var createPage = function (name, aData) {
            _pages[name] = new PageMeta(aData);
        };

        var deletePage = function (name) {
            delete _pages[name];
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
            createPage: createPage,
            deletePage: deletePage
        };
    }
]);

////////////////
//POST CREATOR//
////////////////

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

////////////////
//PAGE CREATOR//
////////////////

Javagod.factory('FGodPageSection', [

    function () {
        var PageSection = function () {
            return {
                state: "",
                title: "",
                subtitle: "",
                content: "" //this should be a url to an html template
            };
        };

        return PageSection;
    }
]);

Javagod.controller('CPageCreator', ['$scope', 'FGodPageSection',
    function ($scope, PageSection) {
        this.thePage = {
            state: "",
            content: "", //this will be a url to an html template 
            sections: []
        };

        this.addSection = function () {
            this.thePage.sections.push(new PageSection());
        };

        this.deleteSection = function (sectId) {
            this.thePage.sections.splice(sectId, 1);
        };
    }
]);

///////////////////
//BLOG NAVIGATION//
///////////////////

Javagod.directive('javagodBlogNav', function () {
    return {
        restrict: 'A',
        scope: {
            blogName: '@javagodBlogNav'
        },
        templateUrl: 'templates/godBlogNav.html',
        controller: ['$scope', 'FJavagod',
            function ($scope, FJavagod) {
                FJavagod.getPostArray($scope.blogName, function (data) {
                    $scope.blogNav = data;
                });
            }
        ]
        //NEED LINK FUNCTION TO BIND CLASS ACTIVE TO ACTIVE ROUTE
    };
});

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
    'font-family: Consolas, monospace; color: #bc2200');