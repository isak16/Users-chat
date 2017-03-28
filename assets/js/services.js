/**
 * Service for API requests
 * @type {String} Type of requests
 * Usage: api.get("sidebar");
 */
app.factory('api', function() {
    var profiles = [];
    var chats = [];

    return {
        get: function(type, id = null) {
            switch (type) {
                case 'profile':
                    var profileId = (id != null) ? id : localStorage.userId;
                    return profiles[profileId];
                break;

                case 'messages':
                for (i = 0; i < chats.length; i++) {
                    if (chats[i].id === id) {
                        return chats[i];
                    }
                }
                break;

                case 'sidebar':
                    var temp = [];
                    for (var i = 0; i < chats.length; i++) {
                        if (chats[i].id === id) {
                            temp.push(chats[i]);
                        }
                    }
                    return temp;
                break;
            }
        },
        changeStatus: function(id, status) {
            for (var i = 0; i < chats.length; i++) {
                if (profiles[i].id === id) {
                    profiles[i].status = status;
                }
            }
        }
    }
});
