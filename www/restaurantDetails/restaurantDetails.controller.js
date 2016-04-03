/**
 * Created by Jiraindira on 3/27/16.
 */

angular.module('starter.controllers')

  .controller('RestaurantDetailsCtrl', function($scope, $state, $stateParams, Firebase,selectedRestaurantService, ionicMaterialInk, ionicMaterialMotion ){
    $scope.item = selectedRestaurantService.getSelectedRestaurant();
    var fsquareid = $scope.item.fsquareID;

    var firebaseObj = new Firebase('https://dazzling-heat-4525.firebaseio.com/reviewed');
    var firebaseObj2 = new Firebase('https://dazzling-heat-4525.firebaseio.com/bookmarked');

    firebaseObj.orderByChild("fsquareID").equalTo(fsquareid).once("child_added", function(snapshot) {
      $scope.restaurantData = snapshot.val();
      // console.log($scope.restaurantData);
      $scope.numOfReviews = snapshot.child("reviews").numChildren();
    });

    firebaseObj2.orderByChild("fsquareID").equalTo(fsquareid).once("child_added", function(snapshot) {
      $scope.restaurantData = snapshot.val();
      // console.log($scope.restaurantData);
      $scope.numOfBookmarks = snapshot.child("person").numChildren();
    });


  });
