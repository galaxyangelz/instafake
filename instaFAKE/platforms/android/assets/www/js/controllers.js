angular.module('app.controllers', [])

.controller('HomeCtrl', function ($scope) { })
.controller('ExploreCtrl', function ($scope) {
    $scope.back = function () {
        ;
    };

    $scope.clearSearch = function () {
        $scope.search = '';
    };
    $scope.images = [];
    $scope.loadImages = function () {
        for (var i = 0; i < 9; i++) {
            $scope.images.push({ id: i, src: "http://placehold.it/240x240" });
        }
    };

    $scope.loadMore = function () {
        for (var i = 0; i < 3; i++) {
            var j = $scope.images.length + i;
            $scope.images.push({ id: j, src: "http://placehold.it/240x240" });
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }
    };
    
})
.controller('CameraCtrl', function ($scope) {
})


.controller('LikeCtrl', function ($scope) { })
.controller('ProfileCtrl', function ($scope) { })

.controller('ChatsCtrl', function ($scope, Chats) {
    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    };
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
});