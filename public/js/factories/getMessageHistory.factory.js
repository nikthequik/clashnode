(function() {
    angular
        .module('clashmash')
        .factory('messageHistory', messageHistory);

    messageHistory.$inject = ['$http'];

    function messageHistory($http) {
        return {
            getMessageHistory: getMessageHistory
        };

        function getMessageHistory(clanId) {
            var url = '/messages/' + clanId.substring(1);
            return $http.get(url);
        }
    }
})();
