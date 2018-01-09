angular.module('home', [])

.controller('homeController', function($scope, $http, $location, $anchorScroll){
  
  function fnSuccess (res) {
     res.data ? $scope.success = true : $scope.error = true;
  }
  
  $scope.submit = function() {
    return $http.post('/src/global/mailChimp.php', this.mailChimp).then(function(success) {
      return fnSuccess(success);
    });
  }
  
  $scope.scroll = function() {
   var id = $location.hash();
    $location.hash('add');
    $anchorScroll();
    $location.hash(id);

 };
  
    
})