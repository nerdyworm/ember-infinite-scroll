App = Ember.Application.create();

App.Router.map(function() {

});


App.IndexRoute = Ember.Route.extend({
  model: function() {
    var items = [];

    for(var i = 0; i < 100; i++)
      items.pushObject(i);

    return items;
  },

  events: {
    more: function() {
      var items = this.modelFor('index'),
          last  = items.get('lastObject');

      for(var i = last + 1; i < last + 100; i++)
        items.pushObject(i);
    }
  }
});


App.IndexView = Ember.View.extend({
  didInsertElement: function() {
    var view = this;
    $(window).bind("scroll", function() {
      view.didScroll();
    });
  },

  willDestroyElement: function() {
    $(window).unbind("scroll");
  },

  didScroll: function() {
    if(this.isScrolledToBottom()) {
      this.get('controller').send('more');
    }
  },

  isScrolledToBottom: function() {
    var distanceToTop = $(document).height() - $(window).height(),
        top           = $(document).scrollTop();

    return top === distanceToTop;
  }
});
