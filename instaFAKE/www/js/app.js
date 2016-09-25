angular.module('app', ['ionic', 'app.controllers', 'app.services'])
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
        view: {
            'tab-explore': {
                templateURL: 'templates/tab-search.html',
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

    .state('tab.profile', {
        url: '/profile',
        views: {
            'tab-profile': {
                templateUrl: 'templates/tab-profile.html',
                controller: 'ProfileCtrl'
            }
        }
    });

    $urlRouterProvider.otherwise('/tab/home');

});
