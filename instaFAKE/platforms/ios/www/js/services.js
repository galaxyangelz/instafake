angular.module('app.services', [])

.factory('Chats', function () {
    var chats = [{
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'img/ben.png'
    }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'img/max.png'
    }, {
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'img/adam.jpg'
    }, {
        id: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'img/perry.png'
    }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'img/mike.png'
    }];

    return {
        all: function () {
            return chats;
        },
        remove: function (chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        get: function (chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        }
    };
})

.factory('Tops', function () {
    var tops = [{
        id: 1,
        name: 'Duck',
        description: 'nothing',
        face: 'img/ben.png'
    },
    {
        id: 2,
        name: 'Chicken',
        description: 'nothing else',
        face: 'img/mike.png'
    },
    {
        id: 3,
        name: 'Doge',
        description: 'nothing else matter',
        face: 'img/perry.png'
    }];
    return {
        all: function () {
            return tops;
        },
        get: function (chatId) {
            for (var i = 0; i < tops.length; i++) {
                if (tops[i].id === parseInt(topID)) {
                    return tops[i];
                }
            }
            return null;
        }
    };
})
.factory('People', function () {
    var people = [{
        id: 1,
        name: 'Duck',
        description: 'nothing',
        face: 'img/ben.png'
    },
    {
        id: 2,
        name: 'Chicken',
        description: 'nothing else',
        face: 'img/mike.png'
    },
    {
        id: 3,
        name: 'Doge',
        description: 'nothing else matter',
        face: 'img/perry.png'
    }];
    return {
        all: function () {
            return people;
        },
        get: function (personId) {
            for (var i = 0; i < people.length; i++) {
                if (people[i].id === parseInt(personID)) {
                    return people[i];
                }
            }
            return null;
        }
    };
})
.factory('Tags', function () {
    var hashtags = [{
        id: 1,
        name: '#abc',
    },
    {
        id: 2,
        name: '#xyz',
    },
    {
        id: 3,
        name: '#qwerty',
    }];
    return {
        all: function () {
            return hashtags;
        },
        get: function (hashtagId) {
            for (var i = 0; i < hashtags.length; i++) {
                if (hashtags[i].id === parseInt(hashtagId)) {
                    return hashtags[i];
                }
            }
            return null;
        }
    };
})
.factory('Places', function () {
    var places = [{
        id: 1,
        name: 'Highway',
        description: 'To hell'
    },
    {
        id: 2,
        name: 'Stairway',
        description: 'To heaven'
    }];
    return {
        all: function () {
            return places;
        },
        get: function (placeId) {
            for (var i = 0; i < places.length; i++) {
                if (places[i].id === parseInt(placeId)) {
                    return places[i];
                }
            }
            return null;
        }
    };
})
.factory('Friends', function () {
    var friends = [{
        id: 1,
        name: 'A1',
        description: 'started following you',
        face: 'img/ben.png'
    },
    {
        id: 2,
        name: 'B2',
        description: 'is on Instagram',
        face: 'img/mike.png'
    },
    {
        id: 3,
        name: 'C3',
        description: 'is on Instagram',
        face: 'img/perry.png'
    }];
    return {
        all: function () {
            return friends;
        },
        get: function (friendId) {
            for (var i = 0; i < friends.length; i++) {
                if (friends[i].id === parseInt(friendId)) {
                    return friends[i];
                }
            }
            return null;
        }
    };
})
.factory('PersonalInfo', function () {
    var Info = {
        avatar: "https://pbs.twimg.com/profile_images/653312117886447616/szRCKaD_.jpg",
        name: "Whatever",
        nickname: "Anyway",
        website: "",
        bio: "",
        email: "whatever@doge.com",
        mobile: "217341",
        gender: "male",
        posts: "10",
        followers: "20",
        following: "100"
    };
    return {
        all: function () {
            return Info;
        }
    };
})
.factory('CaptureImages', function () {
    var Images = [];
    return {
        all: function () {
            return Images;
        },
        add: function (image) {
            Images.push(image);
        }
    }
})
