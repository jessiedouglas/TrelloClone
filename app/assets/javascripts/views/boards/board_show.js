TrelloClone.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST["boards/show"],

  events: {
    "click .add-list": "addList",
    "click .delete-list": "deleteList",
    "click": "toggleNew"
  },

  initialize: function () {
    this.listenTo(this.model, "sync destroy add", this.render);
    this.listenTo(this.model.lists(), "add remove", this.render);
  },

  render: function () {
    var renderedContent = this.template({
      board: this.model
    });

    this.$el.html(renderedContent);

    this.renderCards();
    this.renderNew();

    this.$("#sortable").sortable(this.sortableObj());
    return this;
  },

  renderCards: function () {
    var that = this;
    $("li.list").each(function () {
      var listId = $(this).data("id");
      var list = that.model.lists().get(listId);

      var cardIndex = new TrelloClone.Views.CardsIndex({
        collection: list.cards()
      });

      that.addSubview("li.list" + listId, cardIndex);
    });
  },

  renderNew: function () {
    var newDiv = '<div class="new">';
    this.$el.append(newDiv);
    var newListsView = new TrelloClone.Views.ListsNew({
      board: this.model
    });

    this.addSubview(".new", newListsView);
  },

  addList: function (event) {
    event.preventDefault();
    var $currentTarget = $(event.currentTarget);

    var attrs = $currentTarget.parent().serializeJSON();

    (this.model.lists()).create(attrs, {
      wait: true,
      success: function () {
        console.log("list created!");
      },
      failure: function () {
        console.log("something bad happened...")
      },
      errors: function () {
        console.log("something else bad happened...")
      }
    });
  },

  deleteList: function (event) {
    event.preventDefault();
    var $currentTarget = $(event.currentTarget);

    var id = $currentTarget.data("id");
    var list = this.model.lists().get(id);
    var that = this;

    list.destroy();
  },

  sortableObj: function () {
    var lists = this.model.lists()
    return {
      update: function (event, ui) {
        var data = $(this).sortable('serialize');
        console.log(this)
        console.log(data)

        data = data.split("&list[]=");
        data[0] = data[0].slice(7);

        var that = this;

        data.forEach( function (id, index) {
          var list = lists.get(id);
          list.save({ ord: index }, { patch: true });
        });

        console.log(lists);
      }
    }
  },

  toggleNew: function (event) {
    if (!($(event.target).hasClass("card-new") || $(event.target).hasClass("new-card"))) {
      $(".new-card").parent().remove();

      $(".list").each(function () {
        if ($(this).find(".card-new").length === 0) {
          var newLink = '<li><a href="#" class="card-new">New card</a></li>'
          $(this).find(".cards-index").append(newLink);
        }
      });
    }
  }
});