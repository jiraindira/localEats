/**
 * Created by Jiraindira on 3/27/16.
 */

angular.module('starter.controllers')

  .controller('SearchRestaurantsCtrl', function($scope, $state, $stateParams, $q, Firebase, placesExplorerService, restaurantDataService, ionicMaterialInk, ionicMaterialMotion) {

    // we will store all of the restaurant specific data here
    
    $scope.restaurantData = {};
    // we will store all of the reviewer's specific data here

    $scope.restaurantData.location = "New York";

    var self = this;

    $scope.search = function (query) {

      get4SquareRestaurants(query).then(function (data) {
        $scope.places = data;
        console.log(data);
      });
    }

    $scope.itemSelected = function(selected, choice){

      $scope.selectedPlace = selected;
      $scope.placeSelected = true;

      //store info from fsquare and move to next view
      $scope.restaurantData.name = selected.name;
      $scope.restaurantData.address = selected.location.address;
      $scope.restaurantData.location = selected.location.city;
      $scope.restaurantData.fsquareID = selected.id;
      if ("crossStreet" in selected.location){
        $scope.restaurantData.crossStreet = selected.location.crossStreet;
      }
      else
      {
        $scope.restaurantData.crossStreet = "N/A"
      }
      $scope.restaurantData.longitude = selected.location.lng;
      $scope.restaurantData.latitude = selected.location.lat;

      restaurantDataService.RestaurantAttributes = $scope.restaurantData;
      this.data.search = null;

      if (choice === 'bookmark'){
        $state.go('app.addBookmark', {}, {reload: true});
      }
      else{
        $state.go('app.addReview', {}, {reload: true});
      }

    };

    function get4SquareRestaurants(query){
      //var location = "New York";
      var defered = $q.defer();

      placesExplorerService.get({ near: $scope.restaurantData.location , query: query , limit: 10 },function(result){
        defered.resolve(result.response.minivenues);
        console.log(result.response)
      });
      return defered.promise;
    }
  });
