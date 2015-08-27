(function(APP){
	'use strict';
	
	APP.SearchResults = Backbone.Collection.extend( {
		url : APP.CONFIG.URL_MOVIES,

		model : APP.Movie,

		parse : function (response) {
			return response.results;
		}
	});
})(APP);