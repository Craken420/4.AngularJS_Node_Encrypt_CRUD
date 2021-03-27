angular.module('plunkerApp',[
    'ngRoute', // Adding `angular-route.js`
    'ui.bootstrap'
])
.config(function ( $locationProvider) {
    $locationProvider.html5Mode(true);
})
.config(function ($routeProvider) {
    $routeProvider
        // Default route
        .when('/', {
            templateUrl: 'views/list/list.html',
            controller: 'ContactsCtrl'
        })
        // add a new contact
        .when('/contacts/new', {
            templateUrl: 'views/new.html',
            controller: 'ContactsCtrl'
        })
        // Redirect to main route
        .otherwise({
          redirectTo: '/'
        });
});