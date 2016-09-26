angular.module('app', ['ionic', 'app.controllers', 'app.services', 'ti-segmented-control'])
.config(function ($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
})

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (cordova.platformId === "ios" && window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleDefault();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider) {

    $stateProvider

    .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'templates/tabs.html'
    })

    .state('tab.home', {
        url: '/home',
        views: {
            'tab-home': {
                templateUrl: 'templates/tab-home.html',
                controller: 'HomeCtrl'
            }
        }
    })

    .state('tab.chats', {
        url: '/chats',
        views: {
            'tab-home': {
                templateUrl: 'templates/tab-chats.html',
                controller: 'ChatsCtrl'
            }
        }
    })
    .state('tab.chat-detail', {
        url: '/chats/:chatId',
        views: {
            'tab-home': {
                templateUrl: 'templates/chat-detail.html',
                controller: 'ChatDetailCtrl'
            }
        }
    })

    .state('tab.explore', {
        url: '/explore',
        views: {
            'tab-explore': {
                templateUrl: 'templates/tab-explore.html',
                controller: 'ExploreCtrl'
            }
        }
    })
    .state('tab.search', {
        url: '/search',
        views: {
            'tab-explore': {
                templateUrl: 'templates/tab-search.html',
                controller: 'SearchCtrl'
            }
        }
    })

    .state('tab.camera', {
        url: '/camera',
        views: {
            'tab-camera': {
                templateUrl: 'templates/tab-camera.html',
                controller: 'CameraCtrl'
            }
        }
    })

    .state('tab.like', {
        url: '/like',
        views: {
            'tab-like': {
                templateUrl: 'templates/tab-like.html',
                controller: 'LikeCtrl'
            }
        }
    })
    .state('tab.like1', {
        url: '/like1',
        views: {
            'tab-like': {
                templateUrl: 'templates/tab-like1.html',
                controller: 'LikeCtrl'
            }
        }
    })

    .state('tab.profile', {
        url: '/profile',
        views: {
            'tab-profile': {
                templateUrl: 'templates/tab-profile.html',
                controller: 'ProfileCtrl'
            }
        }
    })
    .state('tab.profile1', {
        url: '/profile1',
        views: {
            'tab-profile': {
                templateUrl: 'templates/tab-profile1.html',
                controller: 'ProfileCtrl'
            }
        }
    })
    .state('tab.profile2', {
        url: '/profile2',
        views: {
            'tab-profile': {
                templateUrl: 'templates/tab-profile2.html',
                controller: 'ProfileCtrl'
            }
        }
    })
    .state('tab.profile3', {
        url: '/profile3',
        views: {
            'tab-profile': {
                templateUrl: 'templates/tab-profile3.html',
                controller: 'ProfileCtrl'
            }
        }
    })
    .state('tab.discover', {
        url: '/discover',
        views: {
            'tab-profile': {
                templateUrl: 'templates/profile-discover.html',
                controller: 'DiscoverCtrl'
            }
        }
    })
    .state('tab.setting', {
        url: '/options',
        views: {
            'tab-profile': {
                templateUrl: 'templates/profile-options.html',
                controller: 'OptionsCtrl'
            }
        }
    })
    .state('tab.edit', {
        url: '/edit',
        views: {
            'tab-profile': {
                templateUrl: 'templates/profile-edit.html',
                controller: 'EditCtrl'
            }
        }
    });

    $urlRouterProvider.otherwise('/tab/home');

});
