app.controller("mainCtrl", function($scope,$rootScope,$location,$sessionStorage ,$timeout, mainPosts , NEWPOST ,$routeParams  ){

    $scope.UserData = $sessionStorage.user.data.result;

    $scope.logout = function(){
        $sessionStorage.user = ""
            $location.url("/");
    }

    

  mainPosts.GetPosts().then(function(d){
       $scope.Posts = d.data.result ;
      $sessionStorage.mainPosts = $scope.Posts

  })

  $scope.reload = function(){
    mainPosts.GetPosts().then(function(d){
         $scope.Posts = d.data.result ;
        $sessionStorage.mainPosts = $scope.Posts

    })
  }



    var date = new Date;
    $scope.newPost = {
      talent :$scope.UserData.talent.id,
      //category :$scope.UserData.categoryId,
      category :$routeParams.catId,
      postDate : date.getTime(),
      content : "",
      header : "new post"
    }
    $scope.newAddPost = function () {
       //$scope.Posts.push($scope.newPost)
        NEWPOST.SavePost($scope.newPost).then(function (d) {
            if (d.status) {
              $scope.reload();
              $scope.newPost.content = "";
            }
    });
  }

});

app.factory('mainPosts',function($http ,$sessionStorage,$routeParams){
    var fac ={};
    fac.GetPosts =function(){

        return $http({
            url: server + ":8084/TalentZoneTom/rest/post/all?category="+$routeParams.catId,
            method:"GET",

            dataType: 'json',
            headers:{'content-type':"application/x-www-form-urlencoded","Access-Control-Allow-Credentials": true , Accept: 'application/json'}
        })
    };
    return fac;
});




app.factory('NEWPOST', function ($http, $q) {
    var fac = {};
    fac.SavePost = function (data) {
        var insertData = "talent="+data.talent+"&category="+data.category+"&postDate="+data.postDate+"&content="+data.content+"&header="+data.header
        var defer = $q.defer();
        $http({
            url: server + ':8084/TalentZoneTom/rest/post/add',
            method: 'POST',
            data:   insertData ,
            headers:{'content-type':"application/x-www-form-urlencoded","Access-Control-Allow-Credentials": true , Accept: 'application/json'}
        }).success(function (d) {
            defer.resolve(d);
        }).error(function (e) {
            //Failed Callback
            defer.reject(e);
        });
        return defer.promise;
    }
    return fac;
});



//app.filter('reverse', function() {
//    return function(items) {
//        return items.slice().reverse();
//    };
//});
