define(function (require, exports, module) {
    'use strict';

    var app = require('app');
    var msgBus = require('msgbus');
    var QuestionView = require('views/question');
    var AnswersView = require('views/answers');
    //var moment = require('moment');
    var controller = {};
    var questionViewModule;

    controller.getQuestion = function (questionId) {
        app.globalModel.set('questionID', questionId);

        require('entities/question');
        var fetchingQuestion = msgBus.reqres.request('question:entities');

        $.when(fetchingQuestion).then(function (question) {

            questionViewModule = new QuestionView({
                model: question
            });
        
            app.layout.setView('.questions-holder', questionViewModule);

            
            controller.getAnswers();
            //app.layout.render();
        });

        $.when(fetchingQuestion).fail(function (model, jqXHR, textStatus) {
            msgBus.commands.execute('blizzard:error', model, jqXHR, textStatus);
        });
    };

    controller.getAnswers = function () {
        require('entities/answers');

        var fetchingAnswers = msgBus.reqres.request('answers:entities');

        $.when(fetchingAnswers).then(function (answers) {
        
            questionViewModule.insertView('.all-answers', new AnswersView({
                collection: answers
            }));

            msgBus.commands.execute('tags:get');
            app.layout.render();
            
        });

        $.when(fetchingAnswers).fail(function (model, jqXHR, textStatus) {
            msgBus.commands.execute('blizzard:error', model, jqXHR, textStatus);
        });
    };

    

    module.exports = controller;
});
