angular.module('starter.controllers', [])

//.controller('HomeCtrl', function($scope) {})

.controller('HomeCtrl', function($scope) {
  $scope.doRefresh = function() {
   alert("Refreshing");
   $scope.$broadcast('scroll.refreshComplete');
  };
})
.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.chats = Chats.all();
})
.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})


.controller('SearchCtrl', function($scope) {
  $scope.doRefresh = function() {
   alert("Refreshing");
   $scope.$broadcast('scroll.refreshComplete');
  };
  $scope.gallery = [];
  $scope.loadImages = function() {
      for(var i = 0; i < 100; i++) {
          $scope.gallery.push({id: i, src: "img/max.png"});
      }
  }
})

.controller('SearchCtrl-top', function($scope) {
  $scope.doRefresh = function() {
   alert("Refreshing");
   $scope.$broadcast('scroll.refreshComplete');
  };

})

.controller('SearchCtrl-people', function($scope) {
  $scope.doRefresh = function() {
   alert("Refreshing");
   $scope.$broadcast('scroll.refreshComplete');
  };

})

.controller('SearchCtrl-tags', function($scope) {
  $scope.doRefresh = function() {
   alert("Refreshing");
   $scope.$broadcast('scroll.refreshComplete');
  };

})

.controller('SearchCtrl-places', function($scope) {
  $scope.doRefresh = function() {
   alert("Refreshing");
   $scope.$broadcast('scroll.refreshComplete');
  };

})

.controller('CameraCtrl', function($scope) {})

.controller('LoveCtrl', function($scope) {
  $scope.doRefresh = function() {
   alert("Refreshing");
   $scope.$broadcast('scroll.refreshComplete');
  };
})

.controller('AccountCtrl', function($scope) {
  $scope.doRefresh = function() {
   alert("Refreshing");
   $scope.$broadcast('scroll.refreshComplete');
  };
  $scope.gallery = [];
  $scope.loadImages = function() {
      for(var i = 0; i < 100; i++) {
          $scope.gallery.push({id: i, src: "img/adam.jpg"});
      }
  }
});
