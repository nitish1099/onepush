angular.module('onepushApp')
.factory('website', ['$http', function($http) {
  return {
	
	getWebsites: function(){
		return $http({
        url: 'https://hackerearth.0x10.info/api/one-push?type=json&query=list_websites',
        method: "GET"
        })
        .success(function(data) {
			console.log(data);
        });
	},

	postWebsites: function(title,url,tag){
		return $http({
        url: 'https://hackerearth.0x10.info/api/one-push?type=json&query=push&title='+title+'&url='+url+'&tag='+tag,
        method: "GET"
        })
        .success(function(data) {
			console.log(data);
        });
	},

  };
}]);