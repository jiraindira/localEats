// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'ionic-material', 'ionMdInput', 'firebase'])

.run(function($ionicPlatform) {

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
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'menu/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.dashboard', {
    url: '/dashboard',
    views: {
      'menuContent': {
        templateUrl: 'dashboard/dashboard.html',
        controller: 'DashboardCtrl'
      }
    }
  })

  .state('app.myplaces', {
    url: '/myPlaces',
    views: {
      'menuContent': {
        templateUrl: 'myPlaces/myPlaces.html',
        controller: 'MyPlacesCtrl'
      }
    }
  })

  .state('app.reviewed', {
    url: '/reviewed',
    views: {
      'menuContent': {
        templateUrl: 'reviewed/reviewed.html',
        controller: 'ReviewedCtrl'
      }
    }
    })

    .state('app.bookmarked', {
      url: '/bookmarked',
      views: {
        'menuContent': {
          templateUrl: 'bookmarked/bookmarked.html',
          controller: 'BookmarkedCtrl'
        }
      }
    })

    .state('app.addBookmark', {
      url: '/dashboard',
      views: {
        'menuContent': {
          templateUrl: 'dashboard/dashboard.html',
          controller: 'AddBookmarkCtrl'
        }
      }
    })

    .state('app.searchRestaurants', {
      url: '/searchRestaurants',
      views: {
        'menuContent': {
          templateUrl: 'searchRestaurants/searchRestaurants.html',
          controller: 'SearchRestaurantsCtrl'
        }
      }
    })

    .state('app.addReview', {
      url: '/addReview',
      views: {
        'menuContent': {
          templateUrl: 'addReview/addReview.html',
          controller: 'AddReviewCtrl'
        }
      }
    })

    .state('app.restaurantDetails', {
      url: '/restaurant',
      views: {
        'menuContent': {
          templateUrl: 'restaurantDetails/restaurantDetails.html',
          controller: 'RestaurantDetailsCtrl'
        }
      }
    })

    .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'auth/login.html',
          controller: 'AuthCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
})
  .constant('FirebaseUrl', 'https//dazzling-heat-4525.firebaseio.com/');
