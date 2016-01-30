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
  .controller('mainController', function($scope, yelpService, indeedService) {
    vm = this;
    vm.fetch = function() {
      yelpService.apartments($scope.location)
        .then(function(response) {
            vm.businesses = response.data.businesses;
            console.log(vm.businesses);
          });
      indeedService.jobs($scope.keyword, $scope.location)
        .then(function(response) {
          vm.results = response.data.results;
          console.log(vm.results);
        }); 
    }
    vm.showDetails = function() {
      alert('hi');
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
  .factory('yelpService', function($http) {
    var getApartments = function(location) {
      return $http.get('/yelp-api/' + location + '/0')
    }
    return {
      apartments: getApartments
    }
  });