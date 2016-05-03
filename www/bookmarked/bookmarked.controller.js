/**
 * Created by Jiraindira on 2/11/16.
 */
angular.module('starter.controllers')

  .controller('BookmarkedCtrl', function($scope, $state, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $firebase, $ionicModal, selectedRestaurantService, dataSourceReviewedBookmarked){

    dataSourceReviewedBookmarked.dataSourceRB = 'Bookmarked';

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

    firebaseObj.orderByChild("dateVal").on('child_added', function(dataSnapshot) {
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

    $scope.deleteItem = function(selected){
      console.log('delete ' + selected.restaurantName);
      var fsquareID = selected.restaurantName.fsquareID;
      //make sure the person deleting the record is the owner of the record
      if ($scope.profileData.name === selected.restaurantName.user.name) {
        //determine if you're deleting from Reviewed DB or Bookmarked DB
        if (selected.restaurantName.entryType === 'Reviewed'){
          var dbUrl = 'https://dazzling-heat-4525.firebaseio.com/reviewed';
        }
        else {
          var dbUrl = 'https://dazzling-heat-4525.firebaseio.com/bookmarked'
        }

        //get firebase ID based on fsquareID
        var restoRef = new Firebase(dbUrl);
        restoRef.orderByChild('fsquareID').startAt(firebaseID).endAt(firebaseID).once('value', function (dataSnapshot) {
          //GET DATA
          var data = dataSnapshot.val();
          var key = Object.keys(data)[0];
          var masterList = consolidateObservation(data[key], $scope.restaurantData.observations);
          restoRef.child(key).set(masterList);
          reviewsUrl = 'https://dazzling-heat-4525.firebaseio.com/reviewed/' + key + "/user";
          fbReviews = new Firebase(reviewsUrl);
          fbReviews.push(payloadReviewer);
          $state.go('app.dashboard', {}, {reload: true});

        });


      }
      else {
        console.log('Imposter!');
      }




      //get specific review based on userID in user node

      //delete item in user node

      //if it's the only item in the user node, then delete restaurant (firebaseID node)

    }

  });
