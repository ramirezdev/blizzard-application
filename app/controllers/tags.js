define(function (require, exports, module) {
    'use strict';

    var app = require('app');
    var msgBus = require('msgbus');
    var TagsView = require('views/tags');
    var controller = {};

    controller.getTags = function () {
        require('entities/tags');

        var fetchingTags = msgBus.reqres.request('tags:entities');
        
        $.when(fetchingTags).then(function (tags) {
        
            app.layout.insertView('.tags-holder', new TagsView({
                collection: tags
            })).render();

            //app.layout.render();
        });

        $.when(fetchingTags).fail(function (model, jqXHR, textStatus) {
            msgBus.commands.execute('blizzard:error',  model, jqXHR, textStatus);
        });
    };

    module.exports = controller;
});