angular
  .module('postDetailModule')
  .component('postDetailComponent', {
    controller: function($scope, $http, $state) {
      $scope.school = "Decode";
      $scope.post = {};

      var id = $state.params.postID;
      var url = '/api/posts/' + id;
      $http.get(url)
        .then(function(response) {
          if (response.status === 200) {
            $scope.post = response.data.post;
          }
        })
        .catch(function(error) {
          console.log('error ', error);
        })
    },
    templateUrl: '/post-detail/post-detail.html'
  });