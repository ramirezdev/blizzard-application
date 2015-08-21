require.config({
    paths: {
        'underscore': '../bower_components/underscore/underscore-min',
        'lodash': '../bower_components/lodash/lodash.min',
        'template': '../bower_components/lodash-template-loader/loader',
        'jquery': '../bower_components/jquery/dist/jquery.min',
        'backbone': '../bower_components/backbone/backbone',
        'backbone.layoutmanager': '../bower_components/layoutmanager/backbone.layoutmanager',
        'backbone.radio': '../bower_components/backbone.radio/build/backbone.radio.min',
        'moment': '../bower_components/moment/moment',
        'spin': '../bower_components/spin.js/spin',
        'bootstrap': '../bower_components/dist/bootstrap.min'
    },

    shim: {
        'bootstrap': ['jquery']
    },

    deps: ['main']
});
