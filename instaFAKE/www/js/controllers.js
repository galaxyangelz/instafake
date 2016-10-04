angular.module('app.controllers', ['ngCordova'])

/*THIS IS LOCAL DATABASE CONTROLLER
.controller('HomeCtrl', function ($scope, Posts) {
    Posts.following().then(function (data) {
        $scope.posts = data;
        }
    );
    $scope.toggleLike = function (post, $event) {
        post.isliked = !post.isliked;
        if (post.isliked) {
            post.likes++;
        }
        else {
            post.likes--;
        }
        $event.stopPropagation();
        $event.preventDefault();
    }
})*/
.controller('HomeCtrl', function ($scope, Posts, PostsAPI) {
    Posts.following().then(function (data) {
        $scope.posts = data;
    }
    );
    PostsAPI.all().then(function (data) {
        $scope.postsAPI = data;
    });
    $scope.toggleLike = function (post, $event) {
        post.isliked = !post.isliked;
        if (post.isliked) {
            post.likes++;
        }
        else {
            post.likes--;
        }
        $event.stopPropagation();
        $event.preventDefault();
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
        var new_comment = {
            id: comments.length,
            user: {
                id: 111111,
                username: "Anyway",
            },
            comment: $scope.master,
            userRefs: [],
            tags: []
        }
        Posts.get($stateParams.postId).comments.push(new_comment);
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

.controller('CameraCtrl', function ($scope, $rootScope, $state, $ionicHistory, $cordovaCamera) {
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
            $rootScope.imgURI = imageData;
        }, function (err) {
            // An error occured. Show a message to the user
        });
    }
    
    $scope.photo = function () {
        $scope.tabs.gallery = false;
        $scope.tabs.photo = true;
    }
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
            saveToPhotoAlbum: true
        };

        $cordovaCamera.getPicture(options).then(function (imageData) {
            $rootScope.imgURI = imageData;
        }, function (err) {
            // An error occured. Show a message to the user
        });
    }
    
    $scope.confimPost = function () {
        $state.go('post-confirm');
    }
})
.controller('PostConfirmCtrl', function ($scope, $rootScope, $state, $ionicHistory, PersonalInfo, Posts) {
    $scope.goBack = function () {
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $state.go('tab.camera');
    }

    var profile = PersonalInfo.all();
    var posts = Posts.all();
    $scope.master = {};
    $scope.confirmPost = function (caption) {
        $scope.master = angular.copy(caption);
        Posts.add({
            id: posts.length+1,
            user: {
                id: profile.id,
                username: profile.name,
                profileImageSmall: profile.avatar
            },
            image: $rootScope.imgURI,
            likes: 0,
            caption: $scope.master,
            comments: []
        });
        $state.go('tab.home');
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
.controller('ProfileCtrl', function ($scope, PersonalInfo, Posts) {
    $scope.profile = PersonalInfo.all();
    function getselfPost() {
        $scope.data = Posts.all();
        $scope.posts = [];
        for (var i = 0; i < $scope.data.length; i++) {
            if ($scope.data[i].user.id == $scope.profile.id) {
                $scope.posts.push($scope.data[i]);
            }
        }
        return $scope.posts;
    }
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
        getselfPost();
        console.log($scope.posts);
    }
    $scope.showRow = function () {
        $scope.tabs.grid = false;
        $scope.tabs.row = true;
        $scope.tabs.place = false;
        $scope.tabs.tag = false;
        getselfPost();
        console.log($scope.posts);
        $scope.toggleLike = function (post, $event) {
            post.isliked = !post.isliked;
            if (post.isliked) {
                post.likes++;
            }
            else {
                post.likes--;
            }
            $event.stopPropagation();
            $event.preventDefault();
        }
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
