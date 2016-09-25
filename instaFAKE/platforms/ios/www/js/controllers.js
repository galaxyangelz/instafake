angular.module('app.controllers', [])

.controller('HomeCtrl', function ($scope) { })
.controller('ExploreCtrl', function ($scope) {
    $scope.clearSearch = function () {
        $scope.search = '';
    };
    $scope.images = [];
    $scope.loadImages = function () {
        for (var i = 0; i < 100; i++) {
            $scope.images.push({ id: i, src: "http://placehold.it/120x120" });
        }
    }
})
.controller('CameraCtrl', function ($scope) { })
.controller('LikeCtrl', function ($scope) { })
.controller('ProfileCtrl', function ($scope) { })

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
});