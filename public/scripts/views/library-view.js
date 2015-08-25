(function(APP){
	'use strict';

	APP.LibraryView = Backbone.View.extend({
		el : APP.CONFIG.APP_CONTAINER,

		library : APP.selectedMovies,

		template : Handlebars.compile($('#movies-library-tpl').html()),

		events : {
			'click .removeMovie' : 'removeMovie',
			'click .viewCard' : 'viewCard'
		},

		initialize : function () {
			this.render();
		},

		render : function () {
			console.log(APP.selectedMovies.toJSON());
			console.log(this.library);
			$(this.el).empty().append(this.template(this.library.toJSON()).render().el);
		},

		viewCard : function () {
			var cardView = new APP.CardView({
				model : this.model
			});

			$(APP.CONFIG.APP_CONTAINER).empty().append(cardView.render().el);

			APP.RouterAPP.navigate('card', {trigger : true});
		},

		removeMovie : function () {
			APP.SelectedMovies.remove(this.model);	
		}
	});
})(APP);