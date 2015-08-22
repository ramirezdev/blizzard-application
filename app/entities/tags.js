define(function (require) {

    /*jshint camelcase: false */
    'use strict';

    var app = require('app');
    var Backbone = require('backbone');
    var msgBus = require('msgbus');
    var Entities = {};

    Entities.Tag = Backbone.Model.extend();

    Entities.TagsCollection = Backbone.Collection.extend({
        model: Entities.Tag,
        parse : function(response){
            return response.items;  
        }, 
        url: function () {
            return app.globalModel.get('APIendpoint') + 'tags?order=desc&sort=popular&site=stackoverflow';
        }
    });


    var API = {

        getTagsEntities: function () {
            var collection = new Entities.TagsCollection();
            var defer = $.Deferred();

                collection.fetch({
                    success: function (data) {
                        defer.resolve(data);
                    },
                    error: function (model, jqXHR, textStatus) {
                        defer.reject(model, jqXHR, textStatus);
                    }
                });

            return defer.promise();
        }

    };

    msgBus.reqres.setHandler('tags:entities', function () {
        return API.getTagsEntities();
    });


});
