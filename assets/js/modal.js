import CONST from './constants';
import { $id, $class } from './utils';
import { getTitleInfo } from './getters';


export const openModal = () => {
    $id('modal').style.display = "grid";
    setTimeout(() => {
        $id('modal').style.opacity = 1;
    }, 100);
};

export const closeModal = () => {
    $id('modal').style.opacity = 0;
    setTimeout(() => {
        $id('modal').style.display = "none";
    }, 300);
};

export const setModalListeners = () => {
    $class('modal__close').addEventListener('click', () => {
        closeModal();
    });
};

export const setModal = ({ title, original_title, overview, poster_path, vote_average, runtime, homepage }) => {

    const modalEl = `
        <img src="${ CONST.IMAGEURL }/original${poster_path}" alt="" class="modal__poster">
        <div class="modal__info">
            <i class="far fa-times-circle modal__close"></i>
            <h2 class="modal__title">${title}</h2>
            <small class="modal__original-title">${original_title}</small>
            <p class="modal__description">${overview}</p>
            <div class="modal__data-container">
                <div class="rating-rate modal__score">${vote_average}</div>
                <div class="modal__duration">${runtime}min</div>
            </div>
            ${
                homepage ? 
                    `<a href="${homepage}" class="modal__website">Site oficial</a>` 
                    : ''
            }
        </div>
    `;

    $id('modal').innerHTML = modalEl;

    setModalListeners();
};