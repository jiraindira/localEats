/**
 * Created by Jiraindira on 2/11/16.
 */
angular.module('starter.controllers')

  .controller('MyPlacesCtrl', function($scope, $state, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $firebase, $ionicModal, Entries, UserService){

    $scope.profileData = UserService.getUser();
    console.log($scope.profileData.userID);
    $scope.restaurants = Entries('userId',$scope.profileData.userID);

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
