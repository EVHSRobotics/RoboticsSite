//////////////////
//CONFIG SERVICE//
//////////////////

var Config = angular.module('Config', []);

Config.factory('configFactory', [

  function () {
        var CONFIG = {
            "default": "default",
            "navbar": {
                "position": 80,
                "tabs": [
                    {
                        "title": "About",
                        "state": "home({sectionId: 'about'})"
                    },
                    {
                        "title": "Officer Bios", 
                        "state": "home({sectionId: 'bios'})"
                    },
                    {
                        "title": "Blog",
                        "state": "blog.proto({postId:''})"
                    }
                ]
            },
            "sections": {
                "home": [

        ]
            },
            "logo": {
                "icon": {
                    "navbar": {
                        "val": 42,
                        "offsetTop": 12
                    },
                    "large": {
                        "val": 128,
                        "offsetTop": 0
                    }
                },
                "mark": {
                    "navbar": {
                        "val": 56,
                        "offsetTop": 16
                    },
                    "large": {
                        "val": 256,
                        "offsetTop": 0
                    }
                },
                "typographic": {
                    "large": {
                        "val": 192,
                        "offsetTop": 0
                    }
                }
            }
        };

        function get(section) {
            var val = CONFIG;
            for (var i = 0; i < arguments.length; i++) {
                val = val[arguments[i]];
            }
            return val;
        }

        return {
            get: get
        };

  }
]);