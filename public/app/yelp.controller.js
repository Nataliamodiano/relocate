angular.module('relocate')
  .controller('yelpController', function($scope, yelpService) {
    vm = this;
    $scope.$watch('location', function(location) {
        yelpService.apartments(location)
        .then(function(response) {
            vm.businesses = response.data.businesses;
            console.log(vm.businesses);
          });
    });
    $scope.clear = function() {
      $scope.location = '';
    };
  });