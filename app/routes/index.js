var IndexRoute = Ember.Route.extend({
  setupController: function(controller, model) {
    var feeds = this.get('store').find('feed');

    feeds.then(function() {
      feeds.forEach(function(feed) {
        feed.refresh();
      });
      controller.set('feeds', feeds);
    });
  }
});

export default IndexRoute;