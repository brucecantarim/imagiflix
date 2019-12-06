$(document).ready(function(){
  $('.movies-list').slick({
    variableWidth: true,
    prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>'
  });

  const URL = "https://api.themoviedb.org/3";
  const IMAGEURL = "https://image.tmdb.org/t/p";
  const APIKEY = "8393542f0d97802c12d24480ce1058c4";

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
    vote_average = 1;
    
    let titleEl = document.getElementById('featured-title');
    titleEl.innerHTML = title;

    let scoreEl = document.getElementById('featured-score');
    scoreEl.innerHTML = vote_average;
    setRatingColor(scoreEl, vote_average);

    let imageEl = document.getElementById('featured-image');
    imageEl.style.backgroundImage = `url(${IMAGEURL}/original/${backdrop_path})`;
  };

  const getFeaturedMovie = () => {
   fetch(`${URL}/discover/movie?api_key=${APIKEY}&language=pt-BR&sort_by=popularity.desc`)
    .then( res => res.json() )
    .then( data => setFeaturedMovie(data.results[0]))
    .catch(err => console.log(`ERRO: ${err}`));
  };

  getFeaturedMovie();
});