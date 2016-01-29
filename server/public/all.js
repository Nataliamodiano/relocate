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
// angular.module('relocate')
//   .controller('indeedController', function($scope, indeedService) {
//     vm = this;
//     $scope.$watch('keyword', function(keyword) {
//       console.log('here');
//       indeedService.jobs(keyword, $scope.location)
//         .then(function(response) {
//           vm.results = response.data.results;
//           console.log(vm.results);
//         });
//     });
//     $scope.clear = function() {
//       $scope.location = '';
//       $scope.keyword = '';
//     };
//   });
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
          // vm.businesses = response.data.businesses;
            console.log(response);
          });
      indeedService.jobs($scope.keyword, $scope.location)
        .then(function(response) {
          // vm.results = response.data.results;
          console.log(response);
        }); 
    }
  });
// angular.module('relocate')
//   .controller('yelpController', function($scope, yelpService) {
//     vm = this;
//     $scope.$watch('location', function(location) {
//         yelpService.apartments(location)
//         .then(function(response) {
//             vm.businesses = response.data.businesses;
//             console.log(vm.businesses);
//           });
//     });
//     $scope.clear = function() {
//       $scope.location = '';
//     };
//   });
angular.module('relocate')
  .factory('yelpService', function($http) {
    var getApartments = function(location) {
      return $http.get('/yelp-api/' + location + '/0')
    }
    return {
      apartments: getApartments
    }
  });