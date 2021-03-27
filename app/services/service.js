angular.module('plunkerApp')
.factory('ContactsService', function (listContacts) {
    var _items = listContacts;

    return {
        setListItems: function(items) {
          _items = items;
          return this;
        },
        getListItems: function() {
            return _items;
        },
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
        },
        delete: function(index) {
          var db = this.getListItems();
          var _id = db.filter( function (element, pos) {
            if ( element._id === index) {
              element.pos = pos;
              return element;
            }
          });
          if (_id.length > 0) {
            var item = db.splice(_id[0].pos, 1);
            if (typeof item[0] === 'object') {
              this.setListItems(db);
              return item[0];
            }
          }
          return false;
      }
    }
})