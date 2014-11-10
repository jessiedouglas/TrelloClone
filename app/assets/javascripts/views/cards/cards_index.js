TrelloClone.Views.CardsIndex = Backbone.View.extend({
  template: JST["cards/index"],
  tagName: "ul",
  className: "cards-index",

  events: {
    "click a.card-new": "newCard",
    "click .create-card": "addCard",
    "click .card-delete": "deleteCard"
  },

  initialize: function () {
    this.listenTo(this.collection, "add remove sync", this.render)
  },

  render: function () {
    var renderedContent = this.template({
      cards: this.collection
    });

    this.$el.html(renderedContent);
    return this;
  },

  newCard: function (event) {
    event.preventDefault();
    var $currentTarget = $(event.currentTarget);
    var cardList = $currentTarget.parent();
    var listId = $currentTarget.closest(".list").data("id");

    $currentTarget.remove();

    var newForm = new TrelloClone.Views.CardsNew({
      listId: listId
    });
    cardList.append(newForm.render().$el);
  },

  addCard: function (event) {
    event.preventDefault();
    var $currentTarget = $(event.currentTarget);
    var cardList = $currentTarget.closest("ul");
    var form = $("form.new-card");
    var attrs = form.serializeJSON();

    form.remove();

    this.collection.create(attrs, {
      success: function() {
        console.log("yay!");
      }
    });
  },

  deleteCard: function (event) {
    event.preventDefault();
    var $currentTarget = $(event.currentTarget);

    var cardId = $currentTarget.data("id");
    var card = this.collection.get(cardId);

    card.destroy();
  },
});