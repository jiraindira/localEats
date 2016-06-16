/**
 * Created by Jiraindira on 3/27/16.
 */

angular.module('starter.controllers')

  .controller('AddRestaurantCtrl', function($scope, $state, $stateParams, $q, Firebase, restaurantDataService, ionicMaterialInk, ionicMaterialMotion, UserService) {

    $scope.restaurantData = restaurantDataService.getRestaurantAttributes();
    var profileData = UserService.getUser();
    var profileName = profileData.firstName + " " + profileData.lastName;
    var profileID = profileData.userID;

    // we will store all of the reviewer's specific data here
    $scope.reviewData = {};
    $scope.reviewData.dish = "";
    $scope.reviewData = {
      // food: 'Good',
      // service: '15%',
      // vibe: 'casual',
      reviewType: 'Bookmark',
      comments:""
    };

    $scope.setReviewType = function(type) {
      $scope.reviewData.reviewType = type;

      //set reviewer data to the correct values. when the reviewType is Bookmark, food - vibe - service should be blank
      if (type === "Bookmark"){
        $scope.reviewData = {
          food: '',
          service: '',
          vibe: '',
          reviewType: 'Bookmark',
          comments:""
        };
      }
      else {
        $scope.reviewData = {
          food: 'Good',
          service: 'Good',
          vibe: 'Casual',
          reviewType: 'Review',
          comments:""
        };
      }
    };

    $scope.reviewType = function(type) {
      return type === $scope.reviewData.reviewType;
      // console.log($scope.reviewerData.food);
    };

    $scope.setFoodActive = function(type) {
      $scope.reviewData.food = type;
    };
    $scope.isFoodActive = function(type) {
      return type === $scope.reviewData.food;
      // console.log($scope.reviewerData.food);
    };

    $scope.setServiceActive = function(type) {
      $scope.reviewData.service = type;
    };
    $scope.isServiceActive = function(type) {
      return type === $scope.reviewData.service;
    };

    $scope.setVibeActive = function(type) {
      $scope.reviewData.vibe = type;
    };
    $scope.isVibeActive = function(type) {
      return type === $scope.reviewData.vibe;
    };

    var self = this;

    $scope.AddPost = function() {
      $scope.reviewData.userName = profileName;
      $scope.reviewData.userId = profileID;
      $scope.reviewData.userAvatar = profileData.picture;
      $scope.reviewData.restaurantName = angular.copy($scope.restaurantData.restaurantName);
      $scope.reviewData.restaurantID = angular.copy($scope.restaurantData.restaurantID);
      $scope.reviewData.restaurantLocation = angular.copy($scope.restaurantData.location);
      console.log($scope.comments);
      // $scope.reviewData.comments = angular.copy($scope.state.comments);

      // $scope.reviewerData.entryType = 'Reviewed';

      var id = $scope.restaurantData.restaurantID;
      var manualId = $scope.restaurantData.restaurantName;
      var reviewer = $scope.reviewData.userName;


      if (id == undefined) {
        var firebaseID = manualId;
        var firebaseChild = "name";
      }
      else {
        var firebaseID = id;
        var firebaseChild = "restaurantID"
      }
      //add date to the reviewer list
      d = new Date();
      $scope.reviewData.date = d.toDateString();
      $scope.reviewData.dateVal = 0 - Date.now();
      $scope.restaurantData.date = d.toDateString();
      $scope.restaurantData.dateVal = 0 - Date.now();

      // Making a copy so that you don't mess with original user input
      var payloadRestaurant = angular.copy($scope.restaurantData);
      var payloadReviewer = angular.copy($scope.reviewData);

      // create restaurant object from firebase and push data to firebase
      var restoRef = new Firebase('https//dazzling-heat-4525.firebaseio.com/restaurants');
      var fbReviews = {};

      //add restautant to restaurant node in firebase.

      restoRef.orderByChild(firebaseChild).startAt(firebaseID).endAt(firebaseID).once('value', function (dataSnapshot) {
        //GET DATA

        if (dataSnapshot.exists()) {
          //if exist, you don't have to save the restaurant to the db.. just save the review data to review db
          fbReviews = new Firebase('https//dazzling-heat-4525.firebaseio.com/reviews');
          fbReviews.push(payloadReviewer);

          $state.go('app.dashboard', {}, {reload: true});
        }
        else {
          // if it does exist, push data to restaurant db and also review data to review db
          restoRef.push(payloadRestaurant);
          fbReviews = new Firebase('https//dazzling-heat-4525.firebaseio.com/reviews');
          fbReviews.push(payloadReviewer);
          $state.go('app.dashboard', {}, {reload: true});

        }
      });

      // add activity into the feed
      $scope.feedData = {};
      $scope.feedData.userName = angular.copy($scope.reviewData.userName);
      $scope.feedData.userID = angular.copy($scope.reviewData.userId);
      $scope.feedData.restaurantName = angular.copy($scope.restaurantData.restaurantName);
      $scope.feedData.restaurantID = angular.copy($scope.restaurantData.restaurantID);
      $scope.feedData.reviewType = angular.copy($scope.reviewData.reviewType);
      $scope.feedData.restaurantAddress = angular.copy($scope.restaurantData.address);
      $scope.feedData.date = angular.copy($scope.reviewData.date);
      $scope.feedData.dateVal = angular.copy($scope.reviewData.dateVal);
      $scope.feedData.userAvatar = angular.copy($scope.reviewData.userAvatar);

      var payloadFeed = angular.copy($scope.feedData);
      var feedRed = new Firebase('https//dazzling-heat-4525.firebaseio.com/feeds');
      feedRed.push(payloadFeed);

    };

  });
