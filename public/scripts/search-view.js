(function(APP){
	APP.SearchView = Backbone.View.extend({

		el : APP.CONFIG.APP_CONTAINER,

		template : Handlebars.compile($('#movie-search').html()),

		events : {
			'click #search' : 'searchMovies'
		},

		initialize : function(){
			this.searchResults = new APP.SearchResults();
			this.searchResults.bind('add', this.appendResult);
			this.render();
		},

		render : function () {
			$(this.el).empty().append(this.template());
			return this;
		},

		searchMovies : function (e) {
			var that = this;

			this.searchResults.url += '?api_key=' + APP.CONFIG.API_KEY + '&query=' + $(this.el).find('#inputSearch').val();

			this.searchResults.fetch({
				success : function (objectData) {
					that.setMoviesList(objectData);
				}
			});
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
			var itemMovie = new MovieResultView({
				model : item
			});

			$('.searchResults',this.el).append(itemMovie.render().el);
		}

	});
})(APP);