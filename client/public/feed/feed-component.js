angular
  .module('feedModule')
  .component('feedComponent', {
    controller: function($scope, $http) {

      $scope.school = "Decode";

      $scope.showAddModal = false;
      $scope.showEditModal = false;
      $scope.selectedPost = {};
      $scope.selectedPostTitle = "";

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

        var url = '/api/posts/' + id;
        $http.post(url, data)
          .then((response) => {
            var updatedPost = response.data.post;
            var index = $scope.posts.findIndex(it => id === it._id);
            if (index >= 0) {
              $scope.posts.splice(index, 1, updatedPost);
              $scope.closeEditModalEvent();
            }
          })
          .catch((error) => {
            console.log('error ', error);
          });
      }

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

      $scope.closeAddModalEvent = function() {
        $scope.showAddModal = false;
      }

      $scope.addNewPost = function(title, author, content) {
        console.log(title);
        console.log(author);
        console.log(content);

        var data = {                 //const data = {
          title: title,              //   title,
          author: author,            //   author,
          content: content           //   content,
        };                           //};

        /* Отправляем запрос на postController.js на PUT /api/posts */
        $http.put('/api/posts', data)
          .then(function(response) {  //обработка успешного кейса
            var newPost = response.data;
            if (response.status === 200) {
              $scope.posts.push(newPost);
              $scope.closeAddModalEvent();
            }
          })
          .catch(function(error) {  //обработка ошибки
            console.log('error ', error);
          });
      }

      $scope.deletePost = function(id) {
        //var url = `/api/posts/${id}`
        var url = '/api/posts/' + id;
        $http.delete(url)
          .then(function (response) {
            // var newPosts = [];
            // for(var i = 0; i < $scope.posts.length; i++) {
            //   var currentPost = $scope.posts[i];
            //   if(currentPost._id !== id) {
            //     newPosts.push(currentPost);
            //   }
            // }
            // $scope.posts = newPosts;

            $scope.posts = $scope.posts.filter(post => post._id !== id);
            console.log('response ', response);
          })
          .catch(function (error) {
            console.log('error ', error);
          });

      }

    },
    templateUrl: '/feed/feed.html'
  });