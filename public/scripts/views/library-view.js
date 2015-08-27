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
			this.render();
		},

		render : function () {
			var that = this;

			$(this.el).empty();
			$(that.el).append(that.template(this.collection.toJSON()));
		},

		viewCard : function () {
			var cardView = new APP.CardView({
				model : this.model
			});

			$(APP.CONFIG.APP_CONTAINER).empty().append(cardView.render().el);

			APP.RouterAPP.navigate('card', {trigger : true});
		},

		removeMovie : function () {
			APP.selectedMovies.remove(this.model);
		}
	});
})(APP);