/**
 * Service for API requests
 * @type {String} Type of requests
 * Usage: api.get("sidebar");
 */
app.factory('api', function($http) {
    var url = "";
    return {
        get: function(type = null) {
            url += type;

            switch (type) {
                case 'profile':
                break;

                case 'messages':
                break;

                case 'sidebar':
                break;

            }
        },
        post: function() {

        }
    }
});
