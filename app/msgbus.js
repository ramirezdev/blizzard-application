define(function (require, exports, module) {
    'use strict';

    var app = require('app');
    var Wreqr = require('backbone.wreqr');

    var msgBus = {
        reqres: new Wreqr.RequestResponse(),
        commands: new Wreqr.Commands(),
        events: new Wreqr.EventAggregator()
    };

    
    /***
     * Get Questions
     */
    msgBus.commands.setHandler('questions:get', function(){
        require(['controllers/questions'], function (controller) {
            controller.getQuestions();
        });
    });

    /***
     * Search Questions
     */
    msgBus.commands.setHandler('questions:search', function(term){
        require(['controllers/questions'], function (controller) {
            controller.searchQuestions(term);
        });
    });

    /***
     * Get Question
     */
    msgBus.commands.setHandler('question:get', function(questionId){
        require(['controllers/question'], function (controller) {
            controller.getQuestion(questionId);
        });
    });

    /***
     * Helper Event triggers
     * @type {Object}
     */
    msgBus.commands.setHandler('scroll:top', function () {
        require(['controllers/helper'], function (controller) {
            controller.scrollTop();
        });
    });

    /***
     * Set Data Storage
     */
    msgBus.commands.setHandler('global:set', function(options){
        app.globalModel.set(options);
    });


    /***
     * Show loading view
     */
    msgBus.commands.setHandler('loading:show', function(options){
        require(['controllers/loading'], function (controller) {
            controller.show(options);
        });
    });

    /***
     * Hide loading view
     */
    msgBus.commands.setHandler('loading:hide', function(){
        require(['controllers/loading'], function (controller) {
            controller.hide();
        });
    });

    msgBus.commands.setHandler('blizzard:error', function(model, jqXHR, textStatus){
        require(['controllers/error'], function (controller) {
            controller.init(model, jqXHR, textStatus);
        });
    });

    module.exports = msgBus;
});