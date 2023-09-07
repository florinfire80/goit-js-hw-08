import Vimeo from '@vimeo/player';
import throttle from 'lodash.throttle';

// Obțin elementul iframe pentru player-ul Vimeo
const iframe = document.querySelector('iframe');

// Inițializez player-ul Vimeo
const vimeoPlayer = new Vimeo(iframe);

// Funcția throttle pentru actualizarea timpului de redare cu o frecvență de maxim o dată pe secundă
const updateLocalStorageThrottled = throttle(seconds => {
  localStorage.setItem('videoplayer-current-time', seconds.toString());
}, 1000);

// Verific dacă există un moment de redare salvat în spațiul de stocare local
const savedTime = localStorage.getItem('videoplayer-current-time');
if (savedTime) {
  // Setez timpul de redare la momentul salvat
  vimeoPlayer
    .setCurrentTime(parseFloat(savedTime))
    .then(() => {
      // După ce a fost setat timpul, pornesc redarea
      vimeoPlayer.play();
    })
    .catch(error => {
      console.error('Nu s-a putut seta timpul de redare:', error);
    });
}

// Ascult evenimentul 'timeupdate' pentru a actualiza timpul curent de redare
vimeoPlayer.on('timeupdate', ({ seconds }) => {
  // Utilizez funcția throttle pentru a actualiza timpul în spațiul de stocare
  updateLocalStorageThrottled(seconds);
});
