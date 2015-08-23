define(function (require, exports, module) {
    'use strict';

    //var app = require('app');
    //var msgBus = require('msgbus');
    var TagsView;

    var TagItem = Backbone.View.extend({
        manage: true,
        template: 'tag-item',
        tagName: 'span',
        className: 'tag-item badge',

        serialize: function () {
            var data = this.model.toJSON();
            return data;
        }

    });

    TagsView = Backbone.Layout.extend({
        template: 'tags',
        el: false,
        beforeRender: function () {

            this.collection.each(function (item) {
                this.insertView('.tags-list', new TagItem({
                    model: item
                }));
            }, this);

            
        }

    });

    module.exports = TagsView;
});