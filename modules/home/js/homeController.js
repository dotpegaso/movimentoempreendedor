angular.module('home', [])

.controller('homeController', function($scope, $http){
  
    
    
    $scope.submit = function(){
      $http.post('/src/global/mailChimp.php', this.mailChimp);
    }
    
})