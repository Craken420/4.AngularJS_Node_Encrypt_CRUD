angular.module('plunkerApp')
.controller('ContactsCtrl',
    function($scope, $filter, $location, ContactsService, listContacts) {
        /**
        * initial value of creation/alteration contact form
        * @type {Array}
        */
         $scope.contact = [],
       
         /**
         * Reinitialize form values
         */
         $scope.reset = function() {
             $scope.contact = [
                 {
                     name: '',
                     address: '',
                     phone: ''
                 }
             ];
         };
         /**
         * Add um contato
         */
         $scope.create = function(contact) {
             listContacts = ContactsService.create(contact);
         };

         $scope.save = function(item) {
            $scope.create({...item});
            $scope.reset();
            $location.path('/');
         };
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
            listContacts.concat($scope.filteredDataPages);
            $scope.reset();
            $scope.totalItems = (listContacts.length * 10)/$scope.numPerPage;
        }
        $scope.init();
    });