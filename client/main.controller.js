angular.module('relocate')
  .controller('mainController', function($scope, yelpService, indeedService, walkScoreService, NgMap) {
    vm = this;
    vm.fetch = function() {
      yelpService.apartments($scope.location)
        .then(function(response, index) {
          vm.businesses = response.data.businesses;
          console.log(vm.businesses);

          // get lat and long from yelp object
          vm.businesses.filter(getLatLong);
          function getLatLong(value, index, array) {
            lat = vm.businesses[index].location.coordinate.latitude;
            long = vm.businesses[index].location.coordinate.longitude;
            //use lat and long in walk score
            walkScoreService.score(lat, long)
              .then(function(response) {
              vm.businesses[index].walkScore = response.data;
              //console.log(vm.businesses[index].walkScore);
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