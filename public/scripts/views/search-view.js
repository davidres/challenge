(function(APP){
	'use strict';
	
	APP.SearchView = Backbone.View.extend({

		el : APP.CONFIG.APP_CONTAINER,

		template : Handlebars.compile($('#movie-search').html()),

		events : {
			'click #search' : 'searchMovies'
		},

		initialize : function(stringMovie){
			this.searchResults = new APP.SearchResults();
			this.searchResults.bind('add', this.appendResult);
			this.render();

			if(stringMovie !== null){
				this.searchMovies(stringMovie);
			}
		},

		render : function () {
			$(this.el).empty().append(this.template());
			return this;
		},

		searchMovies : function (stringMovie) {
			var _stringMovie, that = this;
			
			if(typeof stringMovie === 'string'){
				_stringMovie = stringMovie;
			} else{
				_stringMovie = $(this.el).find('#inputSearch').val();
			}

			this.searchResults.url += '?api_key=' + APP.CONFIG.API_KEY + '&query=' + _stringMovie;

			this.searchResults.fetch({
				success : function (objectData) {
					that.setMoviesList(objectData);
				},

				error : function (error) {

				}
			});

			APP.RouterAPP.navigate('search/' + _stringMovie);
		},

		setMoviesList : function (objectData) {
			var results = objectData.toJSON(),
			that = this;

			_.each(results, function(val){
				var movie = new APP.Movie({
					title : val.title,
					overview : val.overview,
					posterPath : val.poster_path
				});

				that.searchResults.add(movie);
			});
		},

		appendResult : function (item) {
			var itemMovie = new APP.MovieResultView({
				model : item
			});

			$('.searchResults',this.el).append(itemMovie.render().el);
		}

	});
})(APP);