app.factory('api', function($http) {
    var url = "http://localhost:3000/";
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
            update: function(id, updatedUser) {
                return $http.put(url + "users/" + id, updatedUser);
            },
            login: function(email, password) {
                return $http.post(url + "login", { "email": email, "password": password});
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
