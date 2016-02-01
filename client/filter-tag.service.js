angular.module('relocate')
  .filter('removeBtagFilter', function () {
      return function (text) {
        var str = text.replace(/<b>|<\/b>/g, '');
        return str;
       };
    });