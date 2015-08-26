(function(APP){
	'use strict';
	
	APP.CardView = Backbone.View.extend({
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
			APP.selectedMovies.add(this.model);	
			this.model.save();
		}
	});
})(APP);