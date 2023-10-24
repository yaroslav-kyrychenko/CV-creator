'use strict';

const btnListExpand = document.querySelectorAll('.btn-expand');

const inputName = document.querySelector('.input-name');
const resumeName = document.querySelector('.resume-name');

btnListExpand.forEach((btnExpand) => {
  btnExpand.addEventListener('click', () => {
    const sectionConfigHeaderEl = btnExpand.parentElement;
    const sectionConfigContentsEl = sectionConfigHeaderEl.nextElementSibling;
    sectionConfigContentsEl.classList.toggle('hidden');
  });
});

inputName.addEventListener('focusin', () => {
  resumeName.classList.add('active-resume-element');
});

inputName.addEventListener('focusout', () => {
  resumeName.classList.remove('active-resume-element');
});

inputName.addEventListener('keydown', (e) => {
  if (e.key.length === 1 || e.key === 'Backspace')
    if (e.key.match('[a-zA-Z]') && inputName.value.length > 0) {
      setTimeout(() => {
        resumeName.textContent = inputName.value;
        console.log(inputName.value);
      }, 100);
    }
});
