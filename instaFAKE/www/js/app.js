angular.module('app', ['ionic', 'app.controllers', 'app.services', 'ngCordova'])
.config(function ($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
})

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (cordova.platformId === "ios" && window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            StatusBar.styleDefault();
        }

        if (!$cordovaNetwork.isOnline()) {
            if (Constants.DEBUGMODE) {
                console.log("No NETWORK FOUND");
                // at this point we need to broadcast a no network found event and the app.controller will get that and display the popup
                $rootScope.$broadcast('event:app-networkRequired');
            }
        } else {
            if (Constants.DEBUGMODE) {
                console.log("NETWORK FOUND");
            }
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

    .state('start', {
        url: '/start',
        controller: 'StartCtrl',
        templateUrl: "templates/start.html",
        //authenticate: false,
    })
    .state('register', {
        url: '/register',
        controller: 'RegisterCtrl',
        templateUrl: "templates/register.html"
        //authenticate: false,
    })

    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html',
        //authenticate: true,
    })

    .state('tab.home', {
        url: '/home',
        views: {
            'tab-home': {
                templateUrl: 'templates/home/tab-home.html',
                controller: 'HomeCtrl'
            }
        },
        //authenticate: true,
    })
    .state('tab.comment', {
        url: '/comment/:postId',
        views: {
            'tab-home': {
                templateUrl: 'templates/home/comment.html',
                controller: 'CommentCtrl'
            }
        },
        //authenticate: true,
    })

    .state('tab.chats', {
        url: '/chats',
        views: {
            'tab-home': {
                templateUrl: 'templates/home/tab-chats.html',
                controller: 'ChatsCtrl'
            }
        },
        //authenticate: true,
    })
    .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
            'tab-home': {
                templateUrl: 'templates/home/chat-detail.html',
                controller: 'ChatDetailCtrl'
            }
        },
        //authenticate: true,
    })

    .state('tab.explore', {
        url: '/explore',
        views: {
            'tab-explore': {
                templateUrl: 'templates/explore/tab-explore.html',
                controller: 'ExploreCtrl'
            }
        },
        //authenticate: true,
    })
    .state('tab.search', {
        url: '/search',
        views: {
            'tab-explore': {
                templateUrl: 'templates/explore/tab-search.html',
                controller: 'SearchCtrl'
            }
        },
        //authenticate: true,
    })

    .state('tab.camera', {
        url: '/camera',
        views: {
            'tab-camera': {
                templateUrl: 'templates/camera/tab-camera.html',
                controller: 'CameraCtrl'
            }
        },
        //authenticate: true,
    })
    .state('post-confirm', {
        url: '/confirm',
        templateUrl: 'templates/camera/post-confirm.html',
        controller: 'PostConfirmCtrl',
        //authenticate: true,
    })

    .state('tab.like', {
        url: '/like',
        views: {
            'tab-like': {
                templateUrl: 'templates/following/tab-like.html',
                controller: 'LikeCtrl'
            }
        },
        //authenticate: true,
    })

    .state('tab.profile', {
        url: '/profile',
        views: {
            'tab-profile': {
                templateUrl: 'templates/profile/tab-profile.html',
                controller: 'ProfileCtrl'
            }
        },
        //authenticate: true,
    })

    .state('tab.discover', {
        url: '/discover',
        views: {
            'tab-profile': {
                templateUrl: 'templates/profile/profile-discover.html',
                controller: 'DiscoverCtrl'
            }
        },
        //authenticate: true,
    })

    .state('tab.setting', {
        url: '/options',
        views: {
            'tab-profile': {
                templateUrl: 'templates/profile/profile-options.html',
                controller: 'OptionsCtrl'
            }
        },
        //authenticate: true,
    })

    .state('tab.edit', {
        url: '/edit',
        views: {
            'tab-profile': {
                templateUrl: 'templates/profile/profile-edit.html',
                controller: 'EditCtrl'
            }
        },
        //authenticate: true,
    });

    $urlRouterProvider.otherwise('/start');

});
