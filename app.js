angular.module('app', ['ngRoute', 'home', 'about', 'jtt_instagram'])

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

.controller('controller', ['$scope', 'instagramFactory', function($scope, instagramFactory) {

    var _access_token = '5896353959.13f803e.0d72777f26e94236b448e3a5c2e9aa06';


    // user id converter: http://jelled.com/instagram/lookup-user-id
    instagramFactory.getMediaFromUserById({
        userId:"5896353959",
        access_token:_access_token,
    }).then(function(_data){
        console.info("media from user by id", _data);
    });

}]);