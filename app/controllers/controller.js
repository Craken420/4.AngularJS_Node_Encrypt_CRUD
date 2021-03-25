angular.module('plunkerApp')
.controller('ContactsCtrl',
    function($scope, ContactsService, listContacts) {
        /**
        * Add pagination to contacts list
        */
        $scope.currentPage = 1,
            $scope.numPerPage = 3,
            $scope.maxSize = 5;

        $scope.$watch('currentPage + numPerPage', function() {
            var begin = ( ($scope.currentPage - 1) * $scope.numPerPage),
                end = begin + $scope.numPerPage;
            $scope.filteredData = listContacts.slice(begin, end);
        });

        $scope.init = function() {
            $scope.totalItems = (listContacts.length * 10)/$scope.numPerPage;
        }
        $scope.init();
    });