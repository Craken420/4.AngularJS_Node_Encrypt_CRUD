angular.module('plunkerApp')
.controller('ContactsCtrl',
    function($scope, ContactsService, listContacts) {
        $scope.filteredData = [];
        $scope.init = function() {
            $scope.filteredData = listContacts;
        }
        $scope.init();
    });