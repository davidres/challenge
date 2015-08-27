(function(APP){
	'use strict';

	APP.LibraryView = Backbone.View.extend({
		el : APP.CONFIG.APP_CONTAINER,

		template : Handlebars.compile($('#movies-library-tpl').html()),

		events : {
			'click .removeMovie' : 'removeMovie',
			'click .viewCard' : 'viewCard'
		},

		initialize : function () {
			this.library = APP.selectedMovies;
			this.render();
		},

		render : function () {
			var that = this;
			$(this.el).empty();
			_.each(this.library.models, function(item){
				$(that.el).append(that.template(item.toJSON()));
			});
		},

		viewCard : function () {
			var cardView = new APP.CardView({
				model : this.model
			});

			console.log(this.model);

			$(APP.CONFIG.APP_CONTAINER).empty().append(cardView.render().el);

			APP.RouterAPP.navigate('card', {trigger : true});
		},

		removeMovie : function () {
			APP.selectedMovies.remove(this.model);	
		}
	});
})(APP);