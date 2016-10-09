angular.module('app.services')

.factory('Users', function ($q, $http) {
    var user = null;

    return {
        all: function () {
            return user;
        },
        edit: function (new_info) {
            user = new_info;
            console.log(user);
            $http.put("https://instafake-api.herokuapp.com/edit/" + user.id, user);
        },
        login: function (username, password) {
            return $q(function (resolve, reject) {
                $http.post("https://instafake-api.herokuapp.com/login", { username: username, password: password }).then(function (result) {
                    if (result.status == 200) {
                        user = { 
                            id: result.data.id, 
                            username: result.data.username, 
                            email: result.data.email,
                            avatar: result.data.avatar || "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png",
                            nickname: result.data.nickname || "",
                            website: result.data.website || "",
                            bio: result.data.bio || "",
                            mobile: result.data.mobile || "",
                            gender: result.data.gender || ""
                        };
                        resolve();
                    }
                    else {
                        reject();
                    }
                }).catch(function () {
                    reject();
                });
            });
        },
        register: function (username, password, email) {
            return $q(function (resolve, reject) {
                $http.post("https://instafake-api.herokuapp.com/register", { username: username, password: password, email: email }).then(function (result) {
                    if (result.status == 201) {
                        user = {
                            id: result.data.id,
                            username: result.data.username,
                            email: result.data.email,
                            avatar: result.data.avatar || "",
                            nickname: result.data.nickname || "",
                            website: result.data.website || "",
                            bio: result.data.bio || "",
                            mobile: result.data.mobile || "",
                            gender: result.data.gender || ""

                        };
                        resolve();
                    }
                    else {
                        reject();
                    }
                }).catch(function () {
                    reject();
                })
            })
        },
        isLogged: function () {
            return $q(function (resolve, reject) {
                if (user != null) {
                    resolve();
                }
                else {
                    reject();
                }
            });
        }
        /*searchUser: function (searchWord) {

            var upperCaseSearchWord = searchWord.toUpperCase();
            return $q(function (resolve, reject) {
                if (searchWord.length > 0) {
                    var matches = users.filter(function (u) {
                        var testString = u.username.toUpperCase();
                        return testString.includes(upperCaseSearchWord);
                    });

                    resolve(matches);
                }
                else {
                    reject();
                }
            });
        }*/
    };
});;