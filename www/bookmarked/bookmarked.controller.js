/**
 * Created by Jiraindira on 2/11/16.
 */
angular.module('starter.controllers')

  .controller('BookmarkedCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $firebase, $ionicModal){

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

  });