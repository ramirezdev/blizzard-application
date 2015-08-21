define(function (require, exports, module) {
	'use strict';

	//var app = require('app');
	var Backbone = require('backbone');
    var msgBus = require('msgbus');
    //var moment = require('moment');
    var QuestionView;

    var QuestionDetails = Backbone.View.extend({
        manage: true,
        template: 'question-details',

        serialize: function () {
            var data = this.model.toJSON();
            return data;
        }

        
    });


    QuestionView = Backbone.Layout.extend({
        template: 'question',
        initialize: function () {
            msgBus.command('scroll:top');
        },

        beforeRender: function () {
        	this.insertView('.question-details', new QuestionDetails({
        		model: this.model
        	}));
        }


    });


	module.exports = QuestionView;

});