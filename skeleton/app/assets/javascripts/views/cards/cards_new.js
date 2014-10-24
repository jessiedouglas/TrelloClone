TrelloClone.Views.CardsNew = Backbone.View.extend({
  template: JST["cards/new"],
  tagName: "form",
  className: "new-card",

  initialize: function (options) {
    this.listId = options.listId
  },

  render: function () {
    var renderedContent = this.template({
      listId: this.listId
    });

    this.$el.append(renderedContent);

    return this;
  }
});