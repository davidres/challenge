(function(){
	'use strict';

	var api_key = 'api_key=c6445617d42ba37094ff06ac4923599a';
	var Configuration = Backbone.Model.extend({
		url: 'http://api.themoviedb.org/3/configuration?&api_key=c6445617d42ba37094ff06ac4923599a',
		defaults : {
			baseURL : '',
			site : '',
			filePath : ''
		}
	});

	var Movie = Backbone.Model.extend({
		defaults : {
			title : '', // Movie's name
			overview : '', // Movie's description
			userRate : '', // Movie's rate
			posterPath : '', // Movie's poster
			wasSaw :  false// Was or not saw the movie
		}
	});

	var ListMovies = Backbone.Collection.extend({
		url : 'http://api.themoviedb.org/3/search/movie',
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
			var listMovies = new ListMovies();
			this.render();
		},

		render : function () {
			$(this.el).append('<input id="inputSearch" placeholder="Search movie"/> <input id="search" type="submit"  value="Search"/>');
			return this;
		},

		searchMovies : function (e) {
			var listMovies = new ListMovies();
			listMovies.url += '?' + api_key + '&query=' + $(this.el).find('#inputSearch').val();


			listMovies.fetch({
				success : function (objectData) {
					var results = objectData.toJSON();

					_.each(results, function(val){

						var movie = new Movie({
							title : val.title,
							overview : val.overview,
							posterPath : val.poster_path
						});

						listMovies.add(movie);
					});

				}
			})
		}

	});

	var searchView = new SearchView();
})();