export const $id = elName => document.getElementById(elName);
export const $class = elName => document.querySelector(`.${elName}`);
export const $classes = elName => document.querySelectorAll(`.${elName}`);

export const hideEl = elName => {
    const el = $id(elName);
    el.style.display = "none";
};

export const showEl = (elName, displayType = 'block') => {
    const el = $id(elName);
    el.style.display = displayType;
};