angular.module('home', [])

.controller('homeController', function($scope, $http){
    
    $scope.submit = function(){
      $http.post('/src/mailChimp.php', this.mailChimp);
    }
    
})