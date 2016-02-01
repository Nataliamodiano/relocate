angular.module('relocate', ['ngRoute', 'ngMap']);
// angular.module('myApp', ['ngMap']);
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
  .filter('removeBtagFilter', function () {
      return function (text) {
        var str = text.replace(/<b>|<\/b>/g, '');
        return str;
       };
    });
angular.module('relocate')
  .factory('indeedService', function($http) {
    var getJobs = function(keyword, location) {
      return $http.get('/indeed-api/' + keyword + '/' + location + '/')
    }
    return {
      jobs: getJobs
    }
  });
angular.module('relocate')
  .controller('mainController', function($scope, yelpService, indeedService, walkScoreService, NgMap) {
    vm = this;
    vm.fetch = function() {
      yelpService.apartments($scope.location)
        .then(function(response) {
          vm.businesses = response.data.businesses;
          console.log(vm.businesses);

          for (i = 0; i < vm.businesses.length; i++){
            lat = vm.businesses[i].location.coordinate.latitude;
            long = vm.businesses[i].location.coordinate.longitude;
            walkScoreService.score(lat, long)
              .then(function(response) {
              vm.scoreData = response.data;
              console.log(vm.scoreData);
            });
          }

          NgMap.getMap().then(function(map) {
            console.log(map.getCenter());
            console.log('markers', map.markers);
            console.log('shapes', map.shapes);
          });
      });
      indeedService.jobs($scope.keyword, $scope.location)
        .then(function(response) {
          vm.results = response.data.results;
          console.log(vm.results);  
        
          NgMap.getMap().then(function(map) {
            console.log(map.getCenter());
            console.log('markers', map.markers);
            console.log('shapes', map.shapes);
          });
        });
      }
  });

  // .controller('mapController', function($http, NgMap) {
  //     var vm = this;
  //     vm.positions = [
  //       [54.779951, 9.334164], [47.209613, 15.991539],
  //       [51.975343, 7.596731], [51.97539, 7.596962], 
  //       [47.414847, 8.23485], [47.658028, 9.159596],
  //       [47.525927, 7.68761], [50.85558, 9.704403],
  //       [54.320664, 10.285977], [49.214374, 6.97506],
  //       [52.975556, 7.596811], [52.975556, 7.596811],
  //       [52.975556, 7.596811], [52.975556, 7.596811], 
  //       [52.975556, 7.596811], [52.975556, 7.596811],
  //       [52.975556, 7.596811], [52.975556, 7.596811],
  //       [52.975556, 7.596811], [52.975556, 7.596811]];
        
  //       vm.dynMarkers = []
  //       NgMap.getMap().then(function(map) {
  //         var bounds = new google.maps.LatLngBounds();
  //         for (var k in map.customMarkers) {
  //           var cm = map.customMarkers[k];
  //           vm.dynMarkers.push(cm);
  //           bounds.extend(cm.getPosition());
  //         };
          
  //         vm.markerClusterer = new MarkerClusterer(map, vm.dynMarkers, {});
  //         map.setCenter(bounds.getCenter());
  //         map.fitBounds(bounds);  
  //      });
  //   });


// var app = angular.module('myApp', ['ngMap']);

// app.controller('mapController', function($http, $interval, NgMap) {
//   var vm = this;
//   vm.positions = [
//     [54.779951, 9.334164], [47.209613, 15.991539],
//     [51.975343, 7.596731], [51.97539, 7.596962], 
//     [47.414847, 8.23485], [47.658028, 9.159596],
//     [47.525927, 7.68761], [50.85558, 9.704403],
//     [54.320664, 10.285977], [49.214374, 6.97506],
//     [52.975556, 7.596811], [52.975556, 7.596811],
//     [52.975556, 7.596811], [52.975556, 7.596811], 
//     [52.975556, 7.596811], [52.975556, 7.596811],
//     [52.975556, 7.596811], [52.975556, 7.596811],
//     [52.975556, 7.596811], [52.975556, 7.596811]];
    
//     vm.dynMarkers = []
//     NgMap.getMap().then(function(map) {
//       var bounds = new google.maps.LatLngBounds();
//       for (var k in map.customMarkers) {
//         var cm = map.customMarkers[k];
//         vm.dynMarkers.push(cm);
//         bounds.extend(cm.getPosition());
//       };
      
//       vm.markerClusterer = new MarkerClusterer(map, vm.dynMarkers, {});
//       map.setCenter(bounds.getCenter());
//       map.fitBounds(bounds);  
//    });
// });
angular.module('relocate')
  .factory('walkScoreService', function($http) {
    var getWalkScore = function(lat, long) {
      return $http.get('/walk-score-api/' + lat + '/' + long + '/')
    }
    return {
      score: getWalkScore
    }
  });
angular.module('relocate')
  .factory('yelpService', function($http) {
    var getApartments = function(location) {
      return $http.get('/yelp-api/' + location + '/0')
    }
    return {
      apartments: getApartments
    }
  });
$('a[href*="#"]:not([href="#"])').click(function() {
     if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
         || location.hostname == this.hostname) {
 
         var target = $(this.hash);
         target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
            if (target.length) {
              $('html,body').animate({
                  scrollTop: target.offset().top
             }, 1000);
             return false;
         }
     }
 });

$(window).scroll(function() {
 if ($(this).scrollTop() < 350){  
    $('input').removeClass("sticky");
    $('form').removeClass("nav");
    $('form').addClass("input-group");
  }
  if ($(this).scrollTop() > 350){  
    $('input').addClass("sticky");
    $('form').removeClass("input-group");
    $('form').addClass("nav");
  } 
});