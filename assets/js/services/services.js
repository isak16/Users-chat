app.factory('api', function($http, $sessionStorage) {
    var url = "http://localhost:3000/";
    var $storage = $sessionStorage
    return {
        users: {
            get: function(id) {
                return $http.get(url + "users/" + id);
            },
            add: function(user) {
                return $http.post(url + "users", user);
            },
            remove: function(user) {
                return $http.delete(url + "users", user);
            },
            update: function() {
                return $http.put(url + "users/" + $storage.user._id, $storage.user).then(function(response) {
                    $storage.user = response.data;
                });
            },
            login: function(loginCredentials) {
                return $http.post(url + "login", loginCredentials);
            }
        },
        conversations: {
            get: function(userid, id) {
                return $http.get(url + "conversations/" + userid + "/" + id);
            },
            add: function(conversation) {
                return $http.post(url + "conversations", conversation);
            },
            remove: function(id) {
                return $http.delete(url + "conversations", conversation);
            }
        },
        sidebar: {
            get: function(id) {
                return $http.get(url + "conversations/" + id);
            }
        }
    };
});
