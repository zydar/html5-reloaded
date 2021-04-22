// Az angular fő-modul létrehozása
var webapp = angular.module( "webapp", ['ngRoute'] );

// angular.route.min.js modullal
webapp.config(['$routeProvider', '$locationProvider', 
function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/index', {
        templateUrl: 'template/content/index.html',
        controller: 'indexController'
    })
    .when('/users', {
        templateUrl: 'template/content/users.html'
    })
    .when('/settings', {
        templateUrl: 'template/content/settings.html'
    })
    .otherwise({
        redirectTo: '/index'
    });
    // configure html5 to get links working on jsfiddle, szerver oldalról is be kell állítani 404-eket irányítsa az index.html-re
    // url/#-el töltődnek be az oldalak
    /* $locationProvider.html5Mode(true);
    console.log($locationProvider); */
}]);