angular
  .module('feedModule')
  .component('feedComponent', {
    controller: function($scope, feedService) {
      $scope.showAddModal = false;
      $scope.showEditModal = false;
      $scope.selectedPost = {};
      $scope.selectedPostTitle = "";
      $scope.posts = [];

      $scope.showEditModalEvent = function(post) {
        $scope.selectedPost._id = post._id;
        $scope.selectedPost.title = post.title;
        $scope.selectedPost.author = post.author;
        $scope.selectedPost.content = post.content;

        $scope.showEditModal = true;
        $scope.selectedPostTitle = post.title;
      };

      $scope.closeEditModalEvent = function() {
        $scope.showEditModal = false;
      };

      $scope.editPost = function(id, title, author, content) {
        var data = {
          title: title,
          author: author,
          content: content
        };

        feedService.updatePost(id, data)
          .then((response) => {
            var updatedPost = response.data.post;
            var index = $scope.posts.findIndex(it => id === it._id);
            if (index >= 0) {
              $scope.posts.splice(index, 1, updatedPost);
            }

            $scope.closeEditModalEvent();
          })
          .catch((error) => {
            console.log('error ', error);

            $scope.closeEditModalEvent();
          });
      };

      feedService.getPosts()
        .then(function(success) {
          $scope.posts = success.data.posts;
        }).catch(function(error) {
          console.log('error ', error);
        });

      $scope.showAddModalEvent = function() {
        $scope.showAddModal = true;
      };

      $scope.closeAddModalEvent = function() {
        $scope.showAddModal = false;
      };

      $scope.addNewPost = function(title, author, content, image) {
        var data = new FormData();
        data.append("title", title);
        data.append("author", author);
        data.append("content", content);
        data.append("file", image);

        /* Отправляем запрос на postController.js на PUT /api/posts */
        feedService.cretePost(data)
          .then(function(response) {  //обработка успешного кейса
            if (response.status === 200) {
              $scope.posts.push(response.data);
            }

            $scope.closeAddModalEvent();
          })
          .catch(function(error) {  //обработка ошибки
            console.log('error ', error);

            $scope.closeAddModalEvent();
          });
      };

      $scope.deletePost = function(id) {
        feedService.deletePost(id)
          .then(function (response) {
            $scope.posts = $scope.posts.filter(post => post._id !== id);
          })
          .catch(function (error) {
            console.log('error ', error);
          });
      }

    },
    templateUrl: '/feed/feed.html'
  });