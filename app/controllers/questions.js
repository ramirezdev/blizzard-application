define(function (require, exports, module) {
    'use strict';

    var app = require('app');
    var msgBus = require('msgbus');
    var QuestionsView = require('views/questions');
    var questionsViewModule;
    var controller = {};

    controller.getQuestions = function () {
        require('entities/questions');

        var fetchingQuestions = msgBus.reqres.request('questions:entities');
        
        $.when(fetchingQuestions).then(function (questions) {

            questionsViewModule = new QuestionsView({
                collection: questions
            });
        
            app.layout.setView('.questions-holder', questionsViewModule);

            app.layout.render();
            msgBus.commands.execute('tags:get');

        });

        $.when(fetchingQuestions).fail(function (model, jqXHR, textStatus) {
            msgBus.commands.execute('blizzard:error',  model, jqXHR, textStatus);
        });
    };

    controller.searchQuestions = function (term) {
        require('entities/questions');
        app.globalModel.set('searchTerm', term);

        var fetchingQuestions = msgBus.reqres.request('questions:search:entities');
        
        $.when(fetchingQuestions).then(function (questions) {
        
            questionsViewModule = new QuestionsView({
                collection: questions
            });
        
            app.layout.setView('.questions-holder', questionsViewModule);

            app.layout.render();
            msgBus.commands.execute('tags:get');
        });

        $.when(fetchingQuestions).fail(function (model, jqXHR, textStatus) {
            msgBus.commands.execute('blizzard:error',  model, jqXHR, textStatus);
        });
    };

    module.exports = controller;
});