define(function (require, exports, module) {
    'use strict';

    var app = require('app');
    var Radio = require('backbone.radio');
    var msgBus = Radio.channel('blizzard');

    
    /***
     * Get Questions
     */
    msgBus.comply('questions:get', function(){
        require(['controllers/questions'], function (controller) {
            controller.getQuestions();
        });
    });

    /***
     * Get Question
     */
    msgBus.comply('question:get', function(questionId){
        require(['controllers/question'], function (controller) {
            controller.getQuestion(questionId);
        });
    });

    /***
     * Helper Event triggers
     * @type {Object}
     */
    msgBus.comply('scroll:top', function () {
        require(['controllers/helper'], function (controller) {
            controller.scrollTop();
        });
    });

    /***
     * Set Data Storage
     */
    msgBus.comply('global:set', function(options){
        app.globalModel.set(options);
    });


    /***
     * Show loading view
     */
    msgBus.comply('loading:show', function(options){
        require(['controllers/loading'], function (controller) {
            controller.show(options);
        });
    });

    /***
     * Hide loading view
     */
    msgBus.comply('loading:hide', function(){
        require(['controllers/loading'], function (controller) {
            controller.hide();
        });
    });

    msgBus.comply('blizzard:error', function(model, jqXHR, textStatus){
        require(['controllers/error'], function (controller) {
            controller.init(model, jqXHR, textStatus);
        });
    });

    module.exports = msgBus;
});