angular
  .module('feedModule')
  .component('feedComponent', {
    controller: function($scope, feedService) {
      $scope.posts = [];

      feedService.getPosts()
        .then(function(success) {
          $scope.posts = success.data.posts;
        }).catch(function(error) {
          console.log('error ', error);
        });
    },
    templateUrl: '/feed/feed.html'
  });