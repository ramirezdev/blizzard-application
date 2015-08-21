define(function (require, exports, module) {
    'use strict';

    var app = require('app');
    var msgBus = require('msgbus');
    var QuestionView = require('views/question');
    var moment = require('moment');
    //var HeaderView = require('views/header');
    var controller = {};

    controller.getQuestion = function (questionId) {
        app.globalModel.set('questionID', questionId);
        require('entities/questions');
        var fetchingQuestion = msgBus.command('question:entities');

        $.when(fetchingQuestion).then(function (question) {
        
            app.layout.setView('.main-container', new QuestionView({
                model: question
            }));

            app.layout.render();
        });

        $.when(fetchingQuestion).fail(function (model, jqXHR, textStatus) {
            msgBus.command('blizzard:error', model, jqXHR, textStatus);
        });
    };

    

    module.exports = controller;
});
