angular.module('relocate', ['ngRoute']);
var myApp = angular.module('myApp', ['ngMap']);
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
          var name = vm.data.businesses;
          for (i = 0; i < name.length; i++){
            console.log(name[i].name);
          }
        });
    }

    // $scope.update = function(apartment) {
    //   $scope.search = apartment.search;
    // };
  }]);