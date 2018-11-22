angular
  .module('profileModule')
  .component('profileComponent', {

    controller: function($scope, $cookies, profileService) {

      $scope.showAddModalFlag = false;

      $scope.posts = [];
      var user = $cookies.getObject("user");
      console.log('user ', user);

      if (user.avatarPath) {
        $scope.avatarPath = user.avatarPath;
      } else {
        $scope.avatarPath = "/avas/default.png";
      }

      console.log('$scope.avatarPath ', $scope.avatarPath);

      profileService.getPosts(user._id).then(response => {
          if (response.status === 200) {
            $scope.posts = response.data.posts;
          }
        }).catch(error => {
          console.log('error ', error);
      });

      $scope.showAddModal = () => {
        $scope.showAddModalFlag = true;
      };

      $scope.removeAddModal = () => {
        $scope.showAddModalFlag = false;
        $scope.postTitle = "";
        $scope.postContent = "";
        $scope.image = null;
      };

      $scope.savePost = (title, content, image) => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('file', image);

        profileService.createPost(user._id, formData)
          .success(post => {
            $scope.removeAddModal();
            $scope.posts.push(post);
          })
          .error(err => console.log('error ', err));
      };

      $scope.deletePost = (post) => {

        profileService.deletePost(user._id, post._id)
          .success(post => {
            $scope.posts = $scope.posts.filter(it => it._id !== post._id);
          })
          .error(err => {
            console.log('error ', err);
          })
      };

      $scope.showEditModalFlag = false;
      console.log($scope.showEditModalFlag + ", dd");
      $scope.showEditModal = (post) => {
        $scope.showEditModalFlag = true;
        $scope.editTitle = post.title;
        $scope.editContent = post.content;
        $scope.editPostId = post._id;
      };

      $scope.removeEditModal = () => {
        $scope.showEditModalFlag = false;
      };

      $scope.updatePost = (title, content, postId) => {
        const post = {
          title, content
        };

        profileService.updatePost(user._id, postId, post)
          .success(response => {
            var updatedPost = response.post;
            const index = $scope.posts.findIndex(it => it._id === postId);
            if(index !== -1) {
              $scope.posts.splice(index, 1, updatedPost);
            }
          })
          .error(err => console.log('error ', err));

        $scope.removeEditModal();
      }

    },
    templateUrl: '/profile/profile.html'
  });