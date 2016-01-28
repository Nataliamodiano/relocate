angular.module('relocate')
  .controller('yelpController', ['$scope','$http', function($scope, $http) {
    vm = this;
    $scope.$watch('location', function() {
      fetch();
    });

    $scope.location = "";

    function fetch() {
      $http.get('/yelp-api/' + $scope.location + '/0')
        .then(function(response) {
          vm.businesses = response.data.businesses;
          console.log(vm.businesses);
        });
    }
    $scope.clear = function() {
      $scope.location = '';
    };
  }]);