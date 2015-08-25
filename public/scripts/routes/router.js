(function(APP){
	'use strict';

	APP.Router =  Backbone.Router.extend({
		routes : {
			'search' : 'searchView',
			'card' : 'cardView',
			'home' : 'homeView',
		},

		searchView : function () {
			new APP.SearchView;
		},

		cardView : function () {
		},

		homeView : function () {
			new APP.AppView; 
		}
	});

	Backbone.history.start();
})(APP);