(function(APP){
	APP.Router = Backbone.Router.extend({
		routes : {
			'search' : 'searchView',
			'card' : 'cardView'
		},

		searchView : function () {
			new APP.SearchView();
		},

		cardView : function () {
		}
	});
	Backbone.history.start();
})(APP);