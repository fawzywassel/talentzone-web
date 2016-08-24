



app.controller('homeCtrl', function($scope,$location,$rootScope,loginServices,RegistrationService ,$sessionStorage ,categoryList  ) {

  $('.lean-overlay').fadeOut();

///////login code //////
//
   if($sessionStorage.user){
       $location.url('/main/'+$sessionStorage.user.data.result.categoryId)
   }

   $scope.categoryList = $sessionStorage.categoryList


    $scope.loginDate ={
        mobile :"",
        pass:""
    }

    $scope.login = function (){
            loginServices.GetUSER($scope.loginDate).then(function(d){
              console.log(d.data.status);
                if(d.data.status){

                    $scope.message = "successfuly login";

                    $sessionStorage.user = d ;
                    $location.url('/main/'+$sessionStorage.user.data.result.categoryId)


                }else{
                    $scope.message = "Your Mobile Or Password Incorrect";
                }
            })
    }






    // categoryList.GetCategory().then(function(d){
    //     $scope.categoryList = d.data.result
    //     console.log($scope.categoryList)
    // });







    //////////////register ///

        $scope.newUserData = {
            firstName : '',
            lastName: '',
            email: '',
            mobile:'',
            pass:'',
            category:''
        };

  console.log($scope.newUserData);
        //Save Data
        $scope.register = function () {
            RegistrationService.SaveFormData($scope.newUserData).then(function (d) {
                if (d.status) {
                    $scope.message = "success , login Now "
                } else {
                    $scope.message = 'mobile or mail already exist';
                }
        });
      }

});


app.factory('loginServices',function($http){
   var fac ={};
    fac.GetUSER =function(d){
        var data = 'mobile='+d.mobile +"&pass="+d.pass ;
        return $http({
            url: server + ":8084/TalentZoneTom/rest/talent/login",
            method:"POST",
            data : data,
            dataType: 'json',
            headers:{'content-type':"application/x-www-form-urlencoded","Access-Control-Allow-Credentials": true , Accept: 'application/json'}
        })
    };
    return fac;
});


app.factory('categoryList',function($http){
    var cat ={};
    cat.GetCategory =function(){
        return $http({
            url:server + ":8084/TalentZoneTom/rest/category/all",
            method:"GET",
            dataType: 'json',
            headers:{'content-type':"application/x-www-form-urlencoded","Access-Control-Allow-Credentials": true , Accept: 'application/json'}
        })
    };
    return cat;
});


app.factory('RegistrationService', function ($http, $q,$sessionStorage,$rootScope) {
    var fac = {};
    fac.SaveFormData = function (data) {


        var insertData = "firstName="+data.firstName+"&lastName="+data.lastName+"&mobile="+data.mobile+"&pass="+data.pass+"&email="+data.email+"&category="+data.category


        var defer = $q.defer();
        $http({
            url: server + ':8084/TalentZoneTom/rest/talent/register',
            method: 'POST',
            data:   insertData ,
            headers:{'content-type':"application/x-www-form-urlencoded","Access-Control-Allow-Credentials": true , Accept: 'application/json'}
        }).success(function (d) {
            $rootScope.regmsg = "success"
            defer.resolve(d);
        }).error(function (e) {
            //Failed Callback
            $rootScope.regmsg = "Error"
            defer.reject(e);
        });
        $sessionStorage.user = defer.promise ;
        return defer.promise;
    }

    return fac;
});
