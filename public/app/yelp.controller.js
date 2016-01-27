angular.module('relocate')
  .controller('yelpController', ['$scope','$http', function($scope, $http) {
    vm = this;
    $scope.$watch('search', function() {
      fetch();
    });

    $scope.search = "los angeles";

    function fetch() {
      $http.get('/yelp-api/' + $scope.search + '/0')
        .then(function(response) {
          vm.businesses = response.data.businesses;
        });
    }
    $scope.addName = function() {
      $scope.search = '';
    };
  }]);