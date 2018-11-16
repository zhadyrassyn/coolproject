angular.module('navigationModule').factory('navigationService', ($http) => {
  return {
    logout: function() {
      return $http.post('/api/auth/sign-out');
    }
  }
});