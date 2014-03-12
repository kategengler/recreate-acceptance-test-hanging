Recreation of acceptance tests hanging with Ember > 1.4.0 and httpRespond
=========================================================================

Per issue https://github.com/trek/ember-testing-httpRespond/issues/10

1. Run a server. I used `python -m SimpleHTTPServer 8000` to do so.
2. Go to `http://localhost:8000?test` See the acceptance tests hang.
3. There are two other ember versions commented out in `index.html`. Switch to 1.4.0.beta.6 to
see the tests pass. Switch to 1.5.0.beta.4 to see that they still hang on the latest beta.


Note: I used ember-data out of convenience. It's what used in the app I primarily work on. This
problem should occur with any asynchronous behaviour in the route that prevents the transition
from completing.



starter-kit
===========

A starter kit for Ember

Your Ember.js project is almost ready! Here's how to get started:

- Start writing your app in js/app.js.

- Describe your application HTML in index.html.

- During development, you can link to js/libs/ember-*.js to get the
  unminified version of Ember.js.

- Add CSS to css/style.css

- Open index.html in your browser

Tests
=====

This starter kit comes with an integration test sample, written for QUnit runner. 

You can run the tests by opening the `index.html?test` page in your browser.

The test is located in the `tests/tests.js` file. You can see how such an 
integration test should be written, using QUnit assertions and ember-testing helpers.

For more information about ember-testing package see [ember-testing](http://emberjs.com/guides/testing/integration/)

For more information about the QUnit testing framework, see [QUnit](http://qunitjs.com/)

Contact
====

www.emberjs.com
