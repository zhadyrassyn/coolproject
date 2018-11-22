angular.module('profileModule').factory('profileService', ($http) => {
  return {
    url: '/api/profile',

    getPosts: function(userId) {
      return $http.get(`${this.url}/${userId}/posts`);
      // var url = this.url  + '/' + userId + '/posts';
      // var url1 = `${this.url}/${userId}/posts`;
    },

    updatePost: function(userId, postId, data) {
      return $http.post(`${this.url}/${userId}/posts/${postId}`, data)
    },

    createPost: function(userId, data) {
      return $http.put(`${this.url}/${userId}/posts`, data, {
        headers: {
          "content-type": undefined
        }
      });
    },

    deletePost: function(userId, postId) {
      return $http.delete(`${this.url}/${userId}/posts/${postId}`);
    },

    saveAvatar: function(userId, data) {
      return $http.post(`${this.url}/${userId}/avatar`, data, {
        headers: {
          "content-type": undefined
        }
      });
    }
  }
});