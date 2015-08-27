(function(APP){
	'use strict';
	
	APP.MovieResultView = Backbone.View.extend({

		template : Handlebars.compile($('#item-movie-tpl').html()),

		events : {
			'click .addMovie' : 'addMovie',
			'click .viewCard' : 'viewCard'
		},

		initialize : function () {
		},

		render : function () {
			this.model.set({
				'posterPath' : APP.CONFIG.PATH_IMAGES + this.model.get('posterPath')
			});
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		},

		viewCard : function () {
			var cardView = new APP.CardView({
				model : this.model
			});

			$(APP.CONFIG.APP_CONTAINER).empty().append(cardView.render().el);

			APP.RouterAPP.navigate('card', {trigger : true});
		},

		addMovie : function () {
			this.model.set({
				isFavorite : true
			});
			APP.selectedMovies.add(this.model);	
		}
	});
})(APP);