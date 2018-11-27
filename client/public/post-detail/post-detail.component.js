angular
  .module('postDetailModule')
  .component('postDetailComponent', {
    controller: function($scope, $http, $state, $cookies) {
      $scope.school = "Decode";
      $scope.post = {};
      $scope.commentText = "";


      var id = $state.params.postID;
      var url = '/api/posts/' + id;
      var user = $cookies.getObject('user');

      $scope.user = user;
      $http.get(url)
        .then(function(response) {
          if (response.status === 200) {
            $scope.post = response.data.post;
          }
        })
        .catch(function(error) {
          console.log('error ', error);
        })

      $scope.saveComment = function(comment) {
        if (comment.length == 0) {
          return;
        }

        var url = '/api/posts/' + id + '/comments';
        var data = {
          comment: comment
        };

        $http.post(url, data)
          .then(function(response) {
            console.log('respponse ', response);
            if (response.status == 200) {
              var createdComment = response.data;
              createdComment.author = user;
              $scope.post.comments.push(createdComment);

              $scope.commentText = "";

            }
          }).catch(function(error) {
            console.log('error ', error);
        })
      }

      $scope.deleteComment = function(deleteComment) {
        var url = '/api/posts/' + id + '/comments/' + deleteComment._id;

        $http.delete(url).then(function(response) {
          if (response.status == 200) {
            $scope.post.comments = $scope.post.comments.filter(comment => comment._id != deleteComment._id);
          }
        }).catch(function(error) {
          console.log('error ', error);
        })
      }
    },
    templateUrl: '/post-detail/post-detail.html'
  });