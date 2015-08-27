(function(APP){
	'use strict';
	
	APP.CardView = Backbone.View.extend( {
		el : $(APP.CONFIG.APP_CONTAINER),

		template : Handlebars.compile($("#card-movie-tpl").html()),

		events : {
			'click .addMovie' : 'addMovie'
		},
		
		render : function () {
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		},

		addMovie : function () {
			this.model.set({
				isFavorite : true
			});
			APP.selectedMovies.add(this.model);	
		}
	});
})(APP);