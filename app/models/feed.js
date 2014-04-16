var Feed = DS.Model.extend({
  name: DS.attr('string'),
  url: DS.attr('string'),

  feedItems: DS.hasMany('FeedItem'),

  refresh: function() {
    var url = this.get('url');
    var googleUrl = document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=10&callback=?&q=' + encodeURIComponent(url);
    $.ajax({
      url: googleUrl,
      dataType: 'json',
      context: this,
      success: function(data) {
        var feed = data.responseData.feed;
        var items = feed.entries.forEach(function(entry) {
          if (this.get('feedItems').findProperty('link', entry.link)) {
            return;
          }
          var feedItem = this.get('feedItems').createRecord({
            title: entry.title,
            author: entry.author,
            content: entry.content,
            contentSnippet: entry.contentSnippet,
            link: entry.link,
            publishedDate: entry.publishedDate
          });
        }, this);
      }
    });
  }
});

Feed.reopenClass({
  FIXTURES: [
    {id: 1, name: 'Codrops', url: 'http://feeds.feedburner.com/tympanus?format=xml'},
    {id: 2, name: 'Smashing Magazine', url: 'http://rss1.smashingmagazine.com/feed/'},
    {id: 3, name: 'Hacker News', url: 'https://news.ycombinator.com/rss'}
  ]
});

export default Feed;