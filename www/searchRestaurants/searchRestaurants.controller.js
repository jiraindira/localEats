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
      this.data.search = null

      if (choice === 'bookmark'){
        //make a copy of the data into bookmark variable
        //add date to the reviewer list
        d = new Date();
        $scope.restaurantData.date = d.toDateString();
        $scope.restaurantData.dateVal = 0 - Date.now();

        var bookmark = angular.copy($scope.restaurantData);

        var id = $scope.restaurantData.fsquareID;
        var manualId = $scope.restaurantData.name;

        if (id == undefined){
          var firebaseID = manualId;
          var firebaseChild = "name";
        }
        else{
          var firebaseID = id;
          var firebaseChild = "fsquareID"
        }
        
        // create restaurant object from firebase
        var restoRef = new Firebase('https://dazzling-heat-4525.firebaseio.com/bookmarked');
        restoRef.orderByChild(firebaseChild).startAt(firebaseID).endAt(firebaseID).once('value', function(dataSnapshot) {
          //GET DATA
          if (dataSnapshot.exists()){
            console.log('bookmark already exist');
          }
          else{
            var pushedResto = restoRef.push(bookmark);
          };
        })

        $state.go('app.dashboard', {}, {reload: true});
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
