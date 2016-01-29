// angular.module('relocate')
//   .controller('indeedController', function($scope, indeedService) {
//     vm = this;
//     $scope.$watch('keyword', function(keyword) {
//       console.log('here');
//       indeedService.jobs(keyword, $scope.location)
//         .then(function(response) {
//           vm.results = response.data.results;
//           console.log(vm.results);
//         });
//     });
//     $scope.clear = function() {
//       $scope.location = '';
//       $scope.keyword = '';
//     };
//   });