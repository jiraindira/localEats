/**
 * Created by Jiraindira on 3/27/16.
 */

angular.module('starter.controllers')

  .controller('RestaurantDetailsCtrl', function($scope, $state, $stateParams, Firebase,selectedRestaurantService, ionicMaterialInk, ionicMaterialMotion ){
    $scope.item = selectedRestaurantService.getSelectedRestaurant();
    var fsquareid = $scope.item.fsquareID;
    console.log($scope.item.fsquareID);

    var firebaseObj = new Firebase('https://dazzling-heat-4525.firebaseio.com/restaurants');

    firebaseObj.orderByChild("person/status").equalTo("Bookmarked").on("child_added", function(snapshot) {
      $scope.restaurantData = snapshot.val();
      console.log($scope.restaurantData);
    });

  });
