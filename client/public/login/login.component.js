angular
  .module('loginModule')
  .component('loginComponent', {
    controller: function($scope, $http) {
      $scope.login = function(email, password) {
        var data = {
          email: email,
          password: password,
        };

        $http.post('/api/auth/sign-in', data)
          .then(function(response) {
            console.log('response ', response);
            if (response.status === 200) {
              console.log('Success. Cookie created');
            }
          })
          .catch(function(error) {
            console.log('error ', error);
          });
      };
    },
    templateUrl: '/login/login.html'
  });