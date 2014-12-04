//////////////////
//Scroll Service//
//////////////////

var Scroll = angular.module('Scroll', ['ui.router']);

Scroll.factory('scrollFactory', ['$state',

  function($state) {
    var SELECTOR = {
      "uiview": 0x0010,
      "id": 0x0020,
      "concise": 0x0030
    };
    var scrollTo = function(type, sectionId, time) {
      time = time || 0;
      if (sectionId == '') {
        type = 0;
      }
      var offset;
      switch (type) {
        case SELECTOR.uiview:
          offset = $('[ui-view="' + sectionId + '"]').first().offset().top;
          break;
        case SELECTOR.id:
          offset = $('#' + sectionId).first().offset().top;
          break;
        case SELECTOR.concise:
          offset = $(sectionId).first().offset().top;
          break;
        default:
          offset = 0;
          break;
      }

      $('html, body').animate({
        scrollTop: offset
      }, time, 'swing', function() {
        //                //INSTEAD OF THIS, PREVENT CLASS FROM CHANGING
        //                $('html, body').animate({
        //                    scrollTop: offset
        //                }, 0);
      });

    };

    var sectionIdScroll = function(time) {
      scrollTo(SELECTOR.uiview, $state.params.sectionId, time);
    };

    return {
      SELECTOR: SELECTOR,
      scrollTo: scrollTo,
      sectionIdScroll: sectionIdScroll
    };
  }
]);
