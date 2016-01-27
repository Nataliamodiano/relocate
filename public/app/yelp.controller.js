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
          vm.data = response.data;
          console.log(JSON.stringify(vm.data.businesses));
          var name = vm.data.businesses;
          console.log(name);
          console.log(name[0].rating);
        });
    }

    // $scope.update = function(apartment) {
    //   $scope.search = apartment.search;
    // };
  }]);