(function () {

'use strict';

  angular.module('surveyApp', ['ngRoute'])

  .config(['$routeProvider','$httpProvider',function($routeProvider,$httpProvider) {
      // routes
      $routeProvider
        .when("/", {
          templateUrl: "partials/home.html",
          controller: "homeController"
        })
        .otherwise({
           redirectTo: '/'
        });

      $httpProvider.interceptors.push(function ($q, $rootScope, $location, activeData) {
            return {
                'responseError': function(rejection) {
                    return $q.reject(rejection);
                }
            };
        });

      //Enable cross domain calls
      $httpProvider.defaults.useXDomain = true;

      //Remove the header used to identify ajax call  that would prevent CORS from working
      delete $httpProvider.defaults.headers.common['X-Requested-With'];

  }])
  .run(['$rootScope', '$location', function ($rootScope, $location) {
    $rootScope.$on('$routeChangeStart', function (event){
    });
  }]);

}());
