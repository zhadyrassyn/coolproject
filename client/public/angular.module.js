var app = angular.module('app', ['ngCookies', 'ui.router', 'feedModule',
  'postDetailModule', 'navigationModule', 'loginModule', 'profileModule']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);

  var states = [
    {
      name: 'index',
      url: '/',
      component: 'feedComponent'
    },
    {
      name: 'postDetail',
      url: '/detail/{postID}',
      component: 'postDetailComponent'
    },
    {
      name: 'login',
      url: '/login',
      component: 'loginComponent'
    },
    {
      name: 'profile',
      url: '/profile',
      component: 'profileComponent'
    }
  ];

  $urlRouterProvider.otherwise('/');

  states.forEach(state => $stateProvider.state(state));
});