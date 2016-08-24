/**
 * Created by fawzy on 6/6/2016.
 */
app.controller('notificationCtrl',function($scope,$rootScope,$location,$sessionStorage,requests ,RespondFactory){
    $('.lean-overlay').fadeOut();
    $scope.UserData = $sessionStorage.user.data.result;


    $scope.logout = function(){
        $sessionStorage.user = "";
        $location.url("/");
    }



requests.GetRequests($scope.UserData.talent.id).then(function(d){
    console.log(d);
    $scope.REQarray= d.data.result;
})


$scope.respond ={
    talent : ''+$scope.UserData.talent.id+'' ,
    agency : "",
    state : ""
}

$scope.accept = function(agencyId){
  $scope.respond.agency = ""+agencyId+""
  $scope.respond.state = "Accepted"

    RespondFactory.SendRespond($scope.respond).then(function (d) {
        if (d.status) {
            $scope.reload();

        }
    });



  console.log($scope.respond);
}

$scope.refuse = function(agencyId){
  $scope.respond.agency = ""+agencyId+""
  $scope.respond.state = "Refuse"
  console.log($scope.respond);
}




});


app.factory('requests',function($http){
    var fac ={};
    fac.GetRequests =function(data){
        return $http({
            url: server + ":8084/TalentZoneTom/rest/request/talent?talent="+data,
            method:"GET",
            dataType: 'json',
            headers:{'content-type':"application/x-www-form-urlencoded","Access-Control-Allow-Credentials": true , Accept: 'application/json'}
        })
    };
    return fac;
});


app.factory('RespondFactory',function($http ){
    var fac ={};
    fac.SendRespond =function(data){
        var dataAC = "talent="+data.talent+"&agency="+data.agency+"&state="+data.state
        console.log(dataAC);
        return $http({
            url: server + ":8084/TalentZoneTom/rest/request/response",
            method:"POST",
            data : dataAC ,
            dataType: 'json',
            headers:{'content-type':"application/x-www-form-urlencoded","Access-Control-Allow-Credentials": true , Accept: 'application/json'}
        })
    };
    return fac;
});
