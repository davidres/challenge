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
			var cardView = new CardView({
				model : this.model
			});

			$(CONFIG.APP_CONTAINER).empty().append(cardView.render().el);

			app.navigate('card');
		},

		addMovie : function () {
			console.log("ADD MV");
		}
	});
})(APP);