/**
 * Global Module
 * description: Get adn Set common data during app lifespan
 */

define(function (require, exports, module) {
    'use strict';

    var Backbone = require('backbone');
    //var msgBus = require('msgbus');
    var Entities = {};

    Entities.Global = Backbone.Model.extend({

        defaults: {

            questionID: null
			
        }//,

        //initialize: function () {
            //this.on('change', this.updateStorage);
            //this.on('change:pageTitle', this.updatePageTitle);
        //}
    });


    module.exports = Entities.Global;
});
