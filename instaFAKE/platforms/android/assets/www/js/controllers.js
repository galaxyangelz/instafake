angular.module('app.controllers', [])

.controller('HomeCtrl', function ($scope, Posts) {
    Posts.following().then(function (data) {
        $scope.posts = data;
        }
    );
    $scope.class = "ion-ios-heart-outline";
    $scope.toggleLike = function (index) {
        if ($scope.class === "ion-ios-heart-outline") {
            $scope.posts[index].likes++;
            $scope.class = "ion-ios-heart";
        }
        else {
            $scope.posts[index].likes--;
            $scope.class = "ion-ios-heart-outline";
        }
    }
})
.controller('CommentCtrl', function ($scope, $stateParams, $state, $ionicHistory, Posts) {
    $scope.post = Posts.get($stateParams.postId);

    $scope.goBack = function () {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('tab.home');
    }

    $scope.master = {};
    var posts = Posts.all();
    $scope.addComment = function (mycomment) {
        $scope.master = angular.copy(mycomment);
        var comments = Posts.get($stateParams.postId).comments;
        console.log(comments);
        var new_comment = {
            id: comments.length + 1,
            user: {
                id: 111111,
                username: "Anyway",
            },
            comment: $scope.master,
            userRefs: [],
            tags: []
        }
        Posts.get($stateParams.postId).comments.push(new_comment);
        console.log(Posts.get($stateParams.postId).comments);
        $state.reload();
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
.controller('SearchCtrl', function ($scope, $state, $ionicHistory, Users) {
    $scope.input = {
        searchText: ""
    };
    $scope.searchResults = {
        people: [],
        tags: []
    }
    $scope.tabs = {
        people: true,
        tags: false
    }
    $scope.goBack = function () {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('tab.explore');
    }
    $scope.emptySearch = function () {
        $scope.input.searchText = "";
    }
    $scope.tabActivate = function (tab) {
        for (var k in $scope.tabs) {
            if ($scope.tabs.hasOwnProperty(k)) {
                $scope.tabs[k] = false;
            }
        }
        $scope.tabs[tab] = true;
    }
    $scope.updateSearch = function () {
        if ($scope.tabs.people == true) {
            Users.searchUser($scope.input.searchText).then(function (result) {
                $scope.searchResults.people = result;
            });
        }
        else // search for posts with tags
        {
        }
    }
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
    $scope.tabs = {
        friend: true,
        following: false
    }
    $scope.showFriend = function () {
        $scope.tabs.friend = true;
        $scope.tabs.following = false;
        $scope.content = Friends.all();
    };
    $scope.showFollowing = function () {
        $scope.tabs.friend = false;
        $scope.tabs.following = true;
        $scope.content = People.all();
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

