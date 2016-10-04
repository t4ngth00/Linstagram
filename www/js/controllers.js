angular.module('starter.controllers', [])

//.controller('HomeCtrl', function($scope) {})
.controller('likeController', function($scope) {
  $scope.buttonOn = false;

  $scope.changeIcon = function() {
    $scope.buttonOn = (!$scope.buttonOn);
}

  $scope.ChangeLikeStatus = function(post){
    post.isLiked = !post.isLiked;

    if( post.isLiked){
      post.likes ++;
    }
    else{
      post.likes --;
    }
  }
})

.controller('commentController', function($scope, $state, $stateParams, $ionicHistory, Posts) {
  $scope.goBack = function() {
    $ionicHistory.backView().go();
  }

  $scope.post = Posts.get($stateParams.postId);

  $scope.master = {};
  var posts = Posts.all();

  $scope.addComment = function (mycomment) {
      $scope.master = angular.copy(mycomment);
      var comments = Posts.get($stateParams.postId).comments;
      var new_comment = {
          id: comments.length + 1,
          user: {
              id: 111111,
              username: "SomeUser",
          },
          comment: $scope.master,
          userRefs: [],
          tags: []
      }
      Posts.get($stateParams.postId).comments.push(new_comment);
      $state.reload();
  }


})


.controller('HomeCtrl', function($scope,Posts, PostsServer, $state) {
  $scope.doRefresh = function() {
   alert("Refreshing");
   $scope.$broadcast('scroll.refreshComplete');
  };

  PostsServer.all().then(function(data)
       {
         $scope.postsServer = data;
       }
    );


  $scope.posts = Posts.all();

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

.controller('CameraCtrl', function($scope, $rootScope, $cordovaCamera, Posts, $state, $ionicHistory) {
// take picture function
  $scope.takePhoto = function () {
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.CAMERA,
      encodingType: Camera.EncodingType.JPEG,
      allowEdit: true,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
  };

      $cordovaCamera.getPicture(options).then(function (imageData) {
          $rootScope.lastPhoto = imageData;
      }, function (err) {
        // An error occured. Show a message to the user
      });
  }
  // choose picture function
  $scope.choosePhoto = function () {
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false
  };

      $cordovaCamera.getPicture(options).then(function (imageData) {
          $rootScope.lastPhoto = imageData;
      }, function (err) {
          // An error occured. Show a message to the user
      });
  }

  $scope.textContainer = {};

  $scope.sharePhoto = function (newCaption) {

    $scope.textContainer = angular.copy(newCaption);
      Posts.share({
        id: 2,
        name: 'Nhan',
        avatar: $rootScope.lastPhoto,
        image: $rootScope.lastPhoto,
        caption: $scope.textContainer
       });
       $state.go('tab.home');
     }

    $scope.tabs = {
        gallery: true,
        photo: false
    }

    $scope.goBack = function()
    {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('tab.home');
    }

    $scope.photo = function()
    {
        $scope.tabs.photo = true;
        $scope.tabs.gallery = false;
        // activate camera
    }

    $scope.gallery = function()
    {
        $scope.tabs.photo = false;
        $scope.tabs.gallery = true;
        // fetch photos
    }

    $scope.confirmPost = function()
    {
        $state.go('post-confirm');
    }

    $scope.goBackPost = function()
    {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('camera');
    }

})

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
