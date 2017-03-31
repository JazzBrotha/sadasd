(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function () {

    // Binds close button on every modal to close the respective modal
    var modalCloseButtonArr = Array.from(_elements2.default.modalCloseButton);
    modalCloseButtonArr.forEach(function (button, i) {
        (0, _helpers.bindEvent)(button, function () {
            _view2.default.closeActiveModal(i);
        });
    });

    // Binds button to open modal for adding new movie
    (0, _helpers.bindEvent)(_elements2.default.newMovieButton, _view2.default.displayNewMovieModal);

    // Handling of new movie
    (0, _helpers.bindEvent)(_elements2.default.movieCreator, function (e) {
        e.preventDefault();
        var newMovie = new _helpers.Movie(_elements2.default.movieTitle.value, parseInt(_elements2.default.movieYear.value), _elements2.default.movieGenres.value.split(','), _elements2.default.movieCover.value);
        var index = _model2.default.addMovie(newMovie);
        _view2.default.renderNewMovie(newMovie, index);
        (0, _helpers.bindEvent)(_elements2.default.movieCardContainer[index], function () {
            _view2.default.openMovieView(index);
        });
        _view2.default.displayAllMovies();
    }, 'submit');

    // Binding top rated
    (0, _helpers.bindEvent)(_elements2.default.topRatedLink, function () {
        var movie = _model2.default.getTopRatedMovie();
        _view2.default.displayMovie(movie);
    });

    // Bind worst rated
    (0, _helpers.bindEvent)(_elements2.default.worstRatedLink, function () {
        var movie = _model2.default.getWorstRatedMovie();
        _view2.default.displayMovie(movie);
    });

    // Call view function to display all movies
    (0, _helpers.bindEvent)(_elements2.default.allMoviesLink, _view2.default.displayAllMovies);

    // Create click functions for all menu genre links
    var genreLinkArr = Array.from(_elements2.default.genreLinkName);
    genreLinkArr.forEach(function (link) {
        (0, _helpers.bindEvent)(link, function () {
            var genre = this.innerHTML.trim();
            var movieArr = _model2.default.getMoviesByGenre(genre);
            _view2.default.displayMovies(movieArr);
        });
    });

    // Creating click function for year filter on menu
    (0, _helpers.bindEvent)(_elements2.default.yearSort, _view2.default.displayYearInput);
    (0, _helpers.bindEvent)(_elements2.default.movieYearInput, function () {
        var year = this.value;
        var movieArr = _model2.default.getMoviesThisYear(year);
        _view2.default.displayMovies(movieArr);
    }, 'keyup');

    // Close movie preview when clicking on button
    (0, _helpers.bindEvent)(_elements2.default.closeMovieButton, _view2.default.closeMovieView);

    // Click function to open movie sidebar view for all current movies in db
    var movieCardArr = Array.from(_elements2.default.movieCardContainer);
    movieCardArr.forEach(function (card, index) {
        (0, _helpers.bindEvent)(card, function () {
            _view2.default.openMovieView(index);
        });
    });

    // Open edit movie view
    (0, _helpers.bindEvent)(_elements2.default.editButton, _view2.default.editMovieModal);

    // Bind rating slider changes when editing movie
    (0, _helpers.bindEvent)(_elements2.default.ratingSlider, _view2.default.displayRating, 'input');

    // Preview active genres when editing movie
    var genreChips = Array.from(_elements2.default.genreEditChip);
    genreChips.forEach(function (chip) {
        (0, _helpers.bindEvent)(chip, function () {
            _view2.default.previewGenres(this);
        });
    });

    // Submit changes to edited movie
    (0, _helpers.bindEvent)(_elements2.default.submitEditButton, function () {
        var genres = [];
        var rating = void 0;
        var title = _elements2.default.modalTitle.innerHTML;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = _elements2.default.genreEditChip[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var activeGenres = _step.value;

                if (activeGenres.classList.contains('active')) {
                    genres.push(activeGenres.innerHTML.trim());
                }
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        if (!_elements2.default.newRatingCircle.innerHTML.includes('.')) {
            rating = parseInt(_elements2.default.ratingSlider.value);
        }

        _model2.default.editMovie(genres, rating, title);
        var movieIndex = (0, _helpers.getMovieIndex)(title);
        _view2.default.changeMovieHTML(movieIndex);
    });
};

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _elements = require('./elements');

var _elements2 = _interopRequireDefault(_elements);

var _view = require('./view');

var _view2 = _interopRequireDefault(_view);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./elements":2,"./helpers":3,"./model":5,"./view":7}],2:[function(require,module,exports){
'use strict';

module.exports = {
    allMoviesLink: document.getElementById('all-movies-link'),
    cardBody: document.getElementsByClassName('card-body'),
    cardContainer: document.getElementById('card-container'),
    cardMovieCover: document.getElementsByClassName('card-movie-cover'),
    cardMovieGenre: document.getElementsByClassName('card-movie-genre'),
    cardMovieRating: document.getElementsByClassName('card-movie-rating'),
    cardMovieTitle: document.getElementsByClassName('card-movie-title'),
    cardMovieYear: document.getElementsByClassName('card-movie-year'),
    closeNewMovie: document.getElementById('close-new-movie'),
    closeMovieButton: document.getElementById('close-movie-button'),
    editButton: document.getElementById('edit-button'),
    editModal: document.getElementById('edit-modal'),
    genreChip: document.getElementsByClassName('genre-chip'),
    genreContainer: document.getElementById('genre-container'),
    genreEditChip: document.getElementsByClassName('genre-edit-chip'),
    // genreLabelCount : document.getElementsByClassName('genre-label-count'),
    genreLinkName: document.getElementsByClassName('genre-link-name'),
    // genreSuccess : document.getElementById('genre-success'),
    inputs: document.getElementsByTagName('input'),
    listGenre: document.getElementsByClassName('list-genre'),
    listRating: document.getElementsByClassName('list-rating'),
    modalCloseButton: document.getElementsByClassName('modal-close-button'),
    modalGenres: document.getElementById('modal-movie-genres'),
    modalOpener: document.getElementsByClassName('modal-opener'),
    modalPoster: document.getElementById('modal-movie-poster'),
    modalRating: document.getElementById('modal-movie-rating'),
    modals: document.getElementsByClassName('modal'),
    modalTitle: document.getElementById('modal-movie-title'),
    modalYear: document.getElementById('modal-movie-year'),
    movieCards: document.getElementsByClassName('card'),
    movieCardContainer: document.getElementsByClassName('movie-card-container'),
    movieCover: document.forms.movieCreator.cover,
    movieCreator: document.forms.movieCreator,
    movieGenreInput: document.forms.movieGenreInput,
    movieGenres: document.forms.movieCreator.genres,
    movieModal: document.getElementById('movie-modal'),
    moviePreview: document.getElementById('mySidenav'),
    movieResult: document.getElementById('movie-result'),
    movieTitle: document.forms.movieCreator.title,
    movieYear: document.forms.movieCreator.year,
    movieYearInput: document.getElementById('movie-year-input'),
    newMovieButton: document.getElementById('new-movie-button'),
    newMovieModal: document.getElementById('new-movie-modal'),
    newRatingCircle: document.getElementById('new-rating-circle'),
    newRatingSpan: document.getElementById('new-rating-span'),
    ratingButton: document.getElementsByClassName('rating-button'),
    ratingCirle: document.getElementById('rating-circle'),
    ratingModal: document.getElementById('rating-modal'),
    ratingSlider: document.getElementById('rating-slider'),
    ratingSort: document.getElementById('rating-sort'),
    submitEditButton: document.getElementById('submit-edit-button'),
    titleSort: document.getElementById('title-sort'),
    topRatedLink: document.getElementById('top-rated-link'),
    worstRatedLink: document.getElementById('worst-rated-link'),
    yearSort: document.getElementById('year-sort')
};

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getAverage = getAverage;
exports.Movie = Movie;
exports.bindEvent = bindEvent;
exports.parseMovies = parseMovies;
exports.getMovieIndex = getMovieIndex;
exports.blockWhiteSpace = blockWhiteSpace;
exports.checkMovieImage = checkMovieImage;

var _elements = require('./elements');

var _elements2 = _interopRequireDefault(_elements);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SPACE_BAR = 32;

function getAverage(arr) {
    var sum = 0;
    if (arr.length !== 0) {
        for (var i = 0; i < arr.length; i++) {
            sum += arr[i];
        }
        return (sum / arr.length).toFixed(1);
    } else {
        return 'N/A';
    }
}

function Movie(title, year, genres, image) {
    this.title = title;
    this.year = year;
    this.genres = genres;
    this.ratings = [];
    this.image = image || 'dist/pics/movie-placeholder.svg';
}

function bindEvent(target, callback) {
    var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'click';
    var capture = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    target.addEventListener(type, callback, !!capture);
}

function parseMovies() {
    var movieArr = [];
    for (var key in localStorage) {

        // Prevents other values in Firefox to be pushed
        if (typeof localStorage[key] === 'string') movieArr.push(JSON.parse(localStorage[key]));
    }
    return movieArr;
}

function getMovieIndex(title) {
    var movieArr = parseMovies();
    var movie = movieArr.reduce(function (c, p) {
        return c.title === title ? c : p;
    });
    var movieIndex = movieArr.indexOf(movie);
    return movieIndex;
}

//Prevents blank space as first character in all input fields
function blockWhiteSpace() {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
        for (var _iterator = _elements2.default.inputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var input = _step.value;

            bindEvent(input, function (e) {
                if (e.which === SPACE_BAR && e.target.selectionStart === 0) {
                    e.preventDefault();
                }
            }, 'keydown');
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally {
        try {
            if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
            }
        } finally {
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
}

// Prevents page to keep loading if movie cover image is not available
function checkMovieImage(index) {
    setTimeout(function () {
        if (_elements2.default.cardMovieCover[index].height < 1) {
            _elements2.default.cardMovieCover[index].src = 'dist/pics/movie-placeholder.svg';
        }
    }, 2000);
}

},{"./elements":2}],4:[function(require,module,exports){
'use strict';

var _model = require('./model');

var _model2 = _interopRequireDefault(_model);

var _view = require('./view');

var _view2 = _interopRequireDefault(_view);

var _controller = require('./controller');

var _controller2 = _interopRequireDefault(_controller);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Checks if user has an empty storage and sets it if neededC
if (typeof Storage !== "undefined") {
    if (localStorage.getItem("0") === null) {
        _model2.default.setInitialDb();
    }
}
// Informs the user if localStorage is not supported
else {
        alert("Sorry! No Web Storage support available. Please consider switching to another browser.");
    }

var movieArr = (0, _helpers.parseMovies)();
_view2.default.createMovieList(movieArr);
(0, _controller2.default)();
(0, _helpers.blockWhiteSpace)();

},{"./controller":1,"./helpers":3,"./model":5,"./view":7}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _movies = require('./movies');

var _movies2 = _interopRequireDefault(_movies);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {

    //Sets database first time app is run
    setInitialDb: function setInitialDb() {
        _movies2.default.forEach(function (movie, index) {
            localStorage.setItem(JSON.stringify(index), JSON.stringify(movie));
        });
    },
    addMovie: function addMovie(movie) {
        var index = localStorage.length;
        localStorage.setItem(JSON.stringify(index), JSON.stringify(movie));
        return index;
    },
    editMovie: function editMovie(genres, rating, title) {
        for (var key in localStorage) {
            if (typeof localStorage[key] === 'string') {
                var movie = JSON.parse(localStorage[key]);
                if (movie.title === title) {
                    movie.genres = genres;
                    if (rating !== undefined) {
                        movie.ratings.push(rating);
                    }
                    localStorage.setItem(JSON.stringify(key), JSON.stringify(movie));
                }
            }
        }
    },
    getTopRatedMovie: function getTopRatedMovie() {
        var movieArr = (0, _helpers.parseMovies)();
        var multipleRatings = movieArr.filter(function (movie) {
            return movie.ratings.length > 1;
        });
        var topRated = multipleRatings.reduce(function (prevVal, currVal) {
            return (0, _helpers.getAverage)(prevVal.ratings) > (0, _helpers.getAverage)(currVal.ratings) ? prevVal : currVal;
        });
        return topRated;
    },
    getWorstRatedMovie: function getWorstRatedMovie() {
        var movieArr = (0, _helpers.parseMovies)();
        var multipleRatings = movieArr.filter(function (movie) {
            return movie.ratings.length > 1;
        });
        var worstRated = multipleRatings.reduce(function (prevVal, currVal) {
            return (0, _helpers.getAverage)(prevVal.ratings) < (0, _helpers.getAverage)(currVal.ratings) ? prevVal : currVal;
        });
        return worstRated;
    },
    getMoviesThisYear: function getMoviesThisYear(movieYear) {
        var movieArr = (0, _helpers.parseMovies)();
        return movieArr.filter(function (movie, index) {
            return movie.year === parseInt(movieYear);
        });
    },
    getMoviesByGenre: function getMoviesByGenre(movieGenre) {
        var movieArr = (0, _helpers.parseMovies)();
        var genreArr = movieArr.filter(function (movie, index) {
            return movie.genres.includes(movieGenre);
        });
        return genreArr;
    }
};

},{"./helpers":3,"./movies":6}],6:[function(require,module,exports){
"use strict";

module.exports = [{
    title: "Dawn of the Planet of the Apes",
    image: "http://api.androidhive.info/json/movies/1.jpg",
    ratings: [8, 7, 6, 5, 10],
    year: 2014,
    genres: ["Action", "Drama", "Sci-Fi"]
}, {
    title: "District 9",
    image: "http://api.androidhive.info/json/movies/2.jpg",
    ratings: [6, 5, 8, 8, 9],
    year: 2009,
    genres: ["Action", "Sci-Fi", "Thriller"]
}, {
    title: "Transformers: Age of Extinction",
    image: "http://api.androidhive.info/json/movies/3.jpg",
    ratings: [5, 5, 3, 2, 7],
    year: 2014,
    genres: ["Action", "Adventure", "Sci-Fi"]
}, {
    title: "X-Men: Days of Future Past",
    image: "http://api.androidhive.info/json/movies/4.jpg",
    ratings: [8, 9, 7, 7],
    year: 2014,
    genres: ["Action", "Sci-Fi", "Thriller"]
}, {
    title: "The Machinist",
    image: "http://api.androidhive.info/json/movies/5.jpg",
    ratings: [7, 7, 8, 8, 6, 6, 7, 8],
    year: 2004,
    genres: ["Drama", "Thriller"]
}, {
    title: "The Last Samurai",
    image: "http://api.androidhive.info/json/movies/6.jpg",
    ratings: [7, 7, 6, 5, 2, 9, 8],
    year: 2003,
    genres: ["Action", "Drama", "History"]
}, {
    title: "The Amazing Spider-Man 2",
    image: "http://api.androidhive.info/json/movies/7.jpg",
    ratings: [7, 5, 3, 2, 8, 9],
    year: 2014,
    genres: ["Action", "Adventure", "Fantasy"]
}, {
    title: "Tangled",
    image: "http://api.androidhive.info/json/movies/8.jpg",
    ratings: [7, 8, 3, 6, 8],
    year: 2010,
    genres: ["Action", "Drama", "Sci-Fi"]
}, {
    title: "Rush",
    image: "http://api.androidhive.info/json/movies/9.jpg",
    ratings: [8, 8, 9, 7],
    year: 2013,
    genres: ["Animation", "Comedy", "Family"]
}, {
    title: "Drag Me to Hell",
    image: "http://api.androidhive.info/json/movies/10.jpg",
    ratings: [6, 6, 7, 7],
    year: 2009,
    genres: ["Horror", "Thriller"]
}, {
    title: "Despicable Me 2",
    image: "http://api.androidhive.info/json/movies/11.jpg",
    ratings: [9, 9, 3, 7, 8],
    year: 2013,
    genres: ["Animation", "Comedy", "Family"]
}, {
    title: "Kill Bill: Vol. 1",
    image: "http://api.androidhive.info/json/movies/12.jpg",
    ratings: [4, 8, 8, 9, 3],
    year: 2003,
    genres: ["Action", "Crime"]
}, {
    title: "A Bug's Life",
    image: "http://api.androidhive.info/json/movies/13.jpg",
    ratings: [7, 7, 7, 5, 5],
    year: 1998,
    genres: ["Animation", "Adventure", "Comedy"]
}, {
    title: "Life of Brian",
    image: "http://api.androidhive.info/json/movies/14.jpg",
    ratings: [9, 9, 4, 5, 8],
    year: 1972,
    genres: ["Comedy"]
}, {
    title: "How to Train Your Dragon",
    image: "http://api.androidhive.info/json/movies/15.jpg",
    ratings: [6, 9, 8, 7, 5, 8],
    year: 2010,
    genres: ["Animation", "Adventure", "Family"]
}];

},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _elements = require('./elements');

var _elements2 = _interopRequireDefault(_elements);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//jshint esversion:6
exports.default = {
    createMovieList: function createMovieList(movieArr) {
        _elements2.default.cardContainer.innerHTML = '';
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = movieArr[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var movie = _step.value;

                _elements2.default.cardContainer.innerHTML += '<div class="column col-3 movie-card-container">\n       <div class="card">\n          <div class="card-image">\n            <img class="img-responsive card-movie-cover">\n          </div>\n          <div class="card-header">\n            <h4 class="card-title card-movie-title"></h4>\n            <h6 class="card-meta card-movie-year"></h6>\n          </div>\n          <div class="card-body card-movie-genre"></div>\n          <div class="card-footer">\n            <div class="bar">\n              <div class="bar-item card-movie-rating"></div>\n            </div>\n          </div>\n      </div>\n    </div>';
            }

            // Sets values for each movie inside card elements
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }

        for (var i = 0; i < movieArr.length; i++) {
            _elements2.default.cardMovieCover[i].src = movieArr[i].image;
            (0, _helpers.checkMovieImage)(i);
            _elements2.default.cardMovieTitle[i].innerHTML = movieArr[i].title;
            _elements2.default.cardMovieYear[i].innerHTML = movieArr[i].year;
            _elements2.default.cardMovieRating[i].style.width = (0, _helpers.getAverage)(movieArr[i].ratings) * 10 + '%';
            _elements2.default.cardMovieRating[i].innerHTML = '' + (0, _helpers.getAverage)(movieArr[i].ratings);
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
                for (var _iterator2 = movieArr[i].genres[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                    var genre = _step2.value;

                    _elements2.default.cardMovieGenre[i].innerHTML += '<label class="chip genre-chip">' + genre + '</label>';
                }
            } catch (err) {
                _didIteratorError2 = true;
                _iteratorError2 = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
                        _iterator2.return();
                    }
                } finally {
                    if (_didIteratorError2) {
                        throw _iteratorError2;
                    }
                }
            }
        }
    },


    // Opens sidebar for selected movie
    openMovieView: function openMovieView(index) {
        _elements2.default.moviePreview.style.width = "600px";
        _elements2.default.modalTitle.innerHTML = _elements2.default.cardMovieTitle[index].innerHTML;
        _elements2.default.modalYear.innerHTML = _elements2.default.cardMovieYear[index].innerHTML;
        _elements2.default.modalPoster.src = _elements2.default.cardMovieCover[index].src;
        _elements2.default.modalGenres.innerHTML = _elements2.default.cardMovieGenre[index].innerHTML;
        _elements2.default.modalRating.innerHTML = _elements2.default.cardMovieRating[index].innerHTML;
        _elements2.default.ratingCirle.className = 'c100 p' + parseInt(_elements2.default.modalRating.innerHTML) * 10 + ' centered';
    },


    // Closes sidebar for current movie
    closeMovieView: function closeMovieView() {
        _elements2.default.moviePreview.style.width = "0";
    },


    // Displays edit modal for current movie
    editMovieModal: function editMovieModal() {
        var movieGenres = Array.from(_elements2.default.modalGenres.childNodes);
        var genreChips = Array.from(_elements2.default.genreEditChip);
        _elements2.default.editModal.classList.add('active');
        _elements2.default.newRatingSpan.innerHTML = _elements2.default.modalRating.innerHTML;
        _elements2.default.newRatingCircle.classList = _elements2.default.ratingCirle.classList;
        _elements2.default.ratingSlider.value = 0;

        // Clears any active states if user has selected genres without submiting them
        genreChips.forEach(function (chip) {
            if (chip.classList.contains('active')) chip.classList.remove('active');
        });

        // Adds active state to current movie's genres
        movieGenres.forEach(function (genre) {
            genreChips.map(function (chip) {
                if (chip.innerHTML === genre.innerHTML) chip.classList.add('active');
            });
        });
    },


    // Display new movie genres and rating after editing
    changeMovieHTML: function changeMovieHTML(index) {
        var movieGenres = Array.from(_elements2.default.modalGenres.childNodes);
        var genreChips = Array.from(_elements2.default.genreEditChip);
        var movieArr = (0, _helpers.parseMovies)();
        _elements2.default.editModal.classList.remove('active');

        // Update genre for both card and sidebar view
        _elements2.default.modalGenres.innerHTML = '';
        genreChips.forEach(function (chip) {
            if (chip.classList.contains('active')) {
                _elements2.default.modalGenres.innerHTML += '<label class="chip genre-chip">' + chip.innerHTML + '</label>';
            }
        });

        for (var i = 0; i < _elements2.default.cardMovieTitle.length; i++) {
            if (_elements2.default.cardMovieTitle[i].innerHTML === _elements2.default.modalTitle.innerHTML) {
                _elements2.default.cardMovieGenre[i].innerHTML = _elements2.default.modalGenres.innerHTML;
            }
        }

        // Update rating for both card and sidebar view
        _elements2.default.cardMovieRating[index].style.width = (0, _helpers.getAverage)(movieArr[index].ratings) * 10 + '%';
        _elements2.default.cardMovieRating[index].innerHTML = '' + (0, _helpers.getAverage)(movieArr[index].ratings);
        _elements2.default.modalRating.innerHTML = _elements2.default.cardMovieRating[index].innerHTML;
        _elements2.default.ratingCirle.className = 'c100 p' + parseInt(_elements2.default.modalRating.innerHTML) * 10 + ' centered';
    },


    // Close current active modal
    closeActiveModal: function closeActiveModal(i) {
        _elements2.default.modals[i].classList.remove('active');
    },


    // Display function for top rated and worst rated
    displayMovie: function displayMovie(movie) {
        var titleCardArr = Array.from(_elements2.default.cardMovieTitle);
        titleCardArr.filter(function (title, i) {
            return movie.title === title.innerHTML ? _elements2.default.movieCardContainer[i].style.display = "block" : _elements2.default.movieCardContainer[i].style.display = "none";
        });
    },

    // Display function used to display by genre or year
    displayMovies: function displayMovies(arr) {
        var titleCardArr = Array.from(_elements2.default.cardMovieTitle);
        var movieTitleArr = arr.map(function (movie) {
            return movie.title;
        });
        titleCardArr.filter(function (title, i) {
            return movieTitleArr.includes(title.innerHTML) ? _elements2.default.movieCardContainer[i].style.display = "block" : _elements2.default.movieCardContainer[i].style.display = "none";
        });
    },


    // Display movie modal for adding movie
    displayNewMovieModal: function displayNewMovieModal() {
        _elements2.default.newMovieModal.classList.add('active');
        _elements2.default.movieTitle.focus();
        _elements2.default.movieTitle.select();
    },


    // Visually changes rating circle as slider value changes
    displayRating: function displayRating() {
        _elements2.default.newRatingSpan.innerHTML = this.value;
        _elements2.default.newRatingCircle.className = 'c100 p' + this.value * 10 + ' centered';
    },

    // Shows input field for year search
    displayYearInput: function displayYearInput() {
        var _this = this;

        _elements2.default.movieYearInput.classList.remove('hide');
        _elements2.default.movieYearInput.focus();
        _elements2.default.movieYearInput.select();
        (0, _helpers.bindEvent)(document.body, function (e) {
            if (e.target !== _this) {
                _elements2.default.movieYearInput.classList.add('hide');
            }
        });
    },


    // Display all movie cards
    displayAllMovies: function displayAllMovies() {
        var movieCardArr = Array.from(_elements2.default.movieCardContainer);
        return movieCardArr.forEach(function (card) {
            return card.style.display = "block";
        });
    },

    // Renders HTML for new movie
    renderNewMovie: function renderNewMovie(newMovie, i) {
        var movieCard = document.createElement('div');
        movieCard.setAttribute('class', 'column col-3 movie-card-container');
        movieCard.innerHTML = '<div class="card">\n          <div class="card-image">\n            <img class="img-responsive card-movie-cover">\n          </div>\n          <div class="card-header">\n            <h4 class="card-title card-movie-title"></h4>\n            <h6 class="card-meta card-movie-year"></h6>\n          </div>\n          <div class="card-body card-movie-genre"></div>\n          <div class="card-footer">\n            <div class="bar">\n              <div class="bar-item card-movie-rating"></div>\n            </div>\n          </div>\n      </div>\n    </div>';

        _elements2.default.cardContainer.appendChild(movieCard);

        _elements2.default.cardMovieCover[i].src = newMovie.image || 'dist/pics/movie-placeholder.svg';
        _elements2.default.cardMovieTitle[i].innerHTML = newMovie.title;
        _elements2.default.cardMovieYear[i].innerHTML = newMovie.year;
        _elements2.default.cardMovieRating[i].style.width = (0, _helpers.getAverage)(newMovie.ratings) * 10 + '%';
        _elements2.default.cardMovieRating[i].innerHTML = '' + (0, _helpers.getAverage)(newMovie.ratings);
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
            for (var _iterator3 = newMovie.genres[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                var genre = _step3.value;

                _elements2.default.cardMovieGenre[i].innerHTML += '<label class="chip">' + genre + '</label>';
            }
        } catch (err) {
            _didIteratorError3 = true;
            _iteratorError3 = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                    _iterator3.return();
                }
            } finally {
                if (_didIteratorError3) {
                    throw _iteratorError3;
                }
            }
        }

        _elements2.default.newMovieModal.classList.remove('active');
    },


    // Previews genres for user when editing movie
    previewGenres: function previewGenres(genre) {
        if (!genre.classList.contains('active')) {
            genre.classList.add('active');
        } else {
            genre.classList.remove('active');
        }
    }
};

},{"./elements":2,"./helpers":3}]},{},[4])

//# sourceMappingURL=bundle.js.map
