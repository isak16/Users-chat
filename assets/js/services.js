app.factory('api', function($http) {
    var url = "http://localhost:3000/";
    return {
        users: {
            get: function(id) {
                return $http.get(  url + "users/" + id);
            },
            add: function(user) {
                return $http.post(  url + "users/", user);
            },
            remove: function(user) {
                return $http.delete(  url + "users/", user);
            },
            update: function(user) {
                return $http.put(  url + "users/", user);
            },
            login: function(username, password) {
                return $http.post(  url + "users/login/", { "username": username, "password": password});
            }
        },
        groups: {
            get: function(id) {
                return $http.get(  url + "groups/" + id);
            },
            add: function(group) {
                return $http.post(  url + "groups/", group);
            },
            remove: function(id) {
                return $http.delete(  url + "groups/", group);
            }
        }
    };
});
