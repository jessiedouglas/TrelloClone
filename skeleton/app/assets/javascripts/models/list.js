TrelloClone.Models.List = Backbone.Model.extend({
  urlRoot: "api/lists",

  setCards: function (cards) {
    this.cards().set(cards);
  },

  cards: function () {
    if (!this._cards) {
      this._cards = new TrelloClone.Collections.Cards([], {
        list: this
      });
    }

    return this._cards;
  }
});