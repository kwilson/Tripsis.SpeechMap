requirejs.config({
    //By default load any module IDs from scripts/app/modules
    baseUrl: 'scripts/modules',
    waitSeconds: 120, //make sure it is enough to load all gmaps scripts

    paths: {
        app: '../app',
        "jquery": "//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min",
        "async": "../plugins/async"
    }
});

requirejs(['main']);