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
			APP.Router.navigate('search', {trigger : true});
		},

		initialize : function () {
			this.render();
		}
	});
})(APP);