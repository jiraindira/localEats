/**
 * Created by Jiraindira on 2/11/16.
 */
angular.module('starter.controllers')

  .controller('BookmarkedCtrl', function($scope, $state, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $firebase, $ionicModal, Entries){

    $scope.restaurants = Entries('reviewType','Bookmark');
    
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
