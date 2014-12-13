var Javagod = angular.module('Javagod', []);

Javagod.provider('FJavagod', [

  function() {
    var _dataUrl = 'data_god_blog';
    var _prefix = 'godPost';
    var _dataPostArrayUrl = 'data_god_blog';

    var setDataUrl = function(url) {
      _dataUrl = url;
    };

    var setPrefix = function(prefix) {
      _prefix = prefix;
    };

    var setPostArrayUrl = function(url) {
      _dataPostArrayUrl = url;
    };

    var $get = ['$http',
      function($http) {
        var dataUrl = _dataUrl;
        var prefix = _prefix;
        var dataPostArrayUrl = _dataPostArrayUrl;

        var postArray = $http.get(dataPostArrayUrl);

        var appendZeroes = function(num, length) {
          num = '' + num;
          if (num.length >= length) {
            return num;
          } else {
            return appendZeroes('0' + num, length);
          }
        };

        var getPostJson = function(postId, callback) {
          postId = appendZeroes(postId, 4);
          $http.get(dataUrl + '/' + prefix + postId + '.json')
            .success(function(data, status, headers, config) {
              if (callback) {
                callback(data);
              }
            }).error(function(data, status, headers, config) {
              console.log('javagod failed to retrieve: ' + prefix + postId + '.json', '\nstatus: ' + status);
            });
        };

        var getPostArray = function(callback) {
          postArray.success(function(data, status, headers, config) {
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

Javagod.controller('CPostCreator', ['$scope', function($scope) {
  this.title="";
  this.subtitle="";
  this.date="";
  this.author="";
  this.sections = [];

  this.SECTION_TYPE = {
    text: 0x0010,
    image: 0x0020,
    video: 0x0030
  };

  this.Section = function(aType, aContent) {
    aContent = aContent || '';
    return{
      type: aType,
      content: aContent
    };
  };

  this.addSection = function(sect) {
    sect = sect || new Section(SECTION_TYPE.text);
    sections.push(sect);
  };

  this.deleteSection = function(sectId) {
    sections;
  };

  this.dateSetToday = function() {
    $scope.godPost.date.$setViewValue('');
    this.date = moment().format('YYYYMMDD');
  };
}]);

Javagod.directive('javagodBlogNav', function() {
  return {
    restrict: 'A',
    scope: {},
    templateUrl: 'templates/godBlogNav.html',
    controller: ['$scope', 'FJavagod',
        function($scope, FJavagod) {
          FJavagod.getPostArray(function(data) {
            $scope.blogNav = data;
          });
        }
      ]
      //NEED LINK FUNCTION TO BIND CLASS ACTIVE TO ACTIVE ROUTE
  };
});
