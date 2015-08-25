(function(APP){ 
	APP.AppView = Backbone.View.extend({

		el : APP.CONFIG.APP_CONTAINER,

		template : Handlebars.compile($('#home-app').html()),

		events : {
			'click .btn-search' : 'search'
		},

		render : function () {
			$(this.el).append(this.template());
			return this;
		},

		search : function () {
			APP.Router.navigate('search', {trigger : false});
		},

		initialize : function () {
			new APP.Router();
			this.render();
		}
	});
})(APP);