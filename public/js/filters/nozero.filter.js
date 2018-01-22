var app = angular.module('clashmash');
app.filter('nozero', function() {
    return function(num1, num2) {
        if (role === 'admin') {
            role = 'ELDER';
        }
        return role;
    };
});