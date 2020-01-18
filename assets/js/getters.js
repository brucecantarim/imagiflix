import CONST from './constants';
import { hideEl, showEl } from './utils';
import { setFeaturedMovie, setMovie, setPosterListener } from './setters';
import { openModal, setModal } from './modal';

export const getTitleInfo = ({ id, type }) => {
    showEl('loading', 'grid');
    fetch(`${CONST.URL}/${type}/${id}${CONST.APISTRING}`)
        .then(res => res.json())
        .then(data => {
            setModal(data);
        })
        .catch(err => console.log(`ERRO: ${err}`))
        .finally(() => {
            hideEl('loading');
            openModal();
        });
};

export const getMovies = () => {
    showEl('loading', 'grid');
    fetch(`${CONST.URL}/discover/movie${CONST.APISTRING}&sort_by=popularity.desc`)
        .then(res => res.json())
        .then(data => {
            setFeaturedMovie(data.results[0]);
            let moviesList = data.results;
            moviesList.shift();

            moviesList.map(movie => setMovie('#movies-list', movie));
        })
        .catch(err => console.log(`ERRO: ${err}`))
        .finally(() => {
            hideEl('loading');
            $('.movie').on('click', (e) => {
                const elData = e.currentTarget.dataset;
                getTitleInfo(elData);
            });
        });
};

export const getSeries = () => {
    showEl('loading', 'grid');
    fetch(`${CONST.URL}/discover/tv${CONST.APISTRING}&sort_by=popularity.desc`)
        .then(res => res.json())
        .then(data => {
            data.results.map(serie => setMovie('#series-list', serie));
        })
        .catch(err => console.log(`ERRO: ${err}`))
        .finally(() => {
            hideEl('loading');
            $('.serie').on('click', (e) => {
                const elData = e.currentTarget.dataset;
                getTitleInfo(elData);
            });
        });
};

export const getLibrary = () => {
    getMovies();
    getSeries();
};