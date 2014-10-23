TrelloClone.Routers.BoardsRouter = Backbone.Router.extend({
  initialize: function(options) {
    this.$rootEl = options.$rootEl
  },

  routes: {
    "": "index",
    "board/:id": "show"
  },

  index: function () {
    var indexView = new TrelloClone.Views.BoardsIndex({
      collection: TrelloClone.boards
    });

    this._swapView(indexView);
  },

  show: function (id) {
    var board = TrelloClone.boards.getOrFetch(id);
    var showView = new TrelloClone.Views.BoardShow({
      model: board
    });

    this._swapView(showView);
  },

  _swapView: function (newView) {
    if (this._currentView) {
      this._currentView.remove();
    }

    this._currentView = newView;
    this.$rootEl.html(this._currentView.render().$el);
  }
});