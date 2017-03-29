//jshint esversion:6
import Elements from './elements'
import {getAverage, bindEvent} from './helpers'


export default {

  //CREATES A TABLE OF THE MovieDb IN THE DB AS THE INTERFACE FOR THE USER TO NAVIGATE
  //CALLED EACH TIME A NEW MOVIE IS ADDED
createMovieList(movieArr) {
  Elements.cardContainer.innerHTML = '';
    for(let movie of movieArr) {
      Elements.cardContainer.innerHTML +=
    `<div class="column col-3 movie-card-container">
       <div class="card">
          <div class="card-image">
            <img class="img-responsive card-movie-cover">
          </div>
          <div class="card-header">
            <h4 class="card-title card-movie-title"></h4>
            <h6 class="card-meta card-movie-year"></h6>
          </div>
          <div class="card-body card-movie-genre"></div>
          <div class="card-footer">
            <div class="bar">
              <div class="bar-item card-movie-rating"></div>
            </div>
          </div>
      </div>
    </div>`;
    }

    // Sets values for each movie inside card elements
    for(let i = 0; i < movieArr.length; i++) {
        Elements.cardMovieCover[i].src = movieArr[i].image || 'dist/pics/movie-placeholder.svg';
        Elements.cardMovieTitle[i].innerHTML = movieArr[i].title;
        Elements.cardMovieYear[i].innerHTML = movieArr[i].year;
        Elements.cardMovieRating[i].style.width = `${getAverage(movieArr[i].ratings)* 10}%`;
        Elements.cardMovieRating[i].innerHTML = `${getAverage(movieArr[i].ratings)}`;
        for (let genre of movieArr[i].genres) {
          Elements.cardMovieGenre[i].innerHTML +=  `<label class="chip genre-chip">${genre}</label>`;
        }
    }
  },

  // Opens sidebar for selected movie
  openMovieView(index) {
    Elements.moviePreview.style.width = "600px";
    Elements.modalTitle.innerHTML = Elements.cardMovieTitle[index].innerHTML;
    Elements.modalYear.innerHTML = Elements.cardMovieYear[index].innerHTML;
    Elements.modalPoster.src = Elements.cardMovieCover[index].src;
    Elements.modalGenres.innerHTML = Elements.cardMovieGenre[index].innerHTML;
    Elements.modalRating.innerHTML = Elements.cardMovieRating[index].innerHTML;
    Elements.ratingCirle.className = `c100 p${parseInt(Elements.modalRating.innerHTML) * 10}`;
  },

  // Closes sidebar for current movie
  closeMovieView() {
    Elements.moviePreview.style.width = "0";
  },

  // Displays edit modal for current movie
  editMovieModal() {
    let movieGenres = Array.from(Elements.modalGenres.childNodes);
    let genreChips = Array.from(Elements.genreEditChip);
    Elements.editModal.classList.add('active');
    Elements.newRatingSpan.innerHTML = Elements.modalRating.innerHTML;
    Elements.newRatingCircle.classList = Elements.ratingCirle.classList;
    Elements.ratingSlider.value = 0;

    // Clears any active states if user has selected genres without submiting them
    genreChips.forEach(chip => {
      if (chip.classList.contains('active'))
      chip.classList.remove('active');
    });

    // Adds active state to current movie's genres
    movieGenres.forEach(genre => {
      genreChips.map(chip => {
        if (chip.innerHTML === genre.innerHTML)
        chip.classList.add('active');
      });
    });
  },

  // Display new movie genres and rating after editing
  changeMovieHTML() {
    let movieGenres = Array.from(Elements.modalGenres.childNodes);
    let genreChips = Array.from(Elements.genreEditChip);
    Elements.editModal.classList.remove('active');
    Elements.modalGenres.innerHTML = '';
    genreChips.forEach(chip => {
        if (chip.classList.contains('active')) {
          Elements.modalGenres.innerHTML +=  `<label class="chip genre-chip">${chip.innerHTML}</label>`;
        }
      });
      for (let i = 0; i < Elements.cardMovieTitle.length; i++) {
        if (Elements.cardMovieTitle[i].innerHTML === Elements.modalTitle.innerHTML) {
          Elements.cardMovieGenre[i].innerHTML = Elements.modalGenres.innerHTML;
          }
        }

        // Rating changes to go here
  },

  // Close current active modal
  closeActiveModal(i) {
    Elements.modals[i].classList.remove('active');
  },

  // Display function for top rated and worst rated
  displayMovie(movie) {
    let titleCardArr = Array.from(Elements.cardMovieTitle);
      titleCardArr.filter((title, i) =>
        movie.title === title.innerHTML
        ? Elements.movieCardContainer[i].style.display = "block"
        : Elements.movieCardContainer[i].style.display = "none"
    );
  },
  // Display function used to display by genre or year
  displayMovies(arr) {
    let titleCardArr = Array.from(Elements.cardMovieTitle);
    let movieTitleArr = arr.map(movie =>
      movie.title
    );
      titleCardArr.filter((title, i) =>
        movieTitleArr.includes(title.innerHTML)
        ? Elements.movieCardContainer[i].style.display = "block"
        : Elements.movieCardContainer[i].style.display = "none"
    );
  },

  // Display movie modal for adding movie
  displayNewMovieModal() {
    Elements.newMovieModal.classList.add('active');
    Elements.movieTitle.focus();
    Elements.movieTitle.select();
  },

  // Visually changes rating circle as slider value changes
  displayRating() {
      Elements.newRatingSpan.innerHTML = this.value;
      Elements.newRatingCircle.className = `c100 p${this.value * 10}`;
  },
  // Shows input field for year search
  displayYearInput() {
    Elements.movieYearInput.classList.remove('hide');
    Elements.movieYearInput.focus();
    Elements.movieYearInput.select();
    bindEvent(document.body, e => {
      if (e.target !== this) {
        Elements.movieYearInput.classList.add('hide');
      }
    });
  },

  // Display all movie cards
  displayAllMovies() {
    let movieCardArr = Array.from(Elements.movieCardContainer);
    return movieCardArr.forEach(card =>
      card.style.display = "block"
    );
  },

  //Prevents blank space as first character in all input fields
  blockWhiteSpace() {
  for (let input of Elements.inputs) {
    input.addEventListener("keydown", function(event) {
      if (event.which === 32 && event.target.selectionStart === 0) {
          event.preventDefault();
        }
      });
    }
  },

  // Renders HTML for new movie
  renderNewMovie (newMovie, i) {
    const movieCard = document.createElement('div');
    movieCard.setAttribute('class', 'column col-3 movie-card-container');
    movieCard.innerHTML = `<div class="card">
          <div class="card-image">
            <img class="img-responsive card-movie-cover">
          </div>
          <div class="card-header">
            <h4 class="card-title card-movie-title"></h4>
            <h6 class="card-meta card-movie-year"></h6>
          </div>
          <div class="card-body card-movie-genre"></div>
          <div class="card-footer">
            <div class="bar">
              <div class="bar-item card-movie-rating"></div>
            </div>
          </div>
      </div>
    </div>`;

    Elements.cardContainer.appendChild(movieCard);

    Elements.cardMovieCover[i].src = newMovie.image || 'dist/pics/movie-placeholder.svg';
    Elements.cardMovieTitle[i].innerHTML = newMovie.title;
    Elements.cardMovieYear[i].innerHTML = newMovie.year;
    Elements.cardMovieRating[i].style.width = `${getAverage(newMovie.ratings)* 10}%`;
    Elements.cardMovieRating[i].innerHTML = `${getAverage(newMovie.ratings)}`;
    for (let genre of newMovie.genres) {
      Elements.cardMovieGenre[i].innerHTML +=  `<label class="chip">${genre}</label>`;
    }

    Elements.newMovieModal.classList.remove('active');
  },

  // Previews genres for user when editing movie
  previewGenres(genre) {
        if (!genre.classList.contains('active')) {
           genre.classList.add('active');
        }
        else {
          genre.classList.remove('active');
        }
    }

};
