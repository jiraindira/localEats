// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material', 'ionMdInput', 'firebase', 'ngCordova'])

  .factory('Auth', function($firebaseAuth, FirebaseUrl) {
  var ref = new Firebase(FirebaseUrl);
  return $firebaseAuth(ref);
})

  .factory('Feeds', ["$firebaseArray", function($firebaseArray){
  var ref = new Firebase("https//dazzling-heat-4525.firebaseio.com/feeds");
  return $firebaseArray(ref);
}])

  .factory('Restaurant', ["$firebaseArray", function($firebaseArray){

    var arrRestaurant = [];
    arrRestaurant = function(restaurantID) {
      var restRef = new Firebase("https//dazzling-heat-4525.firebaseio.com/restaurants").orderByChild('restaurantID').equalTo(restaurantID);
      var arrData =  $firebaseArray(restRef);
      console.log("arrData:",arrData)
      return arrData;
    };

    return arrRestaurant;
  }])

  .factory('Entries', ["$firebaseArray", function($firebaseArray){

    var arrEntries = [];
    arrEntries = function(key, value) {
      var entriesRef = new Firebase("https//dazzling-heat-4525.firebaseio.com/reviews").orderByChild(key).equalTo(value);
      var arrData =  $firebaseArray(entriesRef);
      return arrData;
    };

    return arrEntries;
  }])

.run(function($ionicPlatform, $rootScope, $state) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on("$stateChangeError", function(event, toState, toParams, fromState, fromParams, error) {
    // We can catch the error thrown when the $requireAuth promise is rejected
    // and redirect the user back to the home page
    console.log('$stateChangeError', error)

    if (error === "AUTH_REQUIRED") {
      $state.go('account.login');
    }
  });

  $rootScope.$on("$stateChangeError", function (event, toState) {
    console.log('$stateChangeError', toState)
  })
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/',
    abstract: true,
    templateUrl: 'menu/menu.html',
    controller: 'AppCtrl',
    resolve: {
      currentAuth: function (Auth) {
        return Auth.$requireAuth();
      }
    }
  })

  .state('app.dashboard', {
    url: '',
    views: {
      'mainContent': {
        templateUrl: 'dashboard/dashboard.html',
        controller: 'DashboardCtrl'
      }
    }
  })

  .state('app.myplaces', {
    url: '/places',
    views: {
      'mainContent': {
        templateUrl: 'myPlaces/myPlaces.html',
        controller: 'MyPlacesCtrl'
      }
    }
  })

  .state('app.reviewed', {
    url: '/reviewed',
    views: {
      'mainContent': {
        templateUrl: 'reviewed/reviewed.html',
        controller: 'ReviewedCtrl'
      }
    }
    })

    .state('app.addRestaurant', {
      url: '/add',
      views: {
        'mainContent': {
          templateUrl: 'addRestaurant/addRestaurant.html',
          controller: 'AddRestaurantCtrl'
        }
      }
    })

    .state('app.map', {
      url: '/map',
      views: {
        'mainContent': {
          templateUrl: 'map/map.html',
          controller: 'MapCtrl'
        }
      }
    })

    .state('app.bookmarked', {
      url: '/bookmarked',
      views: {
        'mainContent': {
          templateUrl: 'bookmarked/bookmarked.html',
          controller: 'BookmarkedCtrl'
        }
      }
    })

    .state('app.addBookmark', {
      url: '/dashboard',
      views: {
        'mainContent': {
          templateUrl: 'dashboard/dashboard.html',
          controller: 'AddBookmarkCtrl'
        }
      }
    })

    .state('app.searchRestaurants', {
      url: '/searchRestaurants',
      views: {
        'mainContent': {
          templateUrl: 'searchRestaurants/searchRestaurants.html',
          controller: 'SearchRestaurantsCtrl'
        }
      }
    })

    .state('app.addReview', {
      url: '/addReview',
      views: {
        'mainContent': {
          templateUrl: 'addReview/addReview.html',
          controller: 'AddReviewCtrl'
        }
      }
    })

    .state('app.restaurantDetails', {
      url: '/restaurant',
      views: {
        'mainContent': {
          templateUrl: 'restaurantDetails/restaurantDetails.html',
          controller: 'RestaurantDetailsCtrl'
        }
      }
    })

    .state('account', {
      url: '/account',
      abstract: true,
      template: '<ion-nav-view name="accountContent"></ion-nav-view>'
    })

    .state('account.login', {
      url: '/login',
      views: {
        'accountContent': {
          templateUrl: 'auth/login.html',
          controller: 'AuthCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
})
  .constant('FirebaseUrl', 'https//dazzling-heat-4525.firebaseio.com/');
