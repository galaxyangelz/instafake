angular.module('app.controllers', ['ti-segmented-control'])

.controller('HomeCtrl', function ($scope, CaptureImages) {
    $scope.contents = CaptureImages.all();
    $scope.class = "ion-ios-heart-outline";
    $scope.toggleLike = function (index) {
        if ($scope.class === "ion-ios-heart-outline") {
            $scope.contents[index].like++;
            $scope.class = "ion-ios-heart";
        }
        else {
            $scope.contents[index].like--;
            $scope.class = "ion-ios-heart-outline";
        }
    }
})
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
    };
    $scope.showPeople = function () {
        $scope.content = People.all();
    };
    $scope.showTags = function () {
        $scope.content = Tags.all();
    };
    $scope.showPlaces = function () {
        $scope.content = Places.all();
    };
})

.controller('CameraCtrl', function ($scope, $state, $ionicHistory, $cordovaCamera) {
    $scope.tabs = {
        gallery: true,
        photo: false
    }
    $scope.goBack = function () {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('tab.home');
    }
    $scope.gallery = function () {
        $scope.tabs.gallery = true;
        $scope.tabs.photo = false;
    }
    $scope.photo = function () {
        $scope.tabs.gallery = false;
        $scope.tabs.photo = true;
        $scope.takePicture = function () {
            var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 350,
                targetHeight: 350,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            };

            $cordovaCamera.getPicture(options).then(function (imageData) {
                $scope.imgURI = "data:image/jpeg;base64," + imageData;
            }, function (err) {
                // An error occured. Show a message to the user
            });
        }
    }
    $scope.confimPost = function () {
        $state.go('post-confirm', { URI: $scope.imgURI });
    }
})
.controller('PostConfirmCtrl', function ($scope, $state, $ionicHistory, PersonalInfo, CaptureImages, $stateParams) {
    $scope.imgURI = $stateParams;
    $scope.goBack = function () {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('tab.camera');
    }
    var profile = PersonalInfo.all();
    $scope.sharePost = function () {
        var image = {
            avatar: profile.avatar,
            name: profile.name,
            URI: imgURI,
            like: 0,
            comment: ""
        }
        CaptureImages.add(image);
        console.log(image);
    }

})
.controller('LikeCtrl', function ($scope, Friends, People) {
    $scope.showFriend = function () {
        $scope.content = Friends.all();
    };
    $scope.showFollowing = function () {
        $scope.following = People.all();
    };
})
.controller('ProfileCtrl', function ($scope, PersonalInfo) {
    $scope.tabs = {
        grid: true,
        row: false,
        place: false,
        tag: false
    }
    $scope.showGrid = function () {
        $scope.tabs.grid = true;
        $scope.tabs.row = false;
        $scope.tabs.place = false;
        $scope.tabs.tag = false;
        $scope.grid_images = [];
        for (var i = 0; i < 9; i++) {
            $scope.grid_images.push({ id: i, src: "http://placehold.it/240x240" });
        }
    }
    $scope.showRow = function () {
        $scope.tabs.grid = false;
        $scope.tabs.row = true;
        $scope.tabs.place = false;
        $scope.tabs.tag = false;
    }
    $scope.showPlace = function () {
        $scope.tabs.grid = false;
        $scope.tabs.row = false;
        $scope.tabs.place = true;
        $scope.tabs.tag = false;
    }
    $scope.showTag = function () {
        $scope.tabs.grid = false;
        $scope.tabs.row = false;
        $scope.tabs.place = false;
        $scope.tabs.tag = true;
    }

    $scope.profile = PersonalInfo.all();
})
.controller('DiscoverCtrl', function ($scope, People) {
    $scope.showPeople = function () {
        $scope.content = People.all();
    };
})
.controller('OptionsCtrl', function ($scope) { })
.controller('EditCtrl', function ($scope, PersonalInfo) {
    $scope.profile = PersonalInfo.all();
})

.controller('ChatsCtrl', function ($scope, Chats) {
    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
        Chats.remove(chat);
    };
})

.controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
});

