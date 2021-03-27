angular.module('plunkerApp')
.controller('ContactsCtrl',
    function($scope, $filter, ContactsService, listContacts) {
        /**
        * Add pagination to contacts list
        */
        $scope.currentPage = 1,
        $scope.numPerPage = 3,
        $scope.maxSize = 5;

        $scope.$watch('currentPage + numPerPage + search', function() {
            var begin = ( ($scope.currentPage - 1) * $scope.numPerPage),
                end = begin + $scope.numPerPage;

            if ($scope.search)
                $scope.filteredData = $filter('filter')(listContacts,
                    {name: $scope.search}).slice(begin, end);
            else
                $scope.filteredData = listContacts.slice(begin, end);
        });

        $scope.init = function() {
            $scope.totalItems = (listContacts.length * 10)/$scope.numPerPage;
        }
        $scope.init();
    });