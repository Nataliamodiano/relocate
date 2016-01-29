angular.module('relocate')
  .controller('mainController', function($scope, yelpService, indeedService) {
    vm = this;
    $scope.$watch('location', function(location) {
        console.log('here');
        yelpService.apartments(location)
        .then(function(response) {
            vm.businesses = response.data.businesses;
            console.log(vm.businesses);
          });
    });
    $scope.$watch('keyword', function(keyword, location) {
      indeedService.jobs(keyword, location)
        .then(function(response) {
          vm.results = response.data.results;
          console.log(vm.results);
        });
    });
    $scope.clear = function() {
      $scope.location = '';
      $scope.keyword = '';
    };
  });