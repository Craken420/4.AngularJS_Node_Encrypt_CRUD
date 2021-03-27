angular.module('plunkerApp')
.factory('ContactsService', function (listContacts) {
    var _items = listContacts;

    return {
        create: function (item) {
          item._id = _items.length;
          _items.push(item);
          console.log(_items)
          return _items;
        }
    }
})