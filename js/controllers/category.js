/**
 * Created by fawzy on 6/3/2016.
 */

app.controller('categoryCtrl',function($scope,categoryList,$location,$sessionStorage){

    $scope.UserData = $sessionStorage.user.data.result;


    $scope.logout = function(){
        $sessionStorage.user = "";
        $location.url("/");
    }


    categoryList.GetCategory().then(function(d){
        $scope.categoryList = d.data.result
        console.log($scope.categoryList)
    });


})
