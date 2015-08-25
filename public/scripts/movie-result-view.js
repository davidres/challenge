(function(APP){
	APP.MovieResultView = Backbone.View.extend({

		events : {
			'click .addMovie' : 'addMovie',
			'click .viewCard' : 'viewCard'
		},

		initialize : function () {
			this.template = Handlebars.compile($('#item-movie-tpl').html());
		},

		render : function () {
			$(this.el).append(this.template(this.model.toJSON()));
			return this;
		},

		viewCard : function () {
			var cardView = new APP.CardView({
				model : this.model
			});

			$(APP.CONFIG.APP_CONTAINER).empty().append(cardView.render().el);

			APP.Router.navigate('card', {trigger : true});
		},

		addMovie : function () {
			console.log("ADD MV");
		}
	});
})(APP);