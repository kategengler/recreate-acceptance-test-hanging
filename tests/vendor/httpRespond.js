var Test = Ember.Test,
    run = Ember.run;

var originalWait,
    countAsync = 0;

function customWait(app, value) {
  return Test.promise(function(resolve) {
    // If this is the first async promise, kick off the async test
    if (++countAsync === 1) {
      Test.adapter.asyncStart();
    }

    // Every 10ms, poll for the async thing to have finished
    var watcher = setInterval(function() {
      // 1. If the router is loading, keep polling
      // var routerIsLoading = !!app.__container__.lookup('router:main').router.activeTransition;
      // if (routerIsLoading) { return; }

      // 2. If there are pending Ajax requests, keep polling
      if (Test.pendingAjaxRequests) { return; }

      // 3. If there are scheduled timers or we are inside of a run loop, keep polling
      if (run.hasScheduledTimers() || run.currentRunLoop) { return; }
      if (Test.waiters && Test.waiters.any(function(waiter) {
        var context = waiter[0];
        var callback = waiter[1];
        return !callback.call(context);
      })) { return; }
      // Stop polling
      clearInterval(watcher);

      // If this is the last async promise, end the async test
      if (--countAsync === 0) {
        Test.adapter.asyncEnd();
      }

      // Synchronously resolve the promise
      run(null, resolve, value);
    }, 10);
  });

}

Ember.Test.registerAsyncHelper('httpRespond', function(app, verb, url, body, status) {
  if(typeof body !== 'string'){ body = JSON.stringify(body); }

  var found = fakehr.match(verb.toUpperCase(), url)

  if (found){
    Ember.run(function() {
      found.respond(status || 200, {'content-type': 'application/json'}, body);
    });
  } else {
    throw new Ember.Error("No request intercepted for " + verb.toUpperCase() + " " + url + ". Intercepted requests were: " + fakehr.requests.map(function(r){ return r.method + " " + r.url}).join(", "));
  }
  return wait(app);
});

Ember.Test.registerAsyncHelper('wait', customWait);

/*
 This is mildly crazy. Ember.Test increments requets on ajax start
 so promises won't resolve until all xhrs complete, but were mocking
 them all, so we just remove the ajaxStart and ajaxStop callbacks
 until we can merge into master and put some of this behind flags.
 */
Ember.Test.onInjectHelpers(function() {
  Ember.$(document).unbind("ajaxStart ajaxStop ajaxSend ajaxComplete");
});
