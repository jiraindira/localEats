angular.module('starter.controllers', ['myService'])
  


.controller('FilterCtrl', function($scope, Firebase, filterService ) {

  var vm1 = this;
  $scope.test = 'jirain';

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.filterService = filterService;

  if (!filterService.allReviewers.length) {
    var firebaseObj = new Firebase('https://dazzling-heat-4525.firebaseio.com/reviewed');
    firebaseObj.once('value', function (dataSnapshot) {
      //GET DATA
      var data = dataSnapshot.val();
      var restaurants = getArrayFromObject(data);

      // store data in a $scope
      $scope.RestaurantData = restaurants;

      if (!restaurants.length) return;

      // Retrieve all cities
      var allCities = [];
      restaurants.forEach(function(restaurant){
        allCities.push(restaurant.location);
      });

      allCities = _.unique(allCities).map(function (city) {
        return {
          name: city
        }
      });
      filterService.allCities = allCities;

      //Retrieve all reviewers
      var allReviewers = [];
      restaurants.forEach(function (restaurant) {
        var reviews = getArrayFromObject(restaurant.reviews);
        reviews.forEach(function (review) {
          allReviewers.push(review.reviewer);
        });
      });

      allReviewers = _.unique(allReviewers).map(function (reviewer) {
        return {
          name: reviewer
        }
      });

      filterService.allReviewers = allReviewers;
      //$scope.reviewers = users;

    });
  }

  function getArrayFromObject(object) {
    var array = [];
    for (var key in object) {
      var item = object[key];
      item.id = key;
      array.push(item);
    }
    return array;
  }
})

.service('restaurantDataService', function(){
    var self = this;

    this.RestaurantAttributes = [];

    this.getRestaurant = function(){
      return self.RestaurantAttributes;
    };
})

.service('selectedRestaurantService', function(){
  var self = this;

  this.selectedRestaurant = [];

  this.getSelectedRestaurant = function(){
    return self.selectedRestaurant;
  };
  
})

.filter('myFilter',function(filterService){
  return function(input){
    //if (angular.isUndefined(input)) return;
    if (!angular.isArray(input)) return;
    var reviewers = filterService.getSelectedReviewers();
    var cities = filterService.getSelectedCities();


    //save the input in a temp output
    var tempOutput = getArrayFromObject(input);

    if(reviewers.length>0){
      //apply reviewer filter on data

      tempOutput = filterReviewer(tempOutput,reviewers);
    }

    if(cities.length>0){
      //apply reviewer filter on data
      tempOutput = filterCity(tempOutput,cities);
    }

    function getArrayFromObject(object) {
      var array = [];
      for (var key in object) {
        var item = object[key];
        item.id = key;
        array.push(item);
      }
      return array;
    }

    function filterReviewer(allRestaurants, selectedReviewers) {
      // Get restaurants that are reviewed by the selected reviewers
      return allRestaurants.filter(function (restaurant) {
        //return true
        var reviews = getArrayFromObject(restaurant.reviews);
        return reviews.some(function(review) {
          return _.find(selectedReviewers, {name: review.reviewer});
        })
      });
    }

    function filterCity(allRestaurants, selectedCities){
      // get restaurants that matches a selected cities
      return allRestaurants.filter(function (restaurant){
        //return true
        return _.find(selectedCities, {name: restaurant.location});
      })
    }

    return tempOutput;
  }
})

.service('filterService',function(){
  var self = this;

  this.allReviewers = [];
  this.allCities = [];

  function getSelectedOnly(array){
    return array.filter(function(item){
      return item.isSelected;
    })
  }

  this.getSelectedReviewers = function(){
    return getSelectedOnly(self.allReviewers)
  }

  this.getSelectedCities = function(){
    return getSelectedOnly(self.allCities)
  }
})

.service('profileDataService', function(){
  var self = this;
  this.userProfile = [];

  this.getUserProfile = function(){
    return self.userProfile;
  }

});

//.controller('WelcomeCtrl', function($scope, $state, $q, UserService, $ionicLoading, $firebase) {
//  // This is the success callback from the login method
//  var fbLoginSuccess = function(response) {
//    if (!response.authResponse){
//      fbLoginError("Cannot find the authResponse");
//      return;
//    }
//
//    var authResponse = response.authResponse;
//
//    getFacebookProfileInfo(authResponse)
//      .then(function(profileInfo) {
//        // For the purpose of this example I will store user data on local storage
//        UserService.setUser({
//          authResponse: authResponse,
//          userID: profileInfo.id,
//          name: profileInfo.name,
//          email: profileInfo.email,
//          picture : "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large"
//        });
//        $ionicLoading.hide();
//        $state.go('app.dashboard');
//      }, function(fail){
//        // Fail get profile info
//        console.log('profile info fail', fail);
//      });
//  };
//
//  // This is the fail callback from the login method
//  var fbLoginError = function(error){
//    console.log('fbLoginError', error);
//    $ionicLoading.hide();
//  };
//
//  // This method is to get the user profile info from the facebook api
//  var getFacebookProfileInfo = function (authResponse) {
//    var info = $q.defer();
//
//    facebookConnectPlugin.api('/me?fields=email,name&access_token=' + authResponse.accessToken, null,
//      function (response) {
//        console.log(response);
//        info.resolve(response);
//      },
//      function (response) {
//        console.log(response);
//        info.reject(response);
//      }
//    );
//    return info.promise;
//  };
//
//  //This method is executed when the user press the "Login with facebook" button
//  $scope.facebookSignIn = function() {
//    facebookConnectPlugin.getLoginStatus(function(success){
//      if(success.status === 'connected'){
//        // The user is logged in and has authenticated your app, and response.authResponse supplies
//        // the user's ID, a valid access token, a signed request, and the time the access token
//        // and signed request each expire
//        console.log('getLoginStatus', success.status);
//
//        // Check if we have our user saved
//        var user = UserService.getUser('facebook');
//
//        if(!user.userID){
//          getFacebookProfileInfo(success.authResponse)
//            .then(function(profileInfo) {
//              // For the purpose of this example I will store user data on local storage
//              UserService.setUser({
//                authResponse: success.authResponse,
//                userID: profileInfo.id,
//                name: profileInfo.name,
//                email: profileInfo.email,
//                picture : "http://graph.facebook.com/" + success.authResponse.userID + "/picture?type=large"
//              });
//
//              $state.go('app.dashboard');
//            }, function(fail){
//              // Fail get profile info
//              console.log('profile info fail', fail);
//            });
//        }else{
//          $state.go('app.dashboard');
//        }
//      } else {
//        // If (success.status === 'not_authorized') the user is logged in to Facebook,
//        // but has not authenticated your app
//        // Else the person is not logged into Facebook,
//        // so we're not sure if they are logged into this app or not.
//
//        console.log('getLoginStatus', success.status);
//
//        $ionicLoading.show({
//          template: 'Logging in...'
//        });
//
//        // Ask the permissions you need. You can learn more about
//        // FB permissions here: https://developers.facebook.com/docs/facebook-login/permissions/v2.4
//        facebookConnectPlugin.login(['email', 'public_profile'], fbLoginSuccess, fbLoginError);
//      }
//    });
//  };
//});
