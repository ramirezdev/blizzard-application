define(function (require, exports, module) {
    'use strict';

    var app = require('app');
    var msgBus = require('msgbus');
    var EquifitView = require('views/question');
    var moment = require('moment');
    //var HeaderView = require('views/header');
    var controller = {};

    controller.getQuestion = function (questionId) {
        require('entities/questions');
        var fetchingQuestion = msgBus.command('question:entities');

        $.when(fetchingEquifits).then(function (question) {
        
            app.layout.setView('.main-container', new EquifitView({
                model: question
            }));

            app.layout.render();
        });

        $.when(fetchingEquifits).fail(function (model, jqXHR, textStatus) {
            msgBus.command('blizzard:error', model, jqXHR, textStatus);
        });
    };

    

    module.exports = controller;
});
