(function(APP){
	'use strict';
	
	APP.SelectedMovies = Backbone.Collection.extend({
		model : APP.Movie,

		localStorage : new Backbone.LocalStorage('Movie')
	});
})(APP);