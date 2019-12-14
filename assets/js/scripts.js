$(document).ready(function(){
  $('.movies-list').slick({
    variableWidth: true,
    prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>'
  });

  const URL = "https://api.themoviedb.org/3";
  const IMAGEURL = "https://image.tmdb.org/t/p";
  const APIKEY = "8393542f0d97802c12d24480ce1058c4";

  const $id = elName => document.getElementById(elName);
  const $class = elName => document.querySelector(elName);
  const $classes = elName => document.querySelectorAll(elName);

  const openModal = id => {
    $id('modal').style.display = "grid";
  };

  const closeModal = () => {
    $id('modal').style.display = "none";
  };

  $('.modal__close').on('click', () => closeModal());

  const setRatingColor = (el, score)  => {
    if(score >= 7) {
      el.style.borderColor = "green";
    } else if (score <= 3) {
      el.style.borderColor = "red";
    } else {
      el.style.borderColor = "yellow";
    }
  }

  const setFeaturedMovie = ({ title, vote_average, backdrop_path }) => {
    let titleEl = $id('featured-title');
    titleEl.innerHTML = title;

    let scoreEl = $id('featured-score');
    scoreEl.innerHTML = vote_average;
    setRatingColor(scoreEl, vote_average);

    let imageEl =$id('featured-image');
    imageEl.style.backgroundImage = `url(${IMAGEURL}/original/${backdrop_path})`;
  };

  const setMovie = (elId, { id, title, name, vote_average, poster_path }) => {

    let scoreColor;

    if(vote_average >= 7) {
      scoreColor = "green";
    } else if (vote_average <= 3) {
      scoreColor = "red";
    } else {
      scoreColor = "yellow";
    }

    const movieEl = `
    <div class="movies-item" data-id="${id}">
      <div class="movies-info">
        <i class="far fa-play-circle"></i>
        
        <h3>${ title ? title : name }</h3>

        <div class="rating">
          <div class="rating-rate" style="border-color: ${scoreColor}">${ vote_average }</div>
        </div>
      </div>

      <img src="${ IMAGEURL }/w185/${ poster_path}" alt="">
    </div>
    `;

    $(elId).slick('slickAdd', movieEl);
  };

  const hideEl = elName => {
    const el = $id(elName);
    el.style.display = "none";
  };

  const getMovies = () => {
   fetch(`${URL}/discover/movie?api_key=${APIKEY}&language=pt-BR&sort_by=popularity.desc`)
    .then( res => res.json() )
    .then( data => {
      setFeaturedMovie(data.results[0]);
      let moviesList = data.results;
      moviesList.shift();

      moviesList.map( movie => setMovie('#movies-list', movie) );
    })
    .catch(err => console.log(`ERRO: ${err}`))
    .finally(() => {
      hideEl('loading');
      $('.movies-item').on('click', (e) => {
        openModal(e.currentTarget.dataset.id);
      });
    });
  };

  const getSeries = () => {
    fetch(`${URL}/discover/tv?api_key=${APIKEY}&language=pt-BR&sort_by=popularity.desc`)
     .then( res => res.json() )
     .then( data => {
       data.results.map( serie => setMovie('#series-list', serie) );
     })
     .catch(err => console.log(`ERRO: ${err}`));
   };

  getMovies();
  getSeries();

});