angular.module('app.controllers', ['ti-segmented-control'])

.controller('HomeCtrl', function ($scope) { })
.controller('ExploreCtrl', function ($scope) {
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
.controller('SearchCtrl', function ($scope, Tops, People, Tags, Places) {
    $scope.clearSearch = function () {
        $scope.search = '';
    };
    $scope.showTop = function () {
        $scope.content = Tops.all();
    }
    $scope.showPeople = function () {
        $scope.content = People.all();
    }
    $scope.showTags = function () {
        $scope.content = Tags.all();
    }
    $scope.showPlaces = function () {
        $scope.content = Places.all();
    }
})

.controller('CameraCtrl', function ($scope) {
    $scope.showGallery = function () {
        $scope.content = "THIS IS GALLERY PAGE";
    }
    $scope.showPhoto = function () {
        $scope.content = "THIS IS PHOTO PAGE";
    }
    $scope.showVideo = function () {
        $scope.content = "THIS IS VIDEO PAGE";
    }
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