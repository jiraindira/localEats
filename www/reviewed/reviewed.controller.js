/**
 * Created by Jiraindira on 2/11/16.
 */
angular.module('starter.controllers')

  .controller('ReviewedCtrl', function($scope, $state, $stateParams, Firebase, $ionicModal, selectedRestaurantService, Entries){

    $scope.restaurants = Entries('reviewType','Review');

    console.log("restaurants:",$scope.restaurants);

    $ionicModal.fromTemplateUrl('templates/filter-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal
    });

    $scope.openModal = function() {
      $scope.modal.show()
    };

    $scope.restaurantSelected = function(selected){
      $scope.selectedPlace = selected;
      selectedRestaurantService.selectedRestaurant = $scope.selectedPlace;
      $state.go('app.restaurantDetails', {}, {reload: true});
    };

  });
