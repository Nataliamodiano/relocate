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