angular.module('plunkerApp')
.controller('ContactsCtrl',
    function($scope, $filter, $location, $route, $routeParams,
        ContactsService, listContacts, AlertService) {
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
         * Add contact
         */
         $scope.create = function(contact) {
            listContacts = ContactsService.create(contact);
         }
         $scope.save = function(item) {
            if(typeof item._id !== 'undefined')
                $scope.update(item);
            else
                $scope.create({...item});
            $scope.reset();
            $location.path('/');
         };
         /**
        * Return a specific contact for edition
        */
        $scope.edit = function(){
            var id = $routeParams.id;
            $scope.contact = $filter('filter')(listContacts, {_id: id})[0];
            window.scrollTo(0, 0);
        };
        /**
        * Update a contact
        * @param  {Object} item Contact informations
        */
        $scope.update = function( item ) {
            listContacts = ContactsService.update(item);
        };
        /**
        * Method for access "window.confirm()"
        * @param  {Boolean} confirmation boolean verificator for call "confirm" method
        * @return {Boolean}
        */
         var confirmDelete = function(confirmation){
            return confirmation ? confirm('This action is irreversible. Do you want to delete this contact?') : true;
        };
        /**
        * Remove a contact of contact list
        * @param  {Integer} index        `_id` value's contact
        * @param  {Boolean} confirmation boolean verificator for call "confirm" method
        * @return {Boolean}
        */
         $scope.delete = function(index) {
            confirmation = (typeof confirmation !== 'undefined') ? confirmation : true;
            if (confirmDelete(confirmation)) {
                var message,
                    item = ContactsService.delete(index);
                if (!!item) {
                    message = 'Contact "' + item.name + '" with id "' + item._id +
                        '" was removed of your contact\'s list';
                    AlertService.add('success', message, 1500);
                    $scope.init();
                    return true;
                }
            }
            AlertService.add('error',
                'Houston, we have a problem. This operation cannot be executed correctly.',
                5000);
            return false;
        };

        $scope.init = function() {
            listContacts = ContactsService.getListItems();
            $scope.filteredData = listContacts;
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
            $scope.reset();
            if ($route.current.method !== undefined) {
                $scope[$route.current.method]();
            }
            $scope.totalItems = (listContacts.length * 10) / $scope.numPerPage;
        }
        $scope.init();
    });