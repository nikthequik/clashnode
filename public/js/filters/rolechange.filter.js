var app = angular.module('clashmash');
app.filter('changeRole', function() {
    return function(role) {
        if (role === 'admin') {
            role = 'ELDER';
        }
        return role;
    };
});