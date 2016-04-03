/**
 * Created by Jiraindira on 3/27/16.
 */

angular.module('starter.controllers')

  .controller('AddBookmarkCtrl', function($scope, $state, $stateParams, $q, Firebase, restaurantDataService, ionicMaterialInk, ionicMaterialMotion, UserService) {

    $scope.restaurantData = restaurantDataService.getRestaurant();
    var profileData = UserService.getUser();
    var profileName = profileData.firstName + " " + profileData.lastName;
    var profileID = profileData.userID;

    $scope.reviewerData = {};
    $scope.reviewerData.reviewer = profileName;
    $scope.reviewerData.id = profileID;

    var id = $scope.restaurantData.fsquareID;
    var manualId = $scope.restaurantData.name;
    var reviewer = $scope.reviewerData.reviewer;

    if (id == undefined) {
      var firebaseID = manualId;
      var firebaseChild = "name";
    }
    else {
      var firebaseID = id;
      var firebaseChild = "fsquareID"
    }
    //add date to the reviewer list
    d = new Date();
    $scope.reviewerData.date = d.toDateString();
    $scope.reviewerData.dateVal = 0 - Date.now();
    $scope.restaurantData.date = d.toDateString();
    $scope.restaurantData.dateVal = 0 - Date.now();

    // Making a copy so that you don't mess with original user input
    var payloadRestaurant = angular.copy($scope.restaurantData);
    var payloadReviewer = angular.copy($scope.reviewerData);

    // create restaurant object from firebase
    var restoRef = new Firebase('https://dazzling-heat-4525.firebaseio.com/bookmarked');
    var reviewsUrl = "";
    var fbReviews = {};

    restoRef.orderByChild(firebaseChild).startAt(firebaseID).endAt(firebaseID).once('value', function (dataSnapshot) {
      //GET DATA

      if (dataSnapshot.exists()) {
        var data = dataSnapshot.val();
        var key = Object.keys(data)[0];
        var masterList = consolidateObservation(data[key], $scope.restaurantData.observations);
        restoRef.child(key).set(masterList);
        reviewsUrl = 'https://dazzling-heat-4525.firebaseio.com/bookmarked/' + key + "/person";
        fbReviews = new Firebase(reviewsUrl);
        fbReviews.push(payloadReviewer);
        $state.go('app.dashboard', {}, {reload: true});
      }
      else {
        var pushedResto = restoRef.push(payloadRestaurant);
        reviewsUrl = 'https://dazzling-heat-4525.firebaseio.com/bookmarked/' + pushedResto.key() + "/person";
        fbReviews = new Firebase(reviewsUrl);
        fbReviews.push(payloadReviewer);
        $state.go('app.dashboard', {}, {reload: true});
      }
    });

    // add activity into the feed
    $scope.feedData = {};
    $scope.feedData.user = angular.copy($scope.reviewerData.reviewer);
    $scope.feedData.restaurantName = angular.copy($scope.restaurantData.name);
    $scope.feedData.fsquareID = angular.copy($scope.restaurantData.fsquareID);
    $scope.feedData.entryType = 'Bookmarked';
    $scope.feedData.address = angular.copy($scope.restaurantData.address);
    $scope.feedData.date = angular.copy($scope.reviewerData.date);
    $scope.feedData.dateVal = angular.copy($scope.reviewerData.dateVal);

    var payloadFeed = angular.copy($scope.feedData);
    var feedRed = new Firebase('https://dazzling-heat-4525.firebaseio.com/feed');
    feedRed.push(payloadFeed);

  });
