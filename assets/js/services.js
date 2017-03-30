app.factory('api', function() {
    return {
        url: "http://localhost:3000/",
        users: {
            get: function(id) {
                return $http.get(this.url + "users/" + id);
            },
            add: function(user) {
                return $http.post(this.url + "users/", user);
            },
            remove: function(user) {
                return $http.delete(this.url + "users/", user);
            },
            update: function(user) {
                return $http.put(this.url + "users/", user);
            },
            login: function(username, password) {
                return $http.post(this.url + "users/login/", { "username": username, "password": password});
            }
        },
        groups: {
            get: function(id) {
                return $http.get(this.url + "groups/" + id);
            },
            add: function(group) {
                return $http.post(this.url + "groups/", group);
            },
            remove: function(id) {
                return $http.delete(this.url + "groups/", group);
            }
        }
    };
});
