define(function (require, exports, module) {
    'use strict';

    var Backbone = require('backbone');
    var msgBus = require('msgbus');

    var Router = Backbone.Router.extend({

        routes: {
            '': 'questions',
            'question/:id': 'question',
            'error': 'errorPage'
        },

        questions: function () {
            msgBus.commands.execute('questions:get');
        },

        question: function (questionId) {
            msgBus.commands.execute('global:set', {
                questionID: questionId
            });
            msgBus.commands.execute('question:get', questionId);
        },

        errorPage: function () {
            console.log('route error');
            return msgBus.commands.execute('blizzard:error');
        }
    });

    module.exports = Router;
});