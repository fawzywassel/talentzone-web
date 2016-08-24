var app = angular.module('talentZone', ['ngRoute','ui.materialize','ngStorage','base64']);

var server  = "http://169.254.243.101" ;

app.config(function($routeProvider,$locationProvider) {

        $routeProvider
            .when('/', {
                templateUrl : 'views/home.html' ,
                resolve:{
                    "check":function(categoryList,$sessionStorage){
                      categoryList.GetCategory().then(function(d){
                          $sessionStorage.categoryList = d.data.result
                          // console.log($sessionStorage.categoryList)
                      });
                    }
                },
                controller  : 'homeCtrl'
            })

            .when('/main/:catId', {

                controller  : 'mainCtrl',
                resolve:{
                    "check":function($location,$sessionStorage){
                        if(!$sessionStorage.user){
                            $location.url('/');
                        }
                    }
                },
                templateUrl : 'views/main.html'
            })
            .when('/category', {
                templateUrl : 'views/category.html' ,
                controller  : 'categoryCtrl'
            })
            .when('/profile', {
                templateUrl : 'views/profile.html' ,
                controller  : 'profileCtrl'
            })
			.when('/edit', {
				templateUrl : 'views/edit.html' ,
				controller  : 'editCtrl'
			})
			.when('/notification', {
				templateUrl : 'views/notification.html' ,
				controller  : 'notificationCtrl'
			})

});






app.directive('headerdirective', function () {
    return {
        restrict: 'EA', //E = element, A = attribute, C = class, M = comment
        //scope: {
        //    //@ reads the attribute value, = provides two-way binding, & works with functions
        //    title: '@'         },
        //template: '<div>{{ myVal }}</div>',
        templateUrl: 'views/directive/header.html'
        //controller: controllerFunction, //Embed a custom controller in the directive
        //link: function ($scope, element, attrs) { } //DOM manipulation
    }
});
app.directive('select', materialSelect);

	materialSelect.$inject = ['$timeout'];

	function materialSelect($timeout) {
		var directive = {
			link: link,
			restrict: 'E',
			require: '?ngModel'
		};

		function link(scope, element, attrs, ngModel) {
			if (ngModel) {
				ngModel.$render = create;
			}else {
				$timeout(create);
			}

			function create() {
				element.material_select();
			}

			//if using materialize v0.96.0 use this
			element.one('$destroy', function () {
				element.material_select('destroy');
			});

			//not required in materialize v0.96.0
			element.one('$destroy', function () {
				var parent = element.parent();
				if (parent.is('.select-wrapper')) {
					var elementId = parent.children('input').attr('data-activates');
					if (elementId) {
						$('#' + elementId).remove();
					}
					parent.remove();
					return;
				}

				element.remove();
			});
		}

		return directive;
	}
