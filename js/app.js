App = Ember.Application.create();

App.Store = DS.Store.extend({});

App.ApplicationAdapter = DS.ActiveModelAdapter.extend({
  namespace: 'api'
});

App.Color = DS.Model.extend({
  name: DS.attr('string')
});


App.Router.map(function() {
  // put your routes here
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('color');
  }
});

