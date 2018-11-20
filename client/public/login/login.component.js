angular
  .module('loginModule')
  .component('loginComponent', {
    controller: function($scope, $http, $state, $rootScope) {
      $scope.login = function(email, password) {
        var data = {
          email: email,
          password: password,
        };

        $http.post('/api/auth/sign-in', data)
          .then(function(response) {
            if (response.status === 200) {
              $rootScope.authenticated = true;
              $state.go('profile');
            }
          })
          .catch(function(error) {
            console.log('error ', error);
          });
      };
    },
    templateUrl: '/login/login.html'
  });