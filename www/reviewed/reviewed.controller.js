/**
 * Created by Jiraindira on 2/11/16.
 */
angular.module('starter.controllers')

  .controller('ReviewedCtrl', function($scope, $state, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $firebase, $ionicModal, selectedRestaurantService){

    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
      $scope.isExpanded = false;
      $scope.$parent.setExpanded(false);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();

    function getArrayFromObject(object) {
      var array = [];
      for (var key in object) {
        var item = object[key];
        item.id = key;
        array.push(item);
      }
      return array;
    }

    var sortedData = [];
    var firebaseObj = new Firebase('https://dazzling-heat-4525.firebaseio.com/reviewed');

    firebaseObj.orderByChild("dateVal").on('child_added', function(dataSnapshot) {
      //GET DATA
      var data = dataSnapshot.val();
      sortedData.push(data);
      var restaurants = getArrayFromObject(sortedData);

      if (!restaurants.length) return;
      // Attach list of selected observations to each review)
      restaurants.forEach(function (restaurant) {
        restaurant.reviews = getArrayFromObject(restaurant.reviews);

        // pandai pandai la
        restaurant.observations = Object.keys(restaurant.observations)
          .filter(function (key) {
            return restaurant.observations[key];
          });
      });

      _.defer(function(){
        $scope.$apply(function () {
          $scope.restaurants = restaurants;
        });
      });
    });

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
