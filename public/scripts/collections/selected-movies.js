(function(APP){
	'use strict';
	
	APP.SelectedMovies = Backbone.Collection.extend({
		model : APP.Movie,
	});
})(APP);