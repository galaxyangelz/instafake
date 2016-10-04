angular.module('app.services')

.factory('PostsAPI', function ($q, $http) {

    return {
        all: function () {
            return $q(function (resolve, reject) {
                $http.get('https://instafake-api.herokuapp.com/posts').then(function (response) {
                    resolve(response.data);
                });
            })
        }
    };
});
