(function(APP){
	'use strict';
	
	APP.SelectedMovies = Backbone.Collection.extend({
		url : APP.CONFIG.URL_MOVIES,
		
		model : APP.Movie,

		localStorage : new Backbone.LocalStorage('Movie')
	});
})(APP);