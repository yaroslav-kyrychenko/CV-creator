'use strict';

const listBtnExpand = document.querySelectorAll('.btn-expand');
const listToggleSwitches = document.querySelectorAll('.toggle-switch');

const inputName = document.querySelector('.input-name');
const resumeName = document.querySelector('.resume-name');

const sectionsMapping = {
  'config-section-personal-details': 'resume-personal-details',
  'config-section-education': 'resume-education',
  'config-section-experience': 'resume-experience',
  'config-section-skills': 'resume-skills',
  'config-section-certificates': 'resume-certificates',
};

const subsectionsMapping = {
  'input-name': 'resume-name',
  'input-birthyear': 'resume-birthyear',
  'input-phone-number': 'resume-phone-number',
  'input-email': 'resume-email',
  'input-social-media-links': 'resume-social-media-links',
  // WRÓĆ POTRZEBNE JEST OBEJŚCIE TAM GDZIE MA BYĆ KILKA TAKICH SAMYCH ELEMENTÓW
  'input-university-name': 'resume-university-name',
  'input-education-level': 'resume-education-level',
  'input-degree-name': 'resume-degree-name',
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

listBtnExpand.forEach((btnExpand) => {
  btnExpand.addEventListener('click', () => {
    const sectionConfigHeaderEl = btnExpand.parentElement;
    const sectionConfigContentsEl = sectionConfigHeaderEl.nextElementSibling;
    sectionConfigContentsEl.classList.toggle('hidden');
  });
});

const listenForChangeInResumeText = function (
  inputHTMLElement,
  resumeHTMLElement
) {
  inputHTMLElement.addEventListener('focusin', () => {
    resumeHTMLElement.classList.add('active-resume-element');
  });

  inputHTMLElement.addEventListener('input', () =>
    debouncedUpdateResumeTextHandler(inputHTMLElement, resumeHTMLElement)
  );

  inputHTMLElement.addEventListener('change', () => {
    updateResumeText(inputHTMLElement, resumeHTMLElement);
  });

  inputHTMLElement.addEventListener('focusout', () => {
    resumeHTMLElement.classList.remove('active-resume-element');
  });
};

const debounce = function (functionDebounced, delayInMilliseconds) {
  let timerId;
  return function (...args) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      functionDebounced(...args);
      timerId = null;
    }, delayInMilliseconds);
  };
};

const updateResumeText = function (inputHTMLElement, resumeHTMLElement) {
  if (inputHTMLElement.getAttribute('type') === 'month') {
    resumeHTMLElement.textContent = getFormattedDate(inputHTMLElement.value);
  } else if (
    resumeHTMLElement.classList.contains('resume-specialisation-name')
  ) {
    resumeHTMLElement.textContent = `Specjalność: ${inputHTMLElement.value}`;
  } else {
    resumeHTMLElement.textContent = inputHTMLElement.value;
  }
};

const debouncedUpdateResumeTextHandler = debounce(updateResumeText, 400);

const getFormattedDate = function (stringDate) {
  const [year, month] = stringDate.split('-');
  const formattedDate = `${month}/${year}`;
  return formattedDate;
};

const listInputElements = document.querySelectorAll('.input-element');
listInputElements.forEach((inputElement) => {
  const inputClasslist = inputElement.classList;
  for (const inputItem in subsectionsMapping) {
    if (inputClasslist.contains(inputItem)) {
      const inputHTMLElement = document.querySelector(`.${inputItem}`);
      const resumeHTMLElement = document.querySelector(
        `.${subsectionsMapping[inputItem]}`
      );
      listenForChangeInResumeText(inputHTMLElement, resumeHTMLElement);
      break;
    }
  }
});

console.log(listToggleSwitches);

listToggleSwitches.forEach((toggleSwitch) => {
  toggleSwitch.addEventListener('click', () => {
    console.log(toggleSwitch);
  });
});
