angular.module('relocate')
  .controller('mainController', function($scope, yelpService, indeedService, walkScoreService, NgMap) {
    vm = this;
    vm.fetch = function() {
      yelpService.apartments($scope.location)
        .then(function(response) {
          vm.businesses = response.data.businesses;
          console.log(vm.businesses);
          // get walk score for yelp location
          for (i = 0; i < vm.businesses.length; i++){
            lat = vm.businesses[i].location.coordinate.latitude;
            long = vm.businesses[i].location.coordinate.longitude;
            walkScoreService.score(lat, long)
              .then(function(response) {
              vm.scoreData = response.data;
              console.log(vm.scoreData);
            }); 
          }
          // map
          NgMap.getMap().then(function(map) {
              vm.map = map;
            });
      });
      indeedService.jobs($scope.keyword, $scope.location)
        .then(function(response) {
          vm.results = response.data.results;
          console.log(vm.results);  
        });
      }
  });