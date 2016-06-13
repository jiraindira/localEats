/**
 * Created by Jiraindira on 3/27/16.
 */

angular.module('starter.controllers')

  .controller('RestaurantDetailsCtrl', function($scope, $state, $stateParams, Firebase,selectedRestaurantService, ionicMaterialInk, ionicMaterialMotion, Entries, Restaurant ){
    $scope.item = selectedRestaurantService.getSelectedRestaurant();

    // $scope.restaurantData = Restaurant($scope.item.restaurantID).val();
    var arrRestaurantDetails = Restaurant($scope.item.restaurantID);
    arrRestaurantDetails.$loaded()
      .then(function(){
        $scope.restaurantData = arrRestaurantDetails;
      });

    var arrReviews = Entries('restaurantID',$scope.item.restaurantID);
    arrReviews.$loaded()
      .then(function(){
        //filter non reviews
        var data = getSelectedRestaurant(arrReviews);
        $scope.reviews = data;
        $scope.numOfReviews = data.length;
        $scope.numOfBookmarks = countReviewType(arrReviews);
      });
    // $scope.reviews = Entries('Review');


    function getSelectedRestaurant(object) {
      var array = [];
      for (var key in object) {
        if (key.substring(0,1) != '$'){
          var item = object[key];
          if (item.reviewType == 'Review') {
            array.push(item);
          };
        }
      }
      return array;
    };

    function countReviewType(object) {
      var counter = 0;
      for (var key in object) {
        if (key.substring(0,1) != '$'){
          var item = object[key];
          if (item.reviewType == 'Bookmark') {
            counter = counter + 1;
          };
        }
      }
      return counter;
    };

  });
