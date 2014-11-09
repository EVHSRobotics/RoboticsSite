//////////////////
//CONFIG SERVICE//
//////////////////

var Config = angular.module('Config', []);

Config.factory('configFactory', [

    function () {
        var CONFIG = {
            "default": "default",
            "timer": {
                "mainDate": "2015-2-3"
            },
            "navbar": {
                "position": 80,
                "tabs": [
                    {
                        "title": "About",
                        "state": "home({sectionId: 'about'})"
            },
                    {
                        "title": "Blog",
                        "state": "blog"
            }
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
            for(var i = 0; i < arguments.length; i++) {
                val = val[arguments[i]];
            }
            return val;
        }
        
//        function get(section, base) {
//            base = base || CONFIG;
//            if (section.length < 2) {
//                return base[section.shift()];
//            } else {
//                var subsection = section.shift();
//                return get(section, base[subsection]);
//            }
//        }

        return {
            get: get
        };

}]);