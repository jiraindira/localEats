/**
 * Created by Jiraindira on 3/27/16.
 */

angular.module('starter.controllers')

  .controller('RestaurantDetailsCtrl', function($scope, $state, $stateParams, Firebase,selectedRestaurantService, ionicMaterialInk, ionicMaterialMotion ){
    $scope.item = selectedRestaurantService.getSelectedRestaurant();
    var fsquareid = $scope.item.fsquareID;
    var entryType = $scope.item.entryType;

    var firebaseObjReviewed = new Firebase('https://dazzling-heat-4525.firebaseio.com/reviewed');
    var firebaseObjBookmarked = new Firebase('https://dazzling-heat-4525.firebaseio.com/bookmarked');

    firebaseObjReviewed.orderByChild("fsquareID").equalTo(fsquareid).once("child_added", function(snapshot) {
      $scope.reviewData = snapshot.val();
      // console.log($scope.restaurantData);
      $scope.numOfReviews = snapshot.child("user").numChildren();

      if(entryType === 'Reviewed')
      {
        $scope.restaurantData = angular.copy($scope.reviewData);
      }
    });

    firebaseObjBookmarked.orderByChild("fsquareID").equalTo(fsquareid).once("child_added", function(snapshot) {
      $scope.bookmarkData = snapshot.val();
      // console.log($scope.restaurantData);
      $scope.numOfBookmarks = snapshot.child("user").numChildren();

      if(entryType === 'Bookmarked')
      {
        $scope.restaurantData = angular.copy($scope.bookmarkData);
      }
    });

  });
