var app = angular.module('clashmash');
app.controller('BannerCtrl', ['$scope', function($scope) {
	var bc = this;
	bc.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (bc.userInfo != null && typeof bc.userInfo === 'object') {
        bc.userClanShield = bc.userInfo.clan.badgeUrls.small;
        bc.userClanName = bc.userInfo.clan.name;
    }
    $scope.$on('newData', function(event, data) {
        //console.log(data);
        if (typeof data == 'object' && data != null) {
            bc.userClanShield = data.clan.badgeUrls.small;
            bc.userClanName = data.clan.name;
        }  
    })
    bc.visible = false;
    bc.exists = false;
    bc.create = function() {
        bc.exists = true;
    }
}]);