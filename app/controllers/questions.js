define(function (require, exports, module) {
    'use strict';

    var app = require('app');
    var msgBus = require('msgbus');
    var QuestionsView = require('views/Questions');
    /*var HeaderView = require('views/header');
    var BreadCrumbView = require('views/breadcrumb');*/
    var controller = {};

    controller.getQuestions = function () {
        require('entities/questions');
        var fetchingQuestions = msgBus.command('questions:entities');

        $.when(fetchingQuestions).then(function (Questions) {
            
            /*msgBus.commands.execute('store:set', {
                clientName: Questions.at(0).get('clientName'),
                clientId: Questions.at(0).get('clientId'),
                pageTitle: 'Questions'
            });
           
            app.layout.setView('.header', new HeaderView({
                model: new Backbone.Model({
                    pageTitle: 'Questions',
                    updatedAt: null   // do not show last modified on equifit list page
                })
            }));

            app.layout.setView('.navigation', new BreadCrumbView({
                model: new Backbone.Model({
                    breadCrumbId: 'Questions'
                })
            }));*/

            app.layout.setView('.main-container', new QuestionsView({
                collection: Questions
            }));
            app.layout.render();
        });

        $.when(fetchingQuestions).fail(function (model, jqXHR, textStatus) {
            msgBus.command('blizzard:error',  model, jqXHR, textStatus);
        });
    };

    module.exports = controller;
});