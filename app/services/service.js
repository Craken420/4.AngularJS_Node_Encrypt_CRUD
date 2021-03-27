angular.module('plunkerApp')
.factory('ContactsService', function (listContacts) {
    var _items = listContacts;

    return {
        create: function (item) {
          item._id = _items.length;
          _items.push(item);
          console.log(_items)
          return _items;
        },
        update: function (item) {
            _items = _items.map( function (element) {
              if ( element._id === item._id){
                element = item;
              }
              return element;
            });
            return _items;
        }
    }
})