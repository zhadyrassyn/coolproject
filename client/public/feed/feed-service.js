angular.module('feedModule').factory('feedService', ($http) => {
  return {
    url: '/api/posts',

    getPosts: function() {
      return $http.get(this.url);
    },

    updatePost: function(id, data) {
      return $http.post(this.url + '/' + id, data)
    },

    cretePost: function(data) {
      return $http.put(this.url, data);
    },

    deletePost: function(id) {
      return $http.delete(this.url + '/' + id);
    }
  }
});