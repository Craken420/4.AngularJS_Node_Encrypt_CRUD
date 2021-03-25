angular.module('plunkerApp')
.factory('ContactsService', function () {
    return {
      greet: function  (name) {
        return 'Hi: ' + name;
    }
  }
})