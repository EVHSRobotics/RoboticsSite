var Javagod = angular.module('Javagod', []);

/////////
//BLOGS//
/////////

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
        };

        var deleteBlog = function (name) {
            delete _blogs[name];
        }

        var $get = ['$http',
            function ($http) {
                var blogs = _blogs;

                var getPostJson = function (blogName, postId, callback) {
                    var blog = blogs[blogName];
                    $http.get(blog.data + '/' + blog.prefix + postId + '.json')
                        .success(function (data, status, headers, config) {
                            if (callback) {
                                callback(data);
                            }
                        }).error(function (data, status, headers, config) {
                            console.log('javagod failed to retrieve: ' + prefix + postId + '.json', '\nstatus: ' + status);
                        });
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

Javagod.provider('FJavagodPage', [

    function () {
        var _pages = {};

        var PageMeta = function (aData) {
            return {
                data: aData
            };
        }

        var createPage = function (name, aData) {
            _pages[name] = new PageMeta(aData);
        };

        var deletePage = function (name) {
            delete _pages[name];
        }

        var $get = [

            function () {
                var pages = _pages;

                return {


                }
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
            var export = document.createElement('a');
            export.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.thePost)));
            export.setAttribute('download', 'godPost' + this.thePost.id + '.json');
            export.click();
        };
}]);

////////////////
//PAGE CREATOR//
////////////////

Javagod.factory('FGodPageSection', [
    var PageSection = function () {
        return {
            state: "",
            title: "", 
            subtitle: "", 
            content: "" //this should be a url to an html template
        };
    };

    return PageSection;
]);

Javagod.controller('CPageCreator', ['$scope', 'FGodPageSection',
    function ($scope, FGodPageSection) {
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