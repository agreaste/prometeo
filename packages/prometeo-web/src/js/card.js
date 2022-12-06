const Card = (id, name, description, image) => {
    const container = document.createElement('article');
    container.classList.add('card__container');
    container.setAttribute('id', id);

    const img = document.createElement('img');
    img.classList.add('card__image');
    img.src = image;
    img.alt = description;

    const wrapper = document.createElement('div');
    wrapper.classList.add('card__content');

    const title = document.createElement('h4');
    title.classList.add('card__title');
    title.innerHTML = name;

    const abstract = document.createElement('p');
    abstract.classList.add('card__abstract');
    abstract.innerHTML = description;

    wrapper.append(title, abstract);
    container.append(img, wrapper);

    return container;
}

export default Card;