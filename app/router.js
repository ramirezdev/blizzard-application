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
            msgBus.command('global:set', {
                questionID: questionId
            });
            msgBus.command('question:get', questionId);
        },

        errorPage: function () {
            console.log('route error');
            return msgBus.commands.execute('equifit:error');
        }
    });

    module.exports = Router;
});
