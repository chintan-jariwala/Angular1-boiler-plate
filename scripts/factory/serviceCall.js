(function () {

'use strict';

	//Load controller
  	angular.module('surveyApp').factory('serviceCall', function($http){

  		var url = {};

  		// constructor to set up certain defaults

  		function serviceCall(serviceName,callMethod){
        /*jshint validthis: true */

  			this.url = {
  				domain : localStorage.surveyAppServerSettings,
  				method : callMethod,
  				name : serviceName
  			};
  		}

  		serviceCall.prototype.call = function(payload,successCallback,errorCallback,mockURL){
        console.log(payload);
        var params = JSON.parse(payload);

        var serviceURL;
        console.log(this.url.name);
        console.log(payload);
        serviceURL = mockURL || this.url.domain + "/" + "rest/promis" + "/" + this.url.name;

        if(params.surveyInstanceID && params.userPIN){
          serviceURL = mockURL || this.url.domain + "/rest/activities/"+  this.url.name + "/" +params.surveyInstanceID + "?pin=" + localStorage.surveyAppPin ;

        }else if(params.surveyInstanceID && params.surveyResults){
          console.log(" I am here ");
         //serviceURL = mockURL || this.url.domain + "/" + "rest/promis" + "/" + this.url.name + "/" + params.surveyInstanceID;
        }else if(params.userPIN){
        serviceURL = mockURL || this.url.domain +"/rest/activities/" + this.url.name + "/" + params.userPIN;
        }

        console.log(serviceURL);
  			console.log(this.url.method);
  			console.log(JSON.parse(payload));
        console.log(payload);
        console.log(params);
        if(this.url.method === "POST"){
            serviceURL = mockURL || this.url.domain + "/rest/activities/"+  this.url.name + "/" +params.activityInstanceID + "?pin=" + localStorage.surveyAppPin ;
            console.log(serviceURL);
            console.log(params.activityInstanceID);
          $http(
          {
            method: this.url.method,
            url: serviceURL,
            data: params,
            headers: {'Content-Type': 'application/json'},
          }
          ).
          success(function(data, status, headers, config) {
              successCallback(data, status, headers, config);
          }).
          error(function(data, status, headers, config) {
              errorCallback(data, status, headers, config);
          });
        }else{
          $http(
          {
            method: this.url.method,
            url: serviceURL
          }
          ).
          success(function(data, status, headers, config) {
              successCallback(data, status, headers, config);
          }).
          error(function(data, status, headers, config) {
              errorCallback(data, status, headers, config);
          });
        }

  		};

  		return serviceCall;
  	});

})();
