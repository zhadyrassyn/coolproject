angular
  .module('feedModule')
  .component('feedComponent', {
    controller: function($scope, feedService) {
      $scope.posts = [];
      var currentPage = 0;
      var perPage = 5;
      $scope.isLoading = false;
      var totalPages = 1;

      $scope.pages = [];

      function fill(currentPage, perPage) {
        $scope.isLoading = true;
        feedService.getPosts(currentPage, perPage)
          .then(function(success) {
            $scope.posts = $scope.posts.concat(success.data.posts);
            $scope.total = success.data.total;

            totalPages = parseInt(Math.ceil($scope.total / perPage));

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
            $scope.isLoading = false;
          }).catch(function(error) {
          console.log('error ', error);
          $scope.isLoading = false;
        });
      }

      $scope.changePage = function(page) {
        currentPage = page;
        $scope.posts = [];
        $scope.pages = [];
        fill(currentPage, perPage);
      };

      $scope.myPagingFunction = function() {
        currentPage += 1;
        if(currentPage <= totalPages) {
          fill(currentPage, perPage);
        } else {
          $scope.isLoading = false;
        }
      }
    },
    templateUrl: '/feed/feed.html'
  });