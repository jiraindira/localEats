/**
 * Created by Jiraindira on 2/14/16.
 */


// angular.module('localeats.api', [
//
// ])
//
// .service('apiService', function ($firebaseObject) {
//   function getFirebaseObj(path) {
//     var ref = new Firebase('https://dazzling-heat-4525.firebaseio.com/' + path);
//     return $firebaseObject(ref);
//   }
//
//   var user = {
//     getById: function (id) {
//       return getFirebaseObj('user').$loaded;
//     }
//   };
//
//   var bookmarked = {};
//   var reviewed = {};
//
//   return {
//     user: user,
//     bookmarked: bookmarked,
//     reviewed: reviewed
//   }
// });

angular.module('starter.controllers')

  .service('UserService', function (Auth) {
    // var self = this;

    // this.setUser = function(user_data) {
    //   this.profileData = JSON.stringify(user_data);
    // };

    this.getUser = function(){
      var authData = Auth.$getAuth();

      console.log('authData', authData)
      if (authData.google) {
        return {
          // authData: authData,
          userID: authData.uid,
          firstName: authData.google.cachedUserProfile.given_name,
          lastName: authData.google.cachedUserProfile.family_name,
          email: authData.google.cachedUserProfile.email,
          link: authData.google.cachedUserProfile.link,
          picture : authData.google.profileImageURL
        };
      } else if (authData.facebook) {
        return {
          // authData: authData,
          userID: authData.uid,
          firstName: authData.facebook.cachedUserProfile.first_name,
          lastName: authData.facebook.cachedUserProfile.last_name,
          email: authData.facebook.cachedUserProfile.email,
          link: authData.facebook.cachedUserProfile.link,
          picture : authData.facebook.profileImageURL
        };
      }



      // return JSON.parse(this.profileData || '{}');
    };

    // return {
    //   getUser: this.getUser,
    //   setUser: this.setUser
    // };
  });

