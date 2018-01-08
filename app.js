angular.module('app', ['ngRoute', 'home', 'about'])

.config(function($routeProvider, $locationProvider){
    
    $routeProvider
        
        .when("/", {
            templateUrl: "modules/home/index.html",
            controller: "homeController"
        })
        
        .when("/about", {
            templateUrl: "modules/about/index.html",
            controller: "aboutController"
        })
        
        .otherwise({redirectTo: "/"});
        
        $locationProvider.html5Mode(true);
    
})