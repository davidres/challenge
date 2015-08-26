(function(APP){
	'use strict';

	APP.Router =  Backbone.Router.extend({
		routes : {
			'home' : 'homeView',
			'' : 'homeView',
			'search/:query' : 'searchView',
			'search' : 'searchView',
			'card' : 'cardView',
			'library' : 'libraryView'
		},

		searchView : function (query) {
			new APP.SearchView(query);
		},

		cardView : function () {
		},

		homeView : function () {
			new APP.AppView; 
		},

		libraryView : function () {
			new APP.LibraryView;
		}
	});

	Backbone.history.start();
})(APP);