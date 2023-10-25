'use strict';

const btnListExpand = document.querySelectorAll('.btn-expand');

const inputName = document.querySelector('.input-name');
const resumeName = document.querySelector('.resume-name');

const inputResumeMapping = {
  'input-name': 'resume-name',
  'input-birthyear': 'resume-birthyear',
  'input-phone-number': 'resume-phone-number',
  'input-email': 'resume-email',
  'input-social-media-links': 'resume-social-media-links',
  // WRÓĆ POTRZEBNE JEST OBEJŚCIE TAM GDZIE MA BYĆ KILKA TAKICH SAMYCH ELEMENTÓW
  'input-university-name': 'resume-university-name',
  // WRÓĆ DO NAPRAWY TO, ŻE ZMIANY REAGUJĄ TYLKO NA KLAWIATURĘ
  'input-education-level': 'resume-education-level',
  'input-degree-name': 'resume-degree-name',
  // WRÓĆ DO NAPRAWY TO ŻE NIE WYŚWIETLA SIĘ SŁOWO SPECJALNOŚĆ
  'input-specialisation-name': 'resume-specialisation-name',
  'input-degree-start-year': 'resume-degree-start-year',
  'input-degree-end-year': 'resume-degree-end-year',
  'input-company-name': 'resume-company-name',
  'input-position-title': 'resume-position-title',
  'input-job-start-date': 'resume-job-start-date',
  'input-job-end-date': 'resume-job-end-date',
  'input-job-description': 'resume-job-description',
  'input-hard-skill': 'resume-list-item-hard-skills',
  'input-soft-skill': 'resume-list-item-soft-skills',
  'input-certificate': 'resume-list-item-certificate',
};

btnListExpand.forEach((btnExpand) => {
  btnExpand.addEventListener('click', () => {
    const sectionConfigHeaderEl = btnExpand.parentElement;
    const sectionConfigContentsEl = sectionConfigHeaderEl.nextElementSibling;
    sectionConfigContentsEl.classList.toggle('hidden');
  });
});

// WRÓĆ DO PRZEROBIENIA NA NOWY ALGORYTM
inputName.addEventListener('focusin', () => {
  resumeName.classList.add('active-resume-element');
});

inputName.addEventListener('focusout', () => {
  resumeName.classList.remove('active-resume-element');
});

// WRÓĆ DO USUNIĘCIA
inputName.addEventListener('keydown', (e) => {
  if (
    (e.key.length === 1 || e.key === 'Backspace') &&
    inputName.value.length > 0
  ) {
    setTimeout(() => {
      resumeName.textContent = inputName.value;
    }, 100);
  }
});

const setResumeTextContent = function (inputHTMLElement, resumeHTMLElement) {
  inputHTMLElement.addEventListener('keydown', (e) => {
    if (
      (e.key.length === 1 || e.key === 'Backspace') &&
      inputHTMLElement.value.length > 0
    ) {
      setTimeout(() => {
        resumeHTMLElement.textContent = inputHTMLElement.value;
        console.log(resumeHTMLElement.textContent);
      }, 100);
    }
  });
};

const listInputElements = document.querySelectorAll('.input-element');
listInputElements.forEach((inputElement) => {
  const inputClasslist = inputElement.classList;
  for (const inputItem in inputResumeMapping) {
    if (inputClasslist.contains(inputItem)) {
      const inputHTMLElement = document.querySelector(`.${inputItem}`);
      const resumeHTMLElement = document.querySelector(
        `.${inputResumeMapping[inputItem]}`
      );
      setResumeTextContent(inputHTMLElement, resumeHTMLElement);
      break;
    }
  }
});
