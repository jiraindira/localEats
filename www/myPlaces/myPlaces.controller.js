/**
 * Created by Jiraindira on 4/22/16.
 */
/**
 * Created by Jiraindira on 2/11/16.
 */
angular.module('starter.controllers')

  .controller('MyPlacesCtrl', function($scope, $state, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $firebase, $ionicModal, selectedRestaurantService, dataSourceReviewedBookmarked){

    // dataSourceReviewedBookmarked.dataSourceRB = 'Bookmarked';

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
    var firebaseObj = new Firebase('https://dazzling-heat-4525.firebaseio.com/bookmarked');

    restoRef.orderByChild(firebaseChild).startAt(firebaseID).endAt(firebaseID).once('value', function (dataSnapshot) {
      //GET DATA
      var data = dataSnapshot.val();
      sortedData.push(data);
      var restaurants = getArrayFromObject(sortedData);

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
