TrelloClone.Views.CardShow = Backbone.View.extend({
  template: JST["cards/show"],
  tagName: "li",

  events: {},

  initialize: function () {},

  render: function () {
    var renderedContent = this.template({
      card: this.model
    });

    this.$el.append(renderedContent);

    return this;
  }
});