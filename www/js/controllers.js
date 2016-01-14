angular.module('starter.controllers', ['myService'])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {

  // Form data for the login modal
  $scope.loginData = {};
  $scope.isExpanded = false;
  $scope.hasHeaderFabLeft = false;
  $scope.hasHeaderFabRight = false;

  var navIcons = document.getElementsByClassName('ion-navicon');
  for (var i = 0; i < navIcons.length; i++) {
    navIcons.addEventListener('click', function() {
      this.classList.toggle('active');
    });
  }

  ////////////////////////////////////////
  // Layout Methods
  ////////////////////////////////////////

  $scope.hideNavBar = function() {
    document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
  };

  $scope.showNavBar = function() {
    document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
  };

  $scope.noHeader = function() {
    var content = document.getElementsByTagName('ion-content');
    for (var i = 0; i < content.length; i++) {
      if (content[i].classList.contains('has-header')) {
        content[i].classList.toggle('has-header');
      }
    }
  };

  $scope.setExpanded = function(bool) {
    $scope.isExpanded = bool;
  };

  $scope.setHeaderFab = function(location) {
    var hasHeaderFabLeft = false;
    var hasHeaderFabRight = false;

    switch (location) {
      case 'left':
        hasHeaderFabLeft = true;
        break;
      case 'right':
        hasHeaderFabRight = true;
        break;
    }

    $scope.hasHeaderFabLeft = hasHeaderFabLeft;
    $scope.hasHeaderFabRight = hasHeaderFabRight;
  };

  $scope.hasHeader = function() {
    var content = document.getElementsByTagName('ion-content');
    for (var i = 0; i < content.length; i++) {
      if (!content[i].classList.contains('has-header')) {
        content[i].classList.toggle('has-header');
      }
    }

  };

  $scope.hideHeader = function() {
    $scope.hideNavBar();
    $scope.noHeader();
  };

  $scope.showHeader = function() {
    $scope.showNavBar();
    $scope.hasHeader();
  };

  $scope.clearFabs = function() {
    var fabs = document.getElementsByClassName('button-fab');
    if (fabs.length && fabs.length > 1) {
      fabs[0].remove();
    }
  };
})

.controller('LoginCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk){

  $scope.$parent.clearFabs();
  $timeout(function() {
    $scope.$parent.hideHeader();
  }, 0);
  ionicMaterialInk.displayEffect();
})

.controller('DashboardCtrl', function($scope, $stateParams, Firebase, $timeout, ionicMaterialMotion, ionicMaterialInk){
  // Set Header
  $scope.$parent.showHeader();
  $scope.$parent.clearFabs();
  $scope.isExpanded = false;
  $scope.$parent.setExpanded(false);
  $scope.$parent.setHeaderFab(false);

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
    //GET DATA

  //});

})

.controller('ReviewedCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion, $firebase, $ionicModal){

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

    $scope.$apply(function () {
      $scope.restaurants = restaurants;
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
  //
  //$scope.closeModal = function() {
  //  $scope.modal.hide();
  //};
  //
  //$scope.$on('$destroy', function() {
  //  $scope.modal.remove();
  //});

})

.controller('AddChoiceCtrl', function($scope, $stateParams){

})

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

    placesExplorerService.get({ near: $scope.restaurantData.location , query: query , limit: 4 },function(result){
      defered.resolve(result.response.minivenues);
      console.log(result.response)
    });
    return defered.promise;
  }
})

.controller('AddReviewCtrl', function($scope, $state, $stateParams, $q, Firebase, restaurantDataService, ionicMaterialInk, ionicMaterialMotion) {

  $scope.restaurantData = restaurantDataService.getRestaurant();
  //$scope.userProfile = profileDataService.getUserProfile();
  var displayName = 'Jirain';

  // we will store all of the reviewer's specific data here
  $scope.reviewerData = {};
  $scope.reviewerData.dish = "";
  $scope.reviewerData = {
    food: 'good',
    service: 'good',
    vibe: 'good'
  };

  $scope.setFoodActive = function(type) {
    $scope.reviewerData.food = type;
  };
  $scope.isFoodActive = function(type) {
    return type === $scope.reviewerData.food;
  };

  $scope.setServiceActive = function(type) {
    $scope.reviewerData.service = type;
  };
  $scope.isServiceActive = function(type) {
    return type === $scope.reviewerData.service;
  };

  $scope.setVibeActive = function(type) {
    $scope.reviewerData.vibe = type;
  };
  $scope.isVibeActive = function(type) {
    return type === $scope.reviewerData.vibe;
  };

  $scope.restaurantData.observations = [
    {
      name: 'Big Group',
      isSelected: false
    },
    {
      name: 'Casual',
      isSelected: false
    },
    {
      name: 'Conversations',
      isSelected: false
    },
    {
      name: 'Crowded',
      isSelected: false
    },
    {
      name: 'Date Spot',
      isSelected: false
    },
    {
      name: 'Value For Money',
      isSelected: false
    },
    {
      name: 'Service',
      isSelected: false
    },
    {
      name: 'View',
      isSelected: false
    },
    {
      name: 'Long Wait',
      isSelected: false
    },
    {
      name: 'Meeting',
      isSelected: false
    },
    {
      name: 'Mixiology',
      isSelected: false
    },
    {
      name: 'Romantic',
      isSelected: false
    },
    {
      name: 'Outdoor Space',
      isSelected: false
    }
  ];

  var self = this;

  $scope.AddPost = function(){
    $scope.reviewerData.reviewer = 'Jirain';

    var id = $scope.restaurantData.fsquareID;
    var manualId = $scope.restaurantData.name;
    var reviewer = $scope.reviewerData.reviewer;

    if (id == undefined){
      var firebaseID = manualId;
      var firebaseChild = "name";
    }
    else{
      var firebaseID = id;
      var firebaseChild = "fsquareID"
    }
    //add date to the reviewer list
    d = new Date();
    $scope.reviewerData.date = d.toDateString();
    $scope.reviewerData.dateVal = 0 - Date.now();
    $scope.restaurantData.date = d.toDateString();
    $scope.restaurantData.dateVal = 0 - Date.now();

    // Making a copy so that you don't mess with original user input
    var payloadRestaurant = angular.copy($scope.restaurantData);
    var payloadReviewer = angular.copy($scope.reviewerData);

    // create restaurant object from firebase
    var restoRef = new Firebase('https://dazzling-heat-4525.firebaseio.com/reviewed');
    var reviewsUrl = "";
    var fbReviews = {};

    restoRef.orderByChild(firebaseChild).startAt(firebaseID).endAt(firebaseID).once('value', function(dataSnapshot) {
      //GET DATA

      if (dataSnapshot.exists()){
        var data = dataSnapshot.val();
        var key = Object.keys(data)[0];
        var masterList = consolidateObservation(data[key],$scope.restaurantData.observations);
        restoRef.child(key).set(masterList);
        reviewsUrl = 'https://dazzling-heat-4525.firebaseio.com/reviewed/' + key + "/reviews";
        fbReviews = new Firebase(reviewsUrl);
        fbReviews.push(payloadReviewer);
        $state.go('app.dashboard', {}, {reload: true});
      }
      else{
        //var masterList1 = consolidateObservation(payloadRestaurant,$scope.restaurantData.observations);
        var pushedResto = restoRef.push(payloadRestaurant);
        reviewsUrl = 'https://dazzling-heat-4525.firebaseio.com/reviewed/' + pushedResto.key() + "/reviews";
        fbReviews = new Firebase(reviewsUrl);
        fbReviews.push(payloadReviewer);
        $state.go('app.dashboard', {}, {reload: true});

      };



    });

    //consolidate observations into a master list
    function consolidateObservation(masterObservation,userObservation){
      for (var i in userObservation){
        if (userObservation[i].isSelected === true){
          // i need to fix this. I should refer to the name instead of the i
          masterObservation.observations[i] = angular.copy(userObservation[i]);
        }

      }
      return masterObservation;
    }

  };
})

.controller('RestaurantInfoCtrl', function($scope, $state, $stateParams, Firebase,restaurantDataService, ionicMaterialInk, ionicMaterialMotion ){
  $scope.restaurantData = restaurantDataService.getRestaurant();

})
.controller('FilterCtrl', function($scope, Firebase, filterService ) {

  var vm1 = this;
  $scope.test = 'jirain';

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.filterService = filterService;

  if (!filterService.allReviewers.length) {
    var firebaseObj = new Firebase('https://dazzling-heat-4525.firebaseio.com/reviewed');
    firebaseObj.once('value', function (dataSnapshot) {
      //GET DATA
      var data = dataSnapshot.val();
      var restaurants = getArrayFromObject(data);

      // store data in a $scope
      $scope.RestaurantData = restaurants;

      if (!restaurants.length) return;

      // Retrieve all cities
      var allCities = [];
      restaurants.forEach(function(restaurant){
        allCities.push(restaurant.location);
      });

      allCities = _.unique(allCities).map(function (city) {
        return {
          name: city
        }
      });
      filterService.allCities = allCities;

      //Retrieve all reviewers
      var allReviewers = [];
      restaurants.forEach(function (restaurant) {
        var reviews = getArrayFromObject(restaurant.reviews);
        reviews.forEach(function (review) {
          allReviewers.push(review.reviewer);
        });
      });

      allReviewers = _.unique(allReviewers).map(function (reviewer) {
        return {
          name: reviewer
        }
      });

      filterService.allReviewers = allReviewers;
      //$scope.reviewers = users;

    });
  }

  function getArrayFromObject(object) {
    var array = [];
    for (var key in object) {
      var item = object[key];
      item.id = key;
      array.push(item);
    }
    return array;
  }
})

.service('restaurantDataService', function(){
    var self = this;

    this.RestaurantAttributes = [];

    this.getRestaurant = function(){
      return self.RestaurantAttributes;
    }


})

.filter('myFilter',function(filterService){
  return function(input){
    //if (angular.isUndefined(input)) return;
    if (!angular.isArray(input)) return;
    var reviewers = filterService.getSelectedReviewers();
    var cities = filterService.getSelectedCities();


    //save the input in a temp output
    var tempOutput = getArrayFromObject(input);

    if(reviewers.length>0){
      //apply reviewer filter on data

      tempOutput = filterReviewer(tempOutput,reviewers);
    }

    if(cities.length>0){
      //apply reviewer filter on data
      tempOutput = filterCity(tempOutput,cities);
    }

    function getArrayFromObject(object) {
      var array = [];
      for (var key in object) {
        var item = object[key];
        item.id = key;
        array.push(item);
      }
      return array;
    }

    function filterReviewer(allRestaurants, selectedReviewers) {
      // Get restaurants that are reviewed by the selected reviewers
      return allRestaurants.filter(function (restaurant) {
        //return true
        var reviews = getArrayFromObject(restaurant.reviews);
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
});

