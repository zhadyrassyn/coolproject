angular
  .module('feedModule')
  .component('feedComponent', {
    controller: function($scope, feedService) {
      $scope.posts = [];
      var currentPage = 1;
      var perPage = 5;

      $scope.pages = [];

      function fill(currentPage, perPage) {
        feedService.getPosts(currentPage, perPage)
          .then(function(success) {
            $scope.posts = success.data.posts;
            $scope.total = success.data.total;

            var totalPages = parseInt(Math.ceil($scope.total / perPage));

            for (var i = 1; i <= totalPages; i++) {
              if (currentPage == i) {
                $scope.pages.push({
                  name: currentPage,
                  active: true
                })
              } else if (i == 1 || i == totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
                $scope.pages.push({
                  name: i,
                  active: false
                });
              }
            }
          }).catch(function(error) {
          console.log('error ', error);
        });
      }

      fill(currentPage, perPage);

      // IT IS FOR PAGINATION
      // $scope.changePage = function(page) {
      //   currentPage = page;
      //   $scope.posts = [];
      //   $scope.pages = [];
      //   fill(currentPage, perPage);
      // }

      $scope.myPagingFunction = function() {
        console.log('on scroll');
      }
    },
    templateUrl: '/feed/feed.html'
  });