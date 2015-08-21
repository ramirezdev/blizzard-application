define(function (require, exports, module) {
    'use strict';

    var app = require('app');
    var msgBus = require('msgbus');
    //var moment = require('moment');
    var QuestionsView;

    var QuestionItem = Backbone.View.extend({
        manage: true,
        template: 'question-item',
        tagName: 'li',

        events: {
            'click': 'showQuestion'
        },

        serialize: function () {
            var data = this.model.toJSON();
            return data;
        },

        /***
         * show Question page
         */
        showQuestion: function () {
            msgBus.command('question:get', this.model.id);
            app.router.navigate('question/' + this.model.get('questionId'));
        },

        
    });

    QuestionsView = Backbone.Layout.extend({
        template: 'questions',

        initialize: function () {
            msgBus.commands.execute('scroll:top');
        },

        beforeRender: function () {
            this.collection.each(function (item) {

                this.insertView('.questions-list', new QuestionItem({
                    model: item
                }));

            }, this);
        }

    });

    module.exports = QuestionsView;
});