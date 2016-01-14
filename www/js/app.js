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
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.dashboard', {
    url: '/dashboard',
    views: {
      'menuContent': {
        templateUrl: 'templates/dashboard.html',
        controller: 'DashboardCtrl'
      }
    }
  })

  .state('app.reviewed', {
      url: '/reviewed',
      views: {
        'menuContent': {
          templateUrl: 'templates/reviewed.html',
          controller: 'ReviewedCtrl'
        },
        //'fabContent': {
        //  template: '<button id="fab-friends" class="button button-fab button-fab-bottom-right expanded button-energized-900 spin" ng-click="openModal()"><i class="icon ion-funnel"></i></button>',
        //  controller: function ($timeout) {
        //    $timeout(function () {
        //      document.getElementById('fab-friends').classList.toggle('on');
        //    }, 900);
        //  }
        //}
      }
    })

    .state('app.addchoice', {
      url: '/addchoice',
      views: {
        'menuContent': {
          templateUrl: 'templates/addchoice.html',
          controller: 'AddChoiceCtrl'
        }
      }
    })

    .state('app.searchRestaurants', {
      url: '/searchRestaurants',
      views: {
        'menuContent': {
          templateUrl: 'templates/searchRestaurants.html',
          controller: 'SearchRestaurantsCtrl'
        }
      }
    })

    .state('app.addReview', {
      url: '/addReview',
      views: {
        'menuContent': {
          templateUrl: 'templates/addReview.html',
          controller: 'AddReviewCtrl'
        }
      }
    })

    .state('app.restaurantInfo', {
      url: '/restaurant',
      views: {
        'menuContent': {
          templateUrl: 'templates/restaurant-info.html',
          controller: 'RestaurantInfoCtrl'
        }
      }
    })

    .state('app.login', {
      url: '/login',
      views: {
        'menuContent': {
          templateUrl: 'templates/login.html',
          controller: 'LoginCtrl'
        }
      }
    });

  //.state('app.profile', {
  //  url: '/profile',
  //  views: {
  //    'menuContent': {
  //      templateUrl: 'templates/profile.html',
  //      controller: 'ProfileCtrl'
  //    }
  //  }
  //});
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});
