TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["boards/show"],

  events: {
    "click .add-list": "addList",
    "click .delete-list": "deleteList"
  },

  initialize: function () {
    this.listenTo(this.model, "sync destroy add", this.render);
    this.listenTo(this.model.lists(), "add remove", this.render)
  },

  render: function () {
    var renderedContent = this.template({
      board: this.model
    });

    this.$el.html(renderedContent);

    this.renderCards();
    this.renderNew();

    return this;
  },

  renderCards: function () {
    var that = this;

    $("li.list").each(function (index, listItem) {
      var $listItem = $(listItem);
      var id = $listItem.data("id");
      var list = that.model.lists().get(id);
      var cards = list.cards();
      var listDiv = '<ul class="list' + id + '">'
      $listItem.append(listDiv);

      cards.each(function (card) {
        var cardShow = new TrelloClone.Views.CardShow({
          model: card
        });
        $(".list" + id).append(cardShow.render().$el);
        that.addSubview(".list" + id, cardShow)
      });
    });
  },

  renderNew: function () {
    var newDiv = '<div class="new">';
    this.$el.append(newDiv);
    var newListsView = new TrelloClone.Views.ListsNew({
      board: this.model
    });
    this.addSubview(".new", newListsView);
    $(".new").append(newListsView.render().$el);
  },

  addList: function (event) {
    event.preventDefault();
    var $currentTarget = $(event.currentTarget);

    var attrs = $currentTarget.parent().serializeJSON();
    var list = new (this.model.lists().model)();
    list.set(attrs.list);

    var that = this;

    (this.model.lists()).create(list);
  },

  deleteList: function (event) {
    event.preventDefault();
    var $currentTarget = $(event.currentTarget);

    var id = $currentTarget.data("id");
    var list = this.model.lists().get(id);
    var that = this;

    list.destroy();
  }
});