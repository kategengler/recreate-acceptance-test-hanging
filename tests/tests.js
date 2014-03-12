// in order to see the app running inside the QUnit runner
App.rootElement = '#ember-testing';

// Common test setup
App.setupForTesting();
App.injectTestHelpers();

// common QUnit module declaration
module("Integration tests", {
  setup: function() {
    App.reset();
    fakehr.start();
  },
  teardown: function(){
    fakehr.stop();
  }
});

// QUnit test case
test("/", function() {
  // async helper telling the application to go to the '/' route
  visit("/");
  httpRespond("get", "/api/colors", {"colors": [{"id": 1, "name": "red"},{"id": 2, "name": "yellow"}, {"id": 3, "name": "blue"}]});

  // helper waiting the application is idle before running the callback
  andThen(function() {
    equal(find("h2").text(), "Welcome to Ember.js", "Application header is rendered");
    equal(find("li").length, 3, "There are three items in the list");
  });
});
