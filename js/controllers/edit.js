/**
 * Created by fawzy on 6/8/2016.
 */
app.controller("editCtrl", function ($scope, $sessionStorage, fileReader ,saveProfile , $base64) {

    $scope.UserData = $sessionStorage.user.data.result;

    console.log($scope.UserData)
    $scope.getFile = function () {
        $scope.progress = 0;
        fileReader.readAsDataUrl($scope.file, $scope)
            .then(function (result) {
                $scope.imageSrc = result;
                  $scope.imgString = $base64.encode($scope.imageSrc);

            });
    };



    $scope.newdata = {
        id: "" + $scope.UserData.talent.id + "",
        category:""+ $scope.UserData.categoryId + "",
        age: "",
        mobile: "",
        firstName: "",
        lastName: "",
        email: "",
        city: "",
        country: "",
        gender: "",
        talentUrl: "",
        bio: "",
        urls: "",
        accounts: "",
        img: $scope.imgString
    }
    $scope.save = function () {
      console.log($scope.newdata)
        saveProfile.SaveData($scope.newdata).then(function (d) {
          console.log(d);
            if (d.status) {

            }
        });
    }


});


app.factory('saveProfile', function ($http, $q) {
    var fac = {};
    fac.SaveData = function (data) {
        var insertData = "id="+data.id+"&category="+data.category+"&age="+ data.age+"&mobile="+data.mobile+"&firstName="+data.firstName+"&lastName="+data.lastName+"&email="+data.email+"&img="+data.img+"&city="+data.city+"&country="+data.country+"&gender="+data.gender+"&talentUrl="+data.talentUrl+"&bio="+data.bio+"&accounts="+data.accounts+"&ulrs="+data.urls
        var defer = $q.defer();
        $http({
            url: server + ':8084/TalentZoneTom/rest/talent/update',
            method: 'POST',
            data: insertData,
            headers: {
                'content-type': "application/x-www-form-urlencoded",
                "Access-Control-Allow-Credentials": true,
                Accept: 'application/json'
            }
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


app.directive("ngFileSelect", function () {

    return {
        link: function ($scope, el) {

            el.bind("change", function (e) {

                $scope.file = (e.srcElement || e.target).files[0];
                $scope.getFile();
            })

        }

    }

})


app.factory("fileReader", function ($q, $log) {
    var onLoad = function (reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.resolve(reader.result);
            });
        };
    };

    var onError = function (reader, deferred, scope) {
        return function () {
            scope.$apply(function () {
                deferred.reject(reader.result);
            });
        };
    };

    var onProgress = function (reader, scope) {
        return function (event) {
            scope.$broadcast("fileProgress",
                {
                    total: event.total,
                    loaded: event.loaded
                });
        };
    };

    var getReader = function (deferred, scope) {
        var reader = new FileReader();
        reader.onload = onLoad(reader, deferred, scope);
        reader.onerror = onError(reader, deferred, scope);
        reader.onprogress = onProgress(reader, scope);
        return reader;
    };

    var readAsDataURL = function (file, scope) {
        var deferred = $q.defer();

        var reader = getReader(deferred, scope);
        reader.readAsDataURL(file);

        return deferred.promise;
    };

    return {
        readAsDataUrl: readAsDataURL
    };
});
