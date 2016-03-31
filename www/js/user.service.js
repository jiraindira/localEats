/**
 * Created by Jiraindira on 2/14/16.
 */
angular.module('starter.controllers')

  .service('UserService', function() {
    // For the purpose of this example I will store user data on ionic local storage but you should save it on a database
    var self = this;

    this.setUser = function(user_data) {
      this.profileData = JSON.stringify(user_data);
      //window.localStorage.starter_facebook_user = JSON.stringify(user_data);
    };

    this.getUser = function(){
      return JSON.parse(this.profileData || '{}');
    };

    return {
      getUser: this.getUser,
      setUser: this.setUser
    };
  });

