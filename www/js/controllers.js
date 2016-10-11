angular.module('starter.controllers', [])

//.controller('HomeCtrl', function($scope) {})
.controller('HomeCtrl', function($scope, Posts, $ionicPopup, $ionicHistory, $state) {

  $scope.$on('$ionicView.enter', function(){
      Posts.all().then(function(data)
           {
             $scope.posts = data;
           }
        );
  });

  $scope.toggleLike = function(post)
  {
      Posts.toggleLike(post);
      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });
      $state.go('tab.home',null,{reload:true});
  }


  $scope.comment = function(post)
  {
      $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
      });
      $state.go('comment', { postId: post.id}, null, {reload:true} );
  }


})

.controller('LoginCtrl', function($scope, User, $ionicPopup, $ionicHistory, $state) {
  $scope.user = {
    name: "",
    password: ""
  };

  $scope.login = function()
  {
    User.login($scope.user.name, $scope.user.password).then(function(){
      $ionicHistory.nextViewOptions({
        disableBack: true
      });
      $state.go('tab.home');
    }).catch(function(){
      var alertPopup = $ionicPopup.alert({
        title: 'Login fail',
        template: 'Incorrect username or password'
      });
    });
  }

  $scope.GoToSignup = function()
  {
    $state.go('signup');
  }

})

.controller('SignupCtrl', function($scope, User, $ionicPopup, $ionicHistory, $state) {
  $scope.newuser = {
    name: "",
    password: ""
  };

  $scope.signup = function()
  {
    User.signup($scope.newuser.name, $scope.newuser.password).then(function(){
      var alertPopup = $ionicPopup.alert({
        title: 'Signup successful',
        template: 'Please go back to login page to log in'
      });
    }).catch(function(){
      var alertPopup = $ionicPopup.alert({
        title: 'Signup fail',
        template: 'Missing somethings'
      });
    });
  }

  $scope.goBack = function()
  {
      $ionicHistory.nextViewOptions({
          disableBack: true
      });
      $state.go('login');
  }
})

.controller('PostCommentCtrl', function($scope, $stateParams, User, Posts, $ionicScrollDelegate, $ionicHistory, $state) {
    $scope.user = User.getLoggedUser();
    $scope.comment = { text: "" };

      Posts.getCommentsForPost($stateParams.postId).then(function(data) {
          $scope.comments = data;
          $ionicScrollDelegate.scrollBottom();
      });

    $scope.goBack = function()
    {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('tab.home');
    };

    $scope.addComment = function()
    {
        Posts.addCommentToPost($scope.user.id, $scope.user.username, $stateParams.postId, $scope.comment.text).then(function(){
            $ionicScrollDelegate.scrollBottom(true);
            $scope.comment.text = "";
            $ionicHistory.nextViewOptions({
              disableAnimate: true,
              disableBack: true
            });
            $state.go('comment', null, {reload:true});
        });
    }
})

.controller('SearchCtrl', function($scope) {
  $scope.gallery = [];
  $scope.loadImages = function() {
      for(var i = 0; i < 100; i++) {
          $scope.gallery.push({id: i, src: "img/max.png"});
      }
  }
})

.controller('SearchCtrl-top', function($scope) {
})

.controller('SearchCtrl-people', function($scope) {
})

.controller('SearchCtrl-tags', function($scope) {
})

.controller('SearchCtrl-places', function($scope) {
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

})

.controller('PostConfirmCtrl', function($scope, $rootScope, $state, $stateParams, $ionicHistory, Posts, User){
    $scope.user = User.getLoggedUser();
    $scope.post = {
        imageData: $rootScope.lastPhoto,
        caption: ""
    };

    $scope.goBack = function()
    {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('camera');
    };

    $scope.sharePost = function()
    {
        Posts.new($scope.user.id ,$scope.user.username, $scope.post.imageData, $scope.post.caption).then(function(){
            $ionicHistory.nextViewOptions({
                disableBack: true
            });
            $state.go('tab.home',null,{reload:true});
        });
    };
})

.controller('LoveCtrl', function($scope) {
})

.controller('AccountCtrl', function($scope) {
  $scope.gallery = [];
  $scope.loadImages = function() {
      for(var i = 0; i < 100; i++) {
          $scope.gallery.push({id: i, src: "img/adam.jpg"});
      }
  }
});
