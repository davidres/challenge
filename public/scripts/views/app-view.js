(function(APP){ 
	'use strict';
	
	APP.AppView = Backbone.View.extend({

		el : APP.CONFIG.APP_CONTAINER,

		template : Handlebars.compile($('#home-app').html()),

		events : {
			'click .btn-search' : 'search',
			'click .btn-library' : 'libraryView'
		},

		render : function () {
			$(this.el).empty().append(this.template());
			return this;
		},

		search : function () {
			APP.RouterAPP.navigate('search', {trigger : true});
		},

		libraryView : function () {
			APP.RouterAPP.navigate('library', {trigger : true});
		},

		initialize : function () {
			if(!APP.selectedMovies){
				APP.selectedMovies = new APP.SelectedMovies();
			} 
			this.render();
		}
	});
})(APP);