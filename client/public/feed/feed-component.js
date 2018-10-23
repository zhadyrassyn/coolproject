angular
  .module('feedModule')
  .component('feedComponent', {
    controllerAs: 'feedController',
    controller: function($scope, $http) {

      $scope.school = "Decode";

      $scope.showAddModal = false;

      $scope.posts = [];
      $http.get('/api/posts')
        .then(function(success) {
          $scope.posts = success.data.posts;
        }).catch(function(error) {
          console.log('error ', error);
        });

      $scope.showAddModalEvent = function() {
        $scope.showAddModal = true;
      }
    },
    templateUrl: '/feed/feed.html'
  });