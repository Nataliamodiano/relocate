angular.module('relocate')
  .controller('yelpController', ['$scope','$http', function($scope, $http) {
    vm = this;
    $scope.$watch('search', function() {
      fetch();
    });

    vm.search = "los angeles";
    $scope.sort = 0;

    function fetch() {
      $http.get('/yelp-api/' + vm.search + '/' + $scope.sort)
        .then(function(response) {
          vm.data = response.data;
        });
    }

    // $scope.update = function(apartment) {
    //   $scope.search = apartment.search;
    // };
  }]);