angular.module('relocate', ['ngRoute', 'ngMap']);
angular.module('relocate')
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "app/index.html",
        controller: "searchYelpController",
        controllerAs: "searchYelp"
      });
  }])
angular.module('relocate')
  .filter('removeBtagFilter', function () {
      return function (text) {
        var str = text.replace(/<b>|<\/b>/g, '');
        return str;
       };
    });
angular.module('relocate')
  .factory('indeedService', function($http) {
    var getJobs = function(keyword, location) {
      return $http.get('/indeed-api/' + keyword + '/' + location + '/')
    }
    return {
      jobs: getJobs
    }
  });
angular.module('relocate')
  .controller('mainController', function($scope, yelpService, indeedService, walkScoreService, NgMap) {
    vm = this;
    vm.scoreData= [];
    // vm.scoreData.length = 0;
    vm.fetch = function() {
      yelpService.apartments($scope.location)
        .then(function(response, index) {
          vm.businesses = response.data.businesses;
          console.log(vm.businesses);

          // get lat and long from yelp object
          vm.businesses.filter(getLatLong);
          function getLatLong(value, index, array) {
            lat = vm.businesses[index].location.coordinate.latitude;
            long = vm.businesses[index].location.coordinate.longitude;
            //use lat and long in walk score
            walkScoreService.score(lat, long)
              .then(function(response) {
              vm.scoreData.push(response.data);
              console.log(vm.scoreData);
            });
          }

          // map
          NgMap.getMap().then(function(map) {
              vm.map = map;
            });
      });
      indeedService.jobs($scope.keyword, $scope.location)
        .then(function(response) {
          vm.results = response.data.results;
          console.log(vm.results);  
        });
      }
  });
angular.module('relocate')
  .factory('walkScoreService', function($http) {
    var getWalkScore = function(lat, long) {
      return $http.get('/walk-score-api/' + lat + '/' + long + '/')
    }
    return {
      score: getWalkScore
    }
  });
angular.module('relocate')
  .factory('yelpService', function($http) {
    var getApartments = function(location) {
      return $http.get('/yelp-api/' + location + '/0')
    }
    return {
      apartments: getApartments
    }
  });
$('a[href*="#"]:not([href="#"])').click(function() {
     if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
         || location.hostname == this.hostname) {
 
         var target = $(this.hash);
         target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
              $('html,body').animate({
                  scrollTop: target.offset().top
             }, 1000);
             return false;
         }
     }
 });

$(window).scroll(function() {
 if ($(this).scrollTop() < 350){  
    $('input').removeClass("sticky");
    $('form').removeClass("nav");
    $('form').addClass("input-group");
  }
  if ($(this).scrollTop() > 350){  
    $('input').addClass("sticky");
    $('form').removeClass("input-group");
    $('form').addClass("nav");
  } 
});