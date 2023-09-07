// Add imports above this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css'; // Importăm și CSS-ul
import { galleryItems } from './gallery-items';
// Change code below this line

import { galleryItems } from './gallery-items.js';

document.addEventListener('DOMContentLoaded', function () {
  const listEl = document.querySelector('.gallery');

  // Setez listStyle la "none" pentru a elimina marcajele de listă (bulinele)
  listEl.style.listStyle = 'none';

  // Creez elemente 'li' pentru fiecare element din galleryItems
  galleryItems.forEach(item => {
    const listItemEl = document.createElement('li');
    listItemEl.classList.add('gallery__item');
    listItemEl.innerHTML = `<a class="gallery__link" href="${item.original}">
      <img
        class="gallery__image"
        src="${item.preview}"
        alt="${item.description}"
      />
    </a>`;
    listEl.appendChild(listItemEl);
  });

  const lightbox = new SimpleLightbox('.gallery a', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && lightbox) {
      lightbox.close();
    }
  });

  console.log(galleryItems);
});
