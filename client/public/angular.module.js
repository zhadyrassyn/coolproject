var app = angular.module('app', ['ui.router', 'feedModule',
  'postDetailModule', 'navigationModule', 'loginModule']);

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
    }
  ];

  $urlRouterProvider.otherwise('/');

  states.forEach(state => $stateProvider.state(state));
});