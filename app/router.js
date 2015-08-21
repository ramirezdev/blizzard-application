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
           /* if (!equifitId && !formId) {
                msgBus.commands.execute('store:set', {
                    clientId: clientId
                });
                msgBus.commands.execute('equifits:get',  clientId);
            }
            else if (!formId) {
                msgBus.commands.execute('store:set', {
                    clientId: clientId,
                    equifitId: equifitId
                });
                console.log('route get equifit:', clientId, equifitId);
                msgBus.commands.execute('equifit:get',  equifitId);
            }
            else {
                msgBus.commands.execute('store:set', {
                    clientId: clientId,
                    equifitId: equifitId,
                    formId: formId
                });
                //console.log('route get form:', clientId, equifitId, formId);
                msgBus.commands.execute('form:get', formId);
            }*/
        },

        question: function (questionId) {
            msgBus.commands.execute('store:set', {
                clientId: clientId
            });
            msgBus.commands.execute('equifit:create');
        },

        errorPage: function () {
            console.log('route error');
            return msgBus.commands.execute('equifit:error');
        }
    });

    module.exports = Router;
});
