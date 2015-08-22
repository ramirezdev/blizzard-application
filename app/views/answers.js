define(function (require, exports, module) {
    'use strict';

    //var app = require('app');
    //var msgBus = require('msgbus');
    //var moment = require('moment');
    var AnswersView;

    var AnswerItem = Backbone.View.extend({
        manage: true,
        template: 'answer-item',
        tagName: 'li',

        serialize: function () {
            var data = this.model.toJSON();
            return data;
        }

    });

    var AnswerEmpty = Backbone.View.extend({
        manage: true,
        template: 'answer-empty',
        tagName: 'li'
    });

    AnswersView = Backbone.Layout.extend({
        template: 'answers',

        beforeRender: function () {

            if (this.collection.length > 0) {

                this.collection.each(function (item) {
                    this.insertView('.answers-list', new AnswerItem({
                        model: item
                    }));
                }, this);

            } else {

                this.insertView('.answers-list', new AnswerEmpty());

            }

            
        }

    });

    module.exports = AnswersView;
});