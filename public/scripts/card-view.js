(function(APP){
	'use strict';
	
	APP.CardView = Backbone.View.extend({
		el : $(APP.CONFIG.APP_CONTAINER),

		template : Handlebars.compile($("#card-movie-tpl").html()),
		
		render : function () {
			$(this.el).html(this.template(this.model.toJSON()));
			return this;
		}
	});
})(APP);