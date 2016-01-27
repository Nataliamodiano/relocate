angular.module('relocate', ['ngRoute']);
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
  .controller('yelpController', ['$scope','$http', function($scope, $http) {
    $scope.$watch('search', function() {
      fetch();
    });

    $scope.search = "los angeles";
    $scope.sort = 0;

    function fetch() {
      $http.jsonp('/yelp-api/' + $scope.search + '/' + $scope.sort)
        .then(function(response) {
          $scope.details = response.data;
        });
    }

    // $scope.update = function(apartment) {
    //   $scope.search = apartment.search;
    // };
  }]);