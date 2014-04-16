var FeedItem = DS.Model.extend({
  title: DS.attr('string'),
  author: DS.attr('string'),
  content: DS.attr('string'),
  contentSnippet: DS.attr('string'),
  link: DS.attr('string'),
  publishedDate: DS.attr('date'),

  feed: DS.belongsTo('Feed'),

  created: function() {
    var date = this.get('publishedDate');
    return [
      (new Date()).getMonth(date),
      (new Date()).getDay(date),
      (new Date()).getFullYear(date)
    ].join('/');
  }.property('publishedDate')
});

FeedItem.reopenClass({
  FIXTURES: []
});

export default FeedItem;