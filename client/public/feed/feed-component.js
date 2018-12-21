angular
  .module('feedModule')
  .component('feedComponent', {
    controller: function($scope, feedService, $rootScope) {
      $scope.posts = [];
      var currentPage = 1;
      var perPage = 5;

      $scope.pages = [];

      function fill(currentPage, perPage, searchText) {
        feedService.getPosts(currentPage, perPage, searchText)
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

      $scope.changePage = function(page) {
        currentPage = page;
        $scope.posts = [];
        $scope.pages = [];
        fill(currentPage, perPage, $scope.searchText);
      };

      $rootScope.$on('searchText', function(event, data) {
        $scope.posts = [];
        $scope.pages = [];
        $scope.searchText = data;

        if (data == null || data.length == 0) {
          currentPage = 1;
          fill(currentPage, perPage);
        } else {
          currentPage = 1;
          fill(currentPage, perPage, data);
        }
      });
    },
    templateUrl: '/feed/feed.html'
  });