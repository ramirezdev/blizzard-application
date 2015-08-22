define(function (require) {

    /*jshint camelcase: false */
    'use strict';

    var app = require('app');
    var Backbone = require('backbone');
    var msgBus = require('msgbus');
    var Entities = {};

    Entities.Answer = Backbone.Model.extend();

    Entities.AnswersCollection = Backbone.Collection.extend({
        model: Entities.Answer,
        parse : function(response){
            return response.items;  
        }, 
        url: function () {
            return app.globalModel.get('APIendpoint') + 'questions/' + app.globalModel.get('questionID') + '/answers?filter=withbody&site=stackoverflow';
        }
    });


    var API = {

        getAnswersEntities: function () {
            var collection = new Entities.AnswersCollection();
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

    msgBus.reqres.setHandler('answers:entities', function () {
        return API.getAnswersEntities();
    });


});
