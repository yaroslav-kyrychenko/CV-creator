'use strict';

const btnListExpand = document.querySelectorAll('.btn-expand');

btnListExpand.forEach((btnExpand) => {
  btnExpand.addEventListener('click', () => {
    const sectionConfigHeaderEl = btnExpand.parentElement;
    const sectionConfigContentsEl = sectionConfigHeaderEl.nextElementSibling;
    sectionConfigContentsEl.classList.toggle('hidden');
    console.log(sectionConfigContentsEl);
  });
});
