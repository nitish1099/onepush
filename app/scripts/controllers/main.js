'use strict';

/**
 * @ngdoc function
 * @name onepushApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the onepushApp
 */
angular.module('onepushApp')
  .controller('MainCtrl', function ($scope, website) {
  	$scope.total_likes = [];
  	//get all websites
  	
    website.getWebsites().then(function(result){
    	$scope.websites = result.data.websites;
    	angular.forEach($scope.websites, function(value, key){
    		$scope.total_likes[key] = 0;
    	});
    	if(window.localStorage.getItem("likes")==null){
    		window.localStorage.setItem("likes",JSON.stringify($scope.total_likes));
    	}
    	else{
    		var size_diff = $scope.websites.length - JSON.parse(window.localStorage.getItem("likes")).length;
    		$scope.total_likes = JSON.parse(window.localStorage.getItem("likes"));
    		console.log(size_diff);
    		if(size_diff != 0){
    			for (var i = 0; i<size_diff; i++){
    				$scope.total_likes.push(0);
    				window.localStorage.setItem("likes",JSON.stringify($scope.total_likes));

    			}
    		}
    	}
    });

    $scope.inputChanged = function(str) {
      $scope.searchKey = str;
      console.log($scope.searchKey);
    }

    $scope.keySelected = function(selected) {
      if (selected) {
        $scope.searchKey = selected.title;
      } else {
        console.log('cleared');
      }
    }

    $scope.getNumber = function(num) {
        return new Array(num);   
    }

    $scope.hitLike = function(id){
    	var likes = window.localStorage.getItem("likes");
    	console.log(likes[id]);
    	if(likes[id] == undefined){
    		$scope.total_likes[id] = 1;
	    	window.localStorage.setItem("likes",JSON.stringify($scope.total_likes));
    	}
    	else{
    		console.log(id)
    		console.log($scope.total_likes[id]);
    		$scope.total_likes[id] = $scope.total_likes[id] + 1;
	    	window.localStorage.setItem("likes",JSON.stringify($scope.total_likes));
    	}
    }

    $scope.pushWebsite = function(title, url, tag){
    	console.log(title, url, tag);
    	website.postWebsites(title, url, tag).then(function(result){
    		console.log(result);
    		$scope.modalText = result.data.message;

    	$('#modal1').openModal();
    	});
    }


  });
