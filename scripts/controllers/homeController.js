(function () {

'use strict';

	// Load controller
  	angular.module('surveyApp').controller('homeController', ['$rootScope','$scope','$location','serviceCall','activeData',function($rootScope,$scope,$location,serviceCall,activeData) {

      $scope.controllerInit = function(){
        console.log("Test");
  		};
  		$scope.controllerInit();

    }
  ]);

})();
