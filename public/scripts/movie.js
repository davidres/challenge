(function(APP){
	APP.Movie = Backbone.Model.extend({
		defaults : {
			title : '', // Movie's name
			overview : '', // Movie's description
			userRate : '', // Movie's rate
			posterPath : '', // Movie's poster
			isFavorite : false
		}
	});
})(APP);