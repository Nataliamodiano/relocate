angular.module('relocate', ['ngRoute']);
var myApp = angular.module('myApp', ['ngMap']);
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
  .factory('indeedService', function($http) {
    var getJobs = function(keyword, location) {
      return $http.get('/indeed-api/' + keyword + '/' + location + '/')
    }
    return {
      jobs: getJobs
    }
  });
angular.module('relocate')
  .controller('mainController', function($scope, yelpService, indeedService, walkScoreService) {
    vm = this;
    vm.fetch = function() {
      yelpService.apartments($scope.location)
        .then(function(response) {
            vm.businesses = response.data.businesses;
            console.log(vm.businesses);

             for (i = 0; i < vm.businesses.length; i++){
              lat = vm.businesses[i].location.coordinate.latitude;
              long = vm.businesses[i].location.coordinate.longitude;
              walkScoreService.score(lat, long)
                .then(function(response) {
                vm.scoreData = response.data;
                console.log(vm.scoreData);
              });
            }
          });
      indeedService.jobs($scope.keyword, $scope.location)
        .then(function(response) {
          vm.results = response.data.results;
          console.log(vm.results);
        }); 
    }
  });
myApp.controller('MyController', function(NgMap) {
    NgMap.getMap().then(function(map) {
      console.log(map.getCenter());
      console.log('markers', map.markers);
      console.log('shapes', map.shapes);
    });
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
var snippet = document.getElementById('snippet');


