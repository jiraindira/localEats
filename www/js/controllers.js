angular.module('starter.controllers', ['myService'])

.controller('FilterCtrl', function($scope, Firebase, filterService, Entries ) {

  var vm1 = this;

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.filterService = filterService;

  if (!filterService.allCities.length) {

    var arrEntries = Entries('reviewType','Review');

    // Retrieve all cities and reviewers
    var uniqueCities = [];
    var duplicateCities = [];
    var uniqueReviewers = [];
    var duplicateReviewers = [];

    arrEntries.$loaded()
      .then(function(){

        //fill filterService.allcities with data
        angular.forEach(arrEntries, function(arrEntry) {
          duplicateCities.push(arrEntry.restaurantLocation);
        });

        uniqueCities = _.unique(duplicateCities).map(function (city) {
          return {
            name: city
          }
        });

        filterService.allCities = uniqueCities;

        //fill filterService.allReviewers with data
        angular.forEach(arrEntries, function(arrEntry) {
          duplicateReviewers.push(arrEntry.userName);
        });

        uniqueReviewers = _.unique(duplicateReviewers).map(function (reviewer) {
          return {
            name: reviewer
          }
        });

        filterService.allReviewers = uniqueReviewers;
      });
  }
})
  
.service('restaurantDataService', function(){
    var self = this;

    this.RestaurantAttributes = [];
    this.RestaurantReviews = [];
    this.RestaurantFeeds = [];

    this.getRestaurantAttributes = function(){
      return self.RestaurantAttributes;
    };

    this.getRestaurantReviews = function(){
      return self.RestaurantReviews;
    };

    this.getRestaurantFeeds = function(){
      return self.RestaurantFeeds;
    };
})

.service('selectedRestaurantService', function(){
  var self = this;

  this.selectedRestaurant = [];

  this.getSelectedRestaurant = function(){
    return self.selectedRestaurant;
  };

})

.filter('myFilter',function(filterService){
  return function(input){

    var reviewers = filterService.getSelectedReviewers();
    var cities = filterService.getSelectedCities();


    //save the input in a temp output
    var tempOutput = input;

    if(reviewers.length>0){
      //apply reviewer filter on data

      tempOutput = filterReviewer(tempOutput,reviewers);
    }

    if(cities.length>0){
      //apply reviewer filter on data
      tempOutput = filterCity(tempOutput,cities);
    }

    function filterReviewer(allRestaurants, selectedReviewers) {
      // Get restaurants that are reviewed by the selected reviewers
      return allRestaurants.filter(function (restaurant) {
        //return true
        var reviews = getArrayFromObject(restaurant.user);
        return reviews.some(function(review) {
          return _.find(selectedReviewers, {name: review.reviewer});
        })
      });
    }

    function filterCity(allRestaurants, selectedCities){
      // get restaurants that matches a selected cities
      return allRestaurants.filter(function (restaurant){
        //return true
        return _.find(selectedCities, {name: restaurant.location});
      })
    }

    return tempOutput;
  }
})

.service('filterService',function(){
  var self = this;

  this.allReviewers = [];
  this.allCities = [];

  function getSelectedOnly(array){
    return array.filter(function(item){
      return item.isSelected;
    })
  }

  this.getSelectedReviewers = function(){
    return getSelectedOnly(self.allReviewers)
  }

  this.getSelectedCities = function(){
    return getSelectedOnly(self.allCities)
  }
})

.service('profileDataService', function(){
  var self = this;
  this.userProfile = [];

  this.getUserProfile = function(){
    return self.userProfile;
  }

});


