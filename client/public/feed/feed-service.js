angular.module('feedModule').factory('feedService', ($http) => {
  return {
    url: '/api/posts',

    getPosts: function(currentPage, perPage) {
      return $http.get(this.url + '?perPage=' + perPage + '&currentPage=' + currentPage);
    },

    updatePost: function(id, data) {
      return $http.post(this.url + '/' + id, data)
    },

    createPost: function(data) {
      return $http.put(this.url, data, {
        headers: {
          "content-type": undefined
        }
      });
    },

    deletePost: function(id) {
      return $http.delete(this.url + '/' + id);
    }
  }
});