'use strict';
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
let btnOpenModal = document.querySelectorAll('.show-modal');
console.log(btnOpenModal);

//without functions
// for (let i = 0; i < btnOpenModal.length; i++) {
//   btnOpenModal[i].addEventListener('click', function () {
//     modal.classList.remove('hidden');
//     overlay.classList.remove('hidden');
//   });
// }

/**
 * Using the same function inmultiple eventListeners
 * 1. Write the function seperate
 * 2. Pass to multiple event listeners
 */

//1
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

//2
for (let i = 0; i < btnOpenModal.length; i++) {
  btnOpenModal[i].addEventListener('click', openModal);
}

//1
const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//2
btnCloseModal.addEventListener('click', closeModal);
// overlay.addEventListener('click', closeModal);

//Respond to keyboard events (Global events)
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
