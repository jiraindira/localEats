/**
 * Created by Jiraindira on 2/11/16.
 */
angular.module('starter.controllers')

.controller("AuthCtrl", function($scope,$state, UserService){

  $scope.login = function(){
    var ref = new Firebase("https://dazzling-heat-4525.firebaseio.com");
    ref.authWithOAuthPopup("facebook", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Facebook: Authenticated successfully with payload:", authData);
        UserService.setUser({
          authData: authData,
          userID: authData.uid,
          firstName: authData.facebook.cachedUserProfile.first_name,
          lastName: authData.facebook.cachedUserProfile.last_name,
          email: authData.facebook.cachedUserProfile.email,
          link: authData.facebook.cachedUserProfile.link,
          picture : authData.facebook.profileImageURL
        });
        $state.go('app.dashboard', {}, {reload: true});
      }
    },{
      scope: "email"
    });
  };

  $scope.loginGoogle = function(){
    var ref = new Firebase("https://dazzling-heat-4525.firebaseio.com");
    ref.authWithOAuthPopup("google", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Google: Authenticated successfully with payload:", authData);
        UserService.setUser({
          authData: authData,
          userID: authData.id,
          firstName: authData.google.cachedUserProfile.given_name,
          lastName: authData.google.cachedUserProfile.family_name,
          email: authData.google.cachedUserProfile.email,
          link: authData.google.cachedUserProfile.link,
          picture : authData.google.profileImageURL
        });
        $state.go('app.dashboard', {}, {reload: true});
      }
    },{
      scope: "email"
    });

  };

  // $scope.logout = function(){
  //   Auth.$unauth();
  //   console.log('logged out');
  // };
});
