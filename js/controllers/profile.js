/**
 * Created by fawzy on 6/4/2016.
 */





app.controller('profileCtrl',function($scope,$sessionStorage){

    $scope.UserData = $sessionStorage.user.data.result;

    $('.lean-overlay').fadeOut();
    $scope.logout = function(){
        $sessionStorage.user = "";
        $location.url("/");
    }



})
