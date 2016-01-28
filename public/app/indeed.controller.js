angular.module('relocate')
  .controller('indeedController', ['$scope','$http', function($scope, $http) {
    vm = this;
    $scope.$watch('keyword', function() {
      fetch();
    });

    $scope.keyword = 'java';
    $scope.location = 'brea';

    function fetch() {
      $http.get('/indeed-api/' + $scope.keyword + '/' + $scope.location + '/')
        .then(function(response) {
          vm.results = response.data.results;
          console.log(vm.results);
        });
    }
    $scope.clear = function() {
      $scope.location = '';
      $scope.keyword = '';
    };
  }]);