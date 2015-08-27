(function(APP){
	'use strict';
	
	APP.SearchView = Backbone.View.extend({

		el : APP.CONFIG.APP_CONTAINER,

		template : Handlebars.compile($('#movie-search').html()),

		events : {
			'click #search' : 'searchMovies',
			'keydown': 'keyAction'
		},

		initialize : function(stringMovie){
			this.searchResults = new APP.SearchResults();
			this.searchResults.on('add', this.appendResult);
			this.searchResults.on('reset', this.clearResult);
			this.render();

			if(stringMovie !== null){
				this.searchMovies(stringMovie);
			}

			if(APP.selectedMovies === undefined){
				APP.selectedMovies = new APP.SelectedMovies();
			}
		},

		render : function () {
			$(this.el).empty().append(this.template());
			return this;
		},

		keyAction: function(e) {
	        var code = e.keyCode || e.which;
	        if(code ==  13) { 
	            this.searchMovies();
	        }
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

			that.searchResults.reset();

			_.each(results, function(val){
				var movie = new APP.Movie({
					title : val.title,
					overview : val.overview,
					posterPath : val.poster_path
				});

				that.searchResults.add(movie);

				//movie.on('change:isFavorite', movie.render, movie);
			});
		},

		appendResult : function (item) {
			var itemMovie = new APP.MovieResultView({
				model : item
			});

			$('.searchResults',this.el).append(itemMovie.render().el);
		},

		clearResult : function (item) {
			$('.searchResults',this.el).empty();
		}

	});
})(APP);