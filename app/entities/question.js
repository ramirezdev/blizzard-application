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
        },
        url: function () {
            return 'https://api.stackexchange.com/2.2/questions/' + app.globalModel.get('questionID') + '?site=stackoverflow';
        }
    });


    var API = {

        getQuestionEntities: function () {
            var model = new Entities.Question();
            var defer = $.Deferred();

            msgBus.command('loading:show', {message: 'Loading...'});

                model.fetch({
                    success: function (data) {
                        defer.resolve(data);
                        msgBus.command('loading:hide');
                    },
                    error: function (model, jqXHR, textStatus) {
                        msgBus.command('loading:hide');
                        defer.reject(model, jqXHR, textStatus);
                    }
                });

            return defer.promise();
        }

    };

    msgBus.comply('question:entities', function () {
        return API.getQuestionsEntities();
    });


});
