/**
 * Global Module
 * description: Get and Set common data during app lifespan
 */

define(function (require, exports, module) {
    'use strict';

    var Backbone = require('backbone');
    //var msgBus = require('msgbus');
    var Entities = {};

    Entities.Global = Backbone.Model.extend({

        defaults: {
            APIendpoint: 'https://api.stackexchange.com/2.2/',
            APIkey: 'MzO8)tVMOLMm)4PM4H52nQ((',
            questionID: null,
            title: null,
            searchTerm: null,
            currentSort: 'activity'
			
        }
        
    });


    module.exports = Entities.Global;
});
