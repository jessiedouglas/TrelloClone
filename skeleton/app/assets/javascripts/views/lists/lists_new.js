TrelloClone.Views.ListsNew = Backbone.View.extend({
  template: JST["lists/new"],
  tagName: "form",

  initialize: function (options) {
    this.board = options.board
  },

  render: function () {
    var renderedContent = this.template({
      board: this.board
    });

    this.$el.html(renderedContent);

    return this;
  }
});