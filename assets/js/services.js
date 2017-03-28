/**
 * Service for API requests
 * @type {String} Type of requests
 * Usage: api.get("sidebar");
 */
app.factory('api', function($http) {
    var url = "";
    return {
        get: function(type, id = null) {
            url += type;

            switch (type) {
                case 'profile':
                    var profileId = (id != null) ? id : localStorage.userId;
                    return $http.get(url + "/" + type + "/" + profileId);
                break;

                case 'messages':
                    return $http.get(url + "/" + type + "/" + id);
                break;

                case 'sidebar':
                    return $http.get(url + "/" + type + "/" + localStorage.userId);
                break;
            }
        },
        post: function() {

        }
    }
});
