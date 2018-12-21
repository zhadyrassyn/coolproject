angular.module('feedModule').factory('feedService', ($http) => {
  return {
    url: '/api/posts',

    getPosts: function(currentPage, perPage, searchText) {
      if (searchText == null || searchText.length == 0) {
        return $http.get(this.url + '?perPage=' + perPage + '&currentPage=' + currentPage);
      } else {
        return $http.get(this.url + '?perPage=' + perPage + '&currentPage=' + currentPage + '&searchText=' + searchText);
      }
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