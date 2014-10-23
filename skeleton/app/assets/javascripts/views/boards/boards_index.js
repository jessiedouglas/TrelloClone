TrelloClone.Views.BoardsIndex = Backbone.View.extend({
  template: JST["boards/index"],

  events: {
    "click .new-board": "addBoard",
    "click .delete-board": "deleteBoard"
  },

  initialize: function () {
    this.listenTo(this.collection, "sync add destroy", this.render)
  },

  render: function () {
    var renderedContent = this.template({
      boards: this.collection
    });

    this.$el.html(renderedContent);

    return this;
  },

  addBoard: function (event) {
    event.preventDefault();

    var attrs = $(event.currentTarget).parent().serializeJSON();
    var model = new this.collection.model();
    model.set(attrs.board);

    this.collection.create(model, {
      success: function () {
        var id = model.get("id");
        Backbone.history.navigate("board/" + id, {trigger: true});
      }
    });
  },

  deleteBoard: function (event) {
    event.preventDefault();
    var $currentTarget = $(event.currentTarget)

    var id = $currentTarget.data("id");
    var board = this.collection.getOrFetch(id);

    board.destroy();
  }
});