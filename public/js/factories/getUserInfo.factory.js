(function() {
    angular
        .module('clashmash')
        .factory('userInfo', userInfo);

    userInfo.$inject = ['$http'];

    function userInfo($http) {
        return {
            getUserInfo: getUserInfo
        };

        var userInfo = '',
            reason = '';
        
        function getUserInfo(playerId) {
            var url = 'player/' + encodeURIComponent(playerId);
            
            $http.get(url)
                .then(function (res) {
                    if (res.data) {
                        userInfo = res.data;
                        reason = res.data.reason;
                        localStorage.setItem('userInfo', JSON.stringify(userInfo));
                    }
                    else {
                        userInfo = localStorage.setItem('userInfo', JSON.stringify(userInfo));
                    }
                    
                }, function (err) {
                    console.log(err);
                    
                });
            return {userInfo: userInfo};
        }
    }
})();
