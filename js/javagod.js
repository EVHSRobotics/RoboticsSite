var Javagod = angular.module('Javagod', []);

Javagod.provider('FJavagod', [

  function () {
        var _dataUrl = 'data_god_blog';
        var _prefix = 'godPost';
        var _dataPostArrayUrl = 'data_god_blog';

        var setDataUrl = function (url) {
            _dataUrl = url;
        };

        var setPrefix = function (prefix) {
            _prefix = prefix;
        };

        var setPostArrayUrl = function (url) {
            _dataPostArrayUrl = url;
        };

        var $get = ['$http',
      function ($http) {
                var dataUrl = _dataUrl;
                var prefix = _prefix;
                var dataPostArrayUrl = _dataPostArrayUrl;

                var postArray = $http.get(dataPostArrayUrl);

                var appendZeroes = function (num, length) {
                    num = '' + num;
                    if (num.length >= length) {
                        return num;
                    } else {
                        return appendZeroes('0' + num, length);
                    }
                };

                var getPostJson = function (postId, callback) {
                    postId = appendZeroes(postId, 4);
                    $http.get(dataUrl + '/' + prefix + postId + '.json')
                        .success(function (data, status, headers, config) {
                            if (callback) {
                                callback(data);
                            }
                        }).error(function (data, status, headers, config) {
                            console.log('javagod failed to retrieve: ' + prefix + postId + '.json', '\nstatus: ' + status);
                        });
                };

                var getPostArray = function (callback) {
                    postArray.success(function (data, status, headers, config) {
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
            setDataUrl: setDataUrl,
            setPrefix: setPrefix,
            setPostArrayUrl: setPostArrayUrl
        };
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
            var export = document.createElement('a');
            export.setAttribute('href', 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.thePost)));
            export.setAttribute('download', 'godPost' + this.thePost.id + '.json');
            export.click();
        };
}]);

Javagod.directive('javagodBlogNav', function () {
    return {
        restrict: 'A',
        scope: {},
        templateUrl: 'templates/godBlogNav.html',
        controller: ['$scope', 'FJavagod',
        function ($scope, FJavagod) {
                FJavagod.getPostArray(function (data) {
                    $scope.blogNav = data;
                });
        }
      ]
        //NEED LINK FUNCTION TO BIND CLASS ACTIVE TO ACTIVE ROUTE
    };
});