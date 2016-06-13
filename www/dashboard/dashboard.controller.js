/**
 * Created by Jiraindira on 2/11/16.
 */
angular.module('starter.controllers')

  .controller('DashboardCtrl', function($scope, $state, $stateParams, Firebase, $timeout, ionicMaterialMotion, ionicMaterialInk,UserService, restaurantDataService, selectedRestaurantService, Feeds){

    $scope.profileData = UserService.getUser();
    $scope.feeds = Feeds;

    // Set Motion
    $timeout(function() {
      ionicMaterialMotion.slideUp({
        selector: '.slide-up'
      });
    }, 300);

    $timeout(function() {
      ionicMaterialMotion.fadeSlideInRight({
        startVelocity: 3000
      });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();

    $scope.restaurantSelected = function(selected){
      $scope.selectedPlace = selected;
      selectedRestaurantService.selectedRestaurant = $scope.selectedPlace;
      $state.go('app.restaurantDetails', {}, {reload: true});
    };

  });

