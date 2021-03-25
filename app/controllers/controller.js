angular.module('plunkerApp')
.controller('ContactsCtrl',
    function($scope, ContactsService) {
        $scope.name = 'Luis Angel';
        $scope.greet = ContactsService.greet($scope.name);
    });