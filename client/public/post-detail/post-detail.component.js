angular
  .module('postDetailModule')
  .component('postDetailComponent', {
    controller: function($scope) {
      $scope.school = "Decode";
    },
    templateUrl: '/post-detail/post-detail.html'
  });