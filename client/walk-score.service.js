angular.module('relocate')
  .factory('walkScoreService', function($http) {
    var getWalkScore = function(lat, long) {
      return $http.get('/walk-score-api/' + lat + '/' + long + '/')
    }
    return {
      score: getWalkScore
    }
  });