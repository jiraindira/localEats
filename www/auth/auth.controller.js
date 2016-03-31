/**
 * Created by Jiraindira on 2/11/16.
 */
angular.module('starter.controllers')

.controller("AuthCtrl", function($scope,$state, Auth, profileDataService, UserService){
  $scope.login = function(){

    Auth.$onAuth(function(authData){
      if (authData === null) {
        console.log("Not logged in yet");
      } else {
        console.log("Logged in as", authData.uid);
        UserService.setUser({
          authData: authData,
          userID: authData.uid,
          firstName: authData.facebook.cachedUserProfile.first_name,
          lastName: authData.facebook.cachedUserProfile.last_name,
          link: authData.facebook.cachedUserProfile.link,
          picture : authData.facebook.profileImageURL
        });
        $state.go('app.dashboard', {}, {reload: true});
      }
    });

    Auth.$authWithOAuthPopup("facebook").catch(function(error){
      console.log(error);
    });
  };

  $scope.logout = function(){
    Auth.$unauth();
    console.log('logged out');
  };
});
