var StageView = Backbone.View.extend({

    tagName: "div",

    className: "stage-view",

    events: {
        "click .icon":          "open",
        "click .button.edit":   "openEditDialog",
        "click .button.delete": "destroy"
    },

    initialize: function() {
        this.listenTo(this.model, "change", this.render);
    },

    render: function() {
        this.$el.html(this.template(this.model.attributes));
        return this;
    }

});