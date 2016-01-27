angular.module('relocate', ['ngRoute']);
angular.module('relocate')
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when("/", {
        templateUrl: "app/index.html",
        controller: "searchYelpController",
        controllerAs: "searchYelp"
      });
  }])
var relocate = angular.module('relocate');

relocate.controller('searchYelpController', function (yelpService) {
  vm = this;
  vm.title = "This is yelp";
  yelpService.apartment()
    .then(function success(response) {
    vm.data = response.data.data;
    console.log(vm.data);
    })
});

relocate.factory('yelpService', function($http) {
    var getApartments= function(){
      return $http({
      method: 'GET',
      url: 'http://localhost:8080/yelp-api/' + location + '/' + sort
    })
  }
  return {
    apartment: getApartments
    }
  });