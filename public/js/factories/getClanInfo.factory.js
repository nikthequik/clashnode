(function() {
    angular
        .module('clashmash')
        .factory('clanInfo', clanInfo);

    clanInfo.$inject = ['$http'];

    function clanInfo($http) {
        return {
            getClanInfo: getClanInfo
        };

        function getClanInfo(clanId) {
            var url = 'clan/' + encodeURIComponent(clanId);
            var clanInfo = '';
            $http.get(url)
                .then(function (res) {
                    if (res.data) {
                        clanInfo = res.data;
                        localStorage.setItem('clanInfo', JSON.stringify(clanInfo));
                    }
                    else {
                        clanInfo = localStorage.setItem('clanInfo', JSON.stringify(clanInfo));
                    }
                    
                }, function (err) {
                    console.log(err);
                    
                });
            return clanInfo;
        }
    }
})();
