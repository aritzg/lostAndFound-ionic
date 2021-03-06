angular.module('lf.services.item', [])


    .factory('ItemService', function ($rootScope) {
        $rootScope.item;

        var service = {

            fetchAlerts: function (cb) {
            	var Item = Parse.Object.extend("Item"),

                    ItemCollection = Parse.Collection.extend({
                        model: Item,
                        query: (new Parse.Query(Item)).equalTo("office", $rootScope.office).equalTo('type','alert').include('createdBy')
                    });
                var item_collection = new ItemCollection();

                item_collection.fetch({
                  success: function(collection) {
                    cb(null,collection);
                  },
                  error: function(collection, error) {
                    cb(error,null);
                  }
                });
            },

            fetchFoundItems: function(cb) {

            	var Item = Parse.Object.extend("Item"),

                    ItemCollection = Parse.Collection.extend({
                        model: Item,
                        query: (new Parse.Query(Item)).equalTo("office", $rootScope.office).equalTo('type','found').include('createdBy').include('category')
                    });
                var item_collection = new ItemCollection();

                item_collection.fetch({
                  success: function(collection) {
                    cb(null,collection);
                  },
                  error: function(collection, error) {
                    cb(error,null);
                  }
                });

            },

            foundItemsByCategory: function(category_id,cb) {
                var results = [];
                $rootScope.founditems_collection.each(function(object){
                    if(object.attributes.category.id == category_id)
                      results.push(object);
                });
                cb(null,results);
            }

        }
        return  service;
    });
