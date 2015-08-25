(function(APP){
	APP.Router = Backbone.Router.extend({
		routes : {
			'search' : 'searchView'
		},

		searchView : function () {
			new APP.SearchView();
		}
	});

	new APP.Router();
	Backbone.history.start();
})(APP);