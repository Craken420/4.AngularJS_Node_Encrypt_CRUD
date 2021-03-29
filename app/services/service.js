angular.module('plunkerApp')
.config(function ($cryptoProvider) {
  var _key = '123456'
  $cryptoProvider.setCryptographyKey(_key);
})
.factory('ContactsService', function (listContacts, $crypto) {
    var _items = listContacts;

    return {
        encrypt: function (word) {
          return $crypto.encrypt(word)
        },
        decrypt: function (word) {
            return $crypto.decrypt(word)
        },
        setListItems: function(items) {
          _items = items;
          return this;
        },
        getListItems: function() {
            return _items;
        },
        create: function (item) {
          item._id = _items.length;
          item.password = this.encrypt(item['password']);
          _items.push(item);
          console.log('_items: ', _items)
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