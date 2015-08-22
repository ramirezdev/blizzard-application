define(function (require) {

    /*jshint camelcase: false */
    'use strict';

    var app = require('app');
    var Backbone = require('backbone');
    var msgBus = require('msgbus');
    var Entities = {};

    Entities.Question = Backbone.Model.extend({
        idAttribute: 'question_id',
        defaults: {
            tags: null,
            owner: null,
            is_answered: null,
            view_count: null,
            accepted_answer_id: null,
            answer_count: null,
            score: null,
            last_activity_date: null,
            creation_date: null,
            last_edit_date: null,
            link: null,
            title: null
        }
    });

    Entities.QuestionCollection = Backbone.Collection.extend({
        model: Entities.Question,
        parse : function(response){
            return response.items;  
        }, 
        url: function () {
            return app.globalModel.get('APIendpoint') + 'questions?order=desc&sort=' + app.globalModel.get('currentSort') + '&site=stackoverflow';
        }
    });

    Entities.SearchQuestionCollection = Backbone.Collection.extend({
        model: Entities.Question,
        parse : function(response){
            return response.items;  
        }, 
        url: function () {
            return app.globalModel.get('APIendpoint') + 'search?order=desc&sort=activity&intitle=' + app.globalModel.get('searchTerm') +'&site=stackoverflow';
        }
    });

    var API = {

        getQuestionsEntities: function () {
            var collection = new Entities.QuestionCollection();
            var defer = $.Deferred();
            // show loading view  while fetching data
            msgBus.commands.execute('loading:show');

                collection.fetch({
                    success: function (data) {
                        console.log('data ', data);
                        defer.resolve(data);
                        msgBus.commands.execute('loading:hide');
                    },
                    error: function (model, jqXHR, textStatus) {
                        msgBus.commands.execute('loading:hide');
                        defer.reject(model, jqXHR, textStatus);
                    }
                });

            return defer.promise();
        },

        getSearchQuestionsEntities: function () {
            var collection = new Entities.SearchQuestionCollection();
            var defer = $.Deferred();
            msgBus.commands.execute('loading:show');

                collection.fetch({
                    success: function (data) {
                        defer.resolve(data);
                        msgBus.commands.execute('loading:hide');
                    },
                    error: function (model, jqXHR, textStatus) {
                        msgBus.commands.execute('loading:hide');
                        defer.reject(model, jqXHR, textStatus);
                    }
                });

            return defer.promise();
        }

    };

    msgBus.reqres.setHandler('questions:entities', function () {
        return API.getQuestionsEntities();
    });

    msgBus.reqres.setHandler('questions:search:entities', function () {
        return API.getSearchQuestionsEntities();
    });



});
