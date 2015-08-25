(function(APP){ 
	'use strict';
	
	APP.AppView = Backbone.View.extend({

		el : APP.CONFIG.APP_CONTAINER,

		template : Handlebars.compile($('#home-app').html()),

		events : {
			'click .btn-search' : 'search'
		},

		render : function () {
			$(this.el).empty().append(this.template());
			return this;
		},

		search : function () {
			APP.RouterAPP.navigate('search', {trigger : true});
		},

		initialize : function () {
			this.render();
		}
	});
})(APP);