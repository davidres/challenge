(function(){

	'use strict';

	var CONFIG = {
		api_key : 'c6445617d42ba37094ff06ac4923599a',
		URL_MOVIES : 'http://api.themoviedb.org/3/search/movie'
	}

	/*var Configuration = Backbone.Model.extend({
		url: 'http://api.themoviedb.org/3/configuration?&api_key=c6445617d42ba37094ff06ac4923599a',
		defaults : {
			baseURL : '',
			site : '',
			filePath : ''
		}
	});*/

	var Movie = Backbone.Model.extend({
		defaults : {
			title : '', // Movie's name
			overview : '', // Movie's description
			userRate : '', // Movie's rate
			posterPath : '', // Movie's poster
			wasSaw :  false// Was or not saw the movie
		}
	});

	var MovieViewResult = Backbone.View.extend({

		events : {
			'click .addMovie' : 'selectMovie',
			'click .viewCard' : 'viewCard'
		},

		initialize : function () {
			this.templateMVR = Handlebars.compile($('#item-movie-tpl').html());
		},

		render : function () {
			$(this.el).append(this.templateMVR(this.model.toJSON()));
			return this;
		}
	});

	var ListMovies = Backbone.Collection.extend({
		url : CONFIG.URL_MOVIES,

		model : Movie,

		parse : function (response) {
			return response.results;
		}
	});

	var SearchView = Backbone.View.extend({
		el : $('body'),

		events : {
			'click #search' : 'searchMovies'
		},

		initialize : function(){
			this.listMovies = new ListMovies();
			this.listMovies.bind('add', this.appendResult);
			this.render();
		},

		render : function () {
			$(this.el).append('<input id="inputSearch" placeholder="Search movie"/> <input id="search" type="submit"  value="Search"/>');
			$(this.el).append('<ul></ul>');
			return this;
		},

		searchMovies : function (e) {
			var that = this;

			this.listMovies.url += '?api_key=' + CONFIG.api_key + '&query=' + $(this.el).find('#inputSearch').val();

			this.listMovies.fetch({
				success : function (objectData) {
					that.setMoviesList(objectData);
				}
			});
		},

		setMoviesList : function (objectData) {
			var results = objectData.toJSON(),
			that = this;

			_.each(results, function(val){
				var movie = new Movie({
					title : val.title,
					overview : val.overview,
					posterPath : val.poster_path
				});

				that.listMovies.add(movie);
			});
		},

		appendResult : function (item) {
			var itemMovie = new MovieViewResult({
				model : item
			});
			$('ul',this.el).append(itemMovie.render().el)
		}

	});

	var searchView = new SearchView();
})();