app.factory('api', function($http, $sessionStorage) {
    var url = "https://userschat.herokuapp.com/";
    var $storage = $sessionStorage;
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
                return $http.put(url + "users/" + $storage.user._id, $storage.user);
            },
            login: function(loginCredentials) {
                return $http.post(url + "login", loginCredentials);
            }
        },
        conversations: {
            get: function(id) {
                return $http.get(url + "conversations/" + $storage.user._id + "/" + id);
            },
            add: function(conversation) {
                return $http.post(url + "conversations", conversation);
            },
            remove: function(id) {
                return $http.delete(url + "conversations", conversation);
            },
            message: function(id, message) {
                return $http.put(url + "conversations/message/" + id + "/" + $storage.user._id, {content: message});
            },
            update: function(id, updatedObject) {
                return $http.put(url + "conversations/" + id, updatedObject);
            },
            manage: function(id, action, query) {
                return $http.put(url + "conversations/members/" + action + "/" + id, query);
            }
        },
        sidebar: {
            get: function() {
                return $http.get(url + "conversations/" + $storage.user._id);
            },
            search: function(query) {
                return $http.get(url + "users/search/" + query);
            }
        }
    };
});
