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
  .controller('indeedController', ['$scope','$http', function($scope, $http) {
    vm = this;
    $scope.$watch('keyword', function() {
      fetch();
    });

    $scope.keyword = 'java';
    $scope.location = 'brea';

    function fetch() {
      $http.get('/indeed-api/' + $scope.keyword + '/' + $scope.location + '/')
        .then(function(response) {
          vm.results = response.data.results;
          console.log(vm.results);
        });
    }
    $scope.clear = function() {
      $scope.location = '';
      $scope.keyword = '';
    };
  }]);
// angular.module('relocate')
//   .controller('yelpController', ['$scope','$http', function($scope, $http) {
//     vm = this;
//     $scope.$watch('location', function() {
//       fetch();
//     });

//     $scope.location = "";

//     function fetch() {
//       $http.get('/yelp-api/' + $scope.location + '/0')
//         .then(function(response) {
//           vm.businesses = response.data.businesses;
//           console.log(vm.businesses);
//         });
//     }
//     $scope.clear = function() {
//       $scope.location = '';
//     };
//   }]);