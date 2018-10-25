angular
  .module('feedModule')
  .component('feedComponent', {
    controller: function($scope, $http) {

      $scope.school = "Decode";

      $scope.showAddModal = false;
      $scope.showEditModal = false;
      $scope.selectedPost;

      $scope.showEditModalEvent = function(post) {
        $scope.selectedPost = post;
        $scope.showEditModal = true;
      };

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