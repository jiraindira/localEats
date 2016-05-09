/**
 * Created by Jiraindira on 2/11/16.
 */
angular.module('starter.controllers')

.controller("AuthCtrl", function($scope,$state, UserService){

  /**
   *
   * @param strategy 'facebook'/'google'
     */
  $scope.login = function (strategy){
    var ref = new Firebase("https://dazzling-heat-4525.firebaseio.com");
    ref.authWithOAuthPopup(strategy, function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);

        $state.go('app.dashboard', {}, {reload: true});
      }
    },{
      scope: "email"
    });
  };

  // $scope.loginGoogle = function(){
  //   var ref = new Firebase("https://dazzling-heat-4525.firebaseio.com");
  //   ref.authWithOAuthPopup("google", function(error, authData) {
  //     if (error) {
  //       console.log("Login Failed!", error);
  //     } else {
  //       console.log("Google: Authenticated successfully with payload:", authData);
  //
  //       $state.go('app.dashboard', {}, {reload: true});
  //     }
  //   },{
  //     scope: "email"
  //   });
  //
  // };

});
