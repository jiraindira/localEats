/**
 * Created by Jiraindira on 2/11/16.
 */
angular.module('starter.controllers')

  .controller('DashboardCtrl', function($scope, $state, $stateParams, Firebase, $timeout, ionicMaterialMotion, ionicMaterialInk,UserService, selectedRestaurantService){
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);
    $scope.profileData = UserService.getUser();

    console.log($scope.profileData.picture);
    console.log($scope.profileData.firstName);

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
    //
    // firebaseObj.orderByChild("fsquareID").equalTo(fsquareid).on("child_added", function(snapshot) {
    //   $scope.restaurantData = snapshot.val();
    //   console.log($scope.restaurantData);
    // });
    //

    firebaseObj.orderByChild("dateVal").on('child_added', function(dataSnapshot) {
      //firebaseObj.once('value', function(dataSnapshot){
      var data = dataSnapshot.val();
      sortedData.push(data);

      var restaurants = getArrayFromObject(sortedData);

      if (!restaurants.length) return;

      $scope.$apply(function () {
        $scope.restaurants = restaurants;
      });

    });

    $scope.restaurantSelected = function(selected){

      $scope.selectedPlace = selected;
      selectedRestaurantService.selectedRestaurant = $scope.selectedPlace;

      $state.go('app.restaurantDetails', {}, {reload: true});

    };
  });

