// Ionic Starter App

angular.module('config', []).constant('API_ENDPOINT', {
  url: 'https://linnstagram-server.herokuapp.com/'
});

angular.module('starter.services', ['config']);
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova'])

.run(function($ionicPlatform, $rootScope, User, $state) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });

  $rootScope.$on('$stateChangeError', function(e, toState, toParams, fromState, fromParams, error){
      $state.go("login");
  });
})


.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

   $ionicConfigProvider.tabs.position('bottom');
   $ionicConfigProvider.tabs.style('standard');
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html',
    resolve: { islogged: function(User){
        return User.isLogged();
      }
    }
  })

  // Each tab has its own nav history stack:
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'SignupCtrl'
  })

  // Home //
  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/Home/tab-home.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('comment', {
    url: '/comment/:postId',
    templateUrl: 'templates/Home/comments.html',
    controller: 'PostCommentCtrl'
  })

  // End Home //

  // Search //
  .state('tab.search', {
    url: '/search',
    views: {
      'tab-search': {
        templateUrl: 'templates/Search/tab-search.html',
        controller: 'SearchCtrl'
      }
    }
  })

  .state('tab.search-top', {
    url: '/search-top',
    views: {
      'tab-search': {
        templateUrl: 'templates/Search/tab-search-top.html',
        controller: 'SearchCtrl-top'
      }
    }
  })

  .state('tab.search-people', {
    url: '/search-people',
    views: {
      'tab-search': {
        templateUrl: 'templates/Search/tab-search-people.html',
        controller: 'SearchCtrl-people'
      }
    }
  })

  .state('tab.search-tags', {
    url: '/search-tags',
    views: {
      'tab-search': {
        templateUrl: 'templates/Search/tab-search-tags.html',
        controller: 'SearchCtrl-tags'
      }
    }
  })

  .state('tab.search-places', {
    url: '/search-places',
    views: {
      'tab-search': {
        templateUrl: 'templates/Search/tab-search-places.html',
        controller: 'SearchCtrl-places'
      }
    }
  })
  // End Search //

  // Camera //
  .state('camera', {
    url: '/camera',
    templateUrl: 'templates/Camera/tab-camera.html',
    controller: 'CameraCtrl'
  })

  .state('post-confirm', {
    url: '/confirm',
    templateUrl: 'templates/Camera/post-confirm.html',
    controller: 'PostConfirmCtrl'
  })

  // End Camera //

  // Love //
  .state('tab.love-following', {
	url: '/love/following',
    views: {
      'tab-love': {
        templateUrl: 'templates/Love/tab-love-following.html',
        controller: 'LoveCtrl'
      }
    }
  })

  .state('tab.love-you', {
  url: '/love/you',
    views: {
      'tab-love': {
        templateUrl: 'templates/Love/tab-love-you.html',
        controller: 'LoveCtrl'
      }
    }
  })

  // End Love //

  // Account //
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/Account/tab-account-grid.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('tab.account-list', {
    url: '/account/list',
    views: {
      'tab-account': {
        templateUrl: 'templates/Account/tab-account-list.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('tab.account-photo', {
    url: '/account/photo',
    views: {
      'tab-account': {
        templateUrl: 'templates/Account/tab-account-photo.html',
        controller: 'AccountCtrl'
      }
    }
  })
  .state('tab.account-options', {
    url: '/account/options',
    views: {
      'tab-account': {
        templateUrl: 'templates/Account/tab-account-options.html',
        controller: 'AccountCtrl'
      }
    }
  });
  // End Account //

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/home');

});
