define(function (require, exports, module) {
    'use strict';

    var app = require('app');
    var msgBus = require('msgbus');
    var QuestionsView = require('views/questions');
    var TagsView = require('views/tags');
    var questionsViewModule;
    /*var HeaderView = require('views/header');
    var BreadCrumbView = require('views/breadcrumb');*/
    var controller = {};

    controller.getQuestions = function () {
        require('entities/questions');

        var fetchingQuestions = msgBus.reqres.request('questions:entities');
        
        $.when(fetchingQuestions).then(function (questions) {

            questionsViewModule = new QuestionsView({
                collection: questions
            });
        
            app.layout.setView('.main-container', questionsViewModule);

            controller.getTags();

        });

        $.when(fetchingQuestions).fail(function (model, jqXHR, textStatus) {
            msgBus.commands.execute('blizzard:error',  model, jqXHR, textStatus);
        });
    };

    controller.getTags = function () {
        require('entities/tags');

        var fetchingTags = msgBus.reqres.request('tags:entities');
        
        $.when(fetchingTags).then(function (tags) {
        
            questionsViewModule.insertView('.all-tags', new TagsView({
                collection: tags
            }));

            app.layout.render();
        });

        $.when(fetchingTags).fail(function (model, jqXHR, textStatus) {
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
        
            app.layout.setView('.main-container', questionsViewModule);

            controller.getTags();
        });

        $.when(fetchingQuestions).fail(function (model, jqXHR, textStatus) {
            msgBus.commands.execute('blizzard:error',  model, jqXHR, textStatus);
        });
    };

    module.exports = controller;
});