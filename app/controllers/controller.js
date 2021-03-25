angular.module('plunkerApp')
.controller('ContactsCtrl',
    function($scope, ContactsService) {
        $scope.listContacts = [
            {_id: 1, name: 'Allan Benjamin', password:'lol1', phone: '557188339933', address: 'St. Claire Avenue, Nº 101'},
            {_id: 2, name: 'Georgia Smith', password:'lol2', phone: '557188339933', address: 'St. Claire Avenue, Nº 102'}];
    });