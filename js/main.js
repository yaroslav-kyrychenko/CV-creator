'use strict';

const listBtnExpand = document.querySelectorAll('.btn-expand');
const listToggleSwitchCheckboxes = document.querySelectorAll(
  '.toggle-switch-checkbox'
);

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
  'input-birthdate': 'resume-birthdate',
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
  'input-degree-currently-studying': 'resume-degree-end-year',
  'input-company-name': 'resume-company-name',
  'input-position-title': 'resume-position-title',
  'input-job-start-date': 'resume-job-start-date',
  'input-job-end-date': 'resume-job-end-date',
  'input-job-currently-working': 'resume-job-end-date',
  'input-job-description': 'resume-job-description',
  'input-hard-skill': 'resume-list-item-hard-skills',
  'input-soft-skill': 'resume-list-item-soft-skills',
  'input-certificate': 'resume-list-item-certificate',
};

const listenForChangeInResumeText = function (
  inputHTMLElement,
  resumeHTMLElement
) {
  inputHTMLElement.addEventListener('focusin', () => {
    resumeHTMLElement.classList.add('active-resume-element');
  });

  inputHTMLElement.addEventListener('input', () => {
    debouncedUpdateResumeTextHandler(inputHTMLElement, resumeHTMLElement);
  });

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
  if (inputHTMLElement.classList.contains('input-job-start-date')) {
    resumeHTMLElement.textContent = getFormattedDate(
      inputHTMLElement.value,
      'month'
    );
  } else if (inputHTMLElement.classList.contains('input-specialisation-name')) {
    resumeHTMLElement.textContent = `Specjalność: ${inputHTMLElement.value}`;
  } else if (inputHTMLElement.classList.contains('input-birthdate')) {
    const currentAge = calculateCurrentAge(inputHTMLElement);
    resumeHTMLElement.textContent = `${getFormattedDate(
      inputHTMLElement.value,
      'fullDate'
    )} (${currentAge})`;
  } else if (inputHTMLElement.classList.contains('input-social-media-links')) {
    resumeHTMLElement.setAttribute('href', inputHTMLElement.value);
    resumeHTMLElement.textContent = inputHTMLElement.value;
  } else if (
    inputHTMLElement.classList.contains('input-end-date') ||
    inputHTMLElement.classList.contains('input-currently')
  ) {
    currentlyStudyingOrWorkingHandler(inputHTMLElement, resumeHTMLElement);
  } else {
    resumeHTMLElement.textContent = inputHTMLElement.value;
  }
};

const currentlyStudyingOrWorkingHandler = function (
  inputHTMLElement,
  resumeHTMLElement
) {
  const isDegreeInput =
    inputHTMLElement.classList.contains('input-degree-end-year') ||
    inputHTMLElement.classList.contains('input-degree-currently-studying');

  const isJobInput =
    inputHTMLElement.classList.contains('input-job-end-date') ||
    inputHTMLElement.classList.contains('input-job-currently-working');

  if (isDegreeInput || isJobInput) {
    const endDateInput = isDegreeInput
      ? document.querySelector('.input-degree-end-year')
      : document.querySelector('.input-job-end-date');

    const currentlyCheckbox = isDegreeInput
      ? document.querySelector('.input-degree-currently-studying')
      : document.querySelector('.input-job-currently-working');

    if (inputHTMLElement === endDateInput) {
      currentlyCheckbox.checked = false;
      resumeHTMLElement.textContent = isDegreeInput
        ? inputHTMLElement.value
        : getFormattedDate(inputHTMLElement.value, 'month');
    }

    if (inputHTMLElement === currentlyCheckbox && !currentlyCheckbox.checked)
      return;

    if (inputHTMLElement === currentlyCheckbox && currentlyCheckbox.checked) {
      resumeHTMLElement.textContent = inputHTMLElement.value;
    }
  }
};

const debouncedUpdateResumeTextHandler = debounce(updateResumeText, 400);

const getFormattedDate = function (stringDate, type) {
  if (type === 'fullDate') {
    const [year, month, day] = stringDate.split('-');
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
  }
  if (type === 'month') {
    const [year, month] = stringDate.split('-');
    const formattedDate = `${month}/${year}`;
    return formattedDate;
  }
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

const toggleSwitchSectionVisibilityHandler = function (toggleSwitchCheckbox) {
  const sectionConfigContentsEl =
    toggleSwitchCheckbox.parentElement.parentElement.nextElementSibling;
  if (
    toggleSwitchCheckbox.checked &&
    sectionConfigContentsEl.classList.contains('hidden')
  ) {
    sectionConfigContentsEl.classList.toggle('hidden');
  }
  if (
    !toggleSwitchCheckbox.checked &&
    !sectionConfigContentsEl.classList.contains('hidden')
  ) {
    sectionConfigContentsEl.classList.toggle('hidden');
  }
};

const yearsSelectHandler = function () {
  const inputDegreeStartYear = document.querySelector(
    '.input-degree-start-year'
  );
  const inputDegreeEndYear = document.querySelector('.input-degree-end-year');

  const currentYear = new Date().getFullYear();
  const maxYearsInThePast = 100;

  for (let i = currentYear; i >= currentYear - maxYearsInThePast; i--) {
    const yearOption = document.createElement('option');
    yearOption.value = i;
    yearOption.text = i;
    inputDegreeStartYear.appendChild(yearOption.cloneNode(true));
    inputDegreeEndYear.appendChild(yearOption.cloneNode(true));
  }
  inputDegreeStartYear.addEventListener('input', () => {
    validateDegreeYears(inputDegreeStartYear, inputDegreeEndYear);
  });
  inputDegreeEndYear.addEventListener('input', () => {
    validateDegreeYears(inputDegreeStartYear, inputDegreeEndYear);
  });
};

// wróć dodaj walidację do lat pracy
const validateDegreeYears = function (
  inputDegreeStartYear,
  inputDegreeEndYear
) {
  const startYearValue = inputDegreeStartYear.value;
  const endYearValue = inputDegreeEndYear.value;

  if (startYearValue > endYearValue) {
    inputDegreeStartYear.classList.add('invalid-year-alert');
    alert('Rok początku studiów nie powinien przekraczać roku ich końca!');
  }
  if (
    startYearValue <= endYearValue &&
    inputDegreeStartYear.classList.contains('invalid-year-alert')
  ) {
    inputDegreeStartYear.classList.remove('invalid-year-alert');
  }
};

const calculateCurrentAge = function (inputBirthdate) {
  const currentDate = new Date();
  const birthDate = new Date(inputBirthdate.value);

  const currentAgeInMilliseconds = currentDate - birthDate;
  const currentAgeInYears = Math.floor(
    currentAgeInMilliseconds / (365 * 24 * 60 * 60 * 1000)
  );
  const currentAgeLastDigit = String(currentAgeInYears).at(-1);
  let formattedAgeString;
  if (
    currentAgeLastDigit >= 2 &&
    currentAgeLastDigit <= 4 &&
    (currentAgeInYears < 12 || currentAgeInYears > 14)
  ) {
    formattedAgeString = `${currentAgeInYears} lata`;
  } else {
    formattedAgeString = `${currentAgeInYears} lat`;
  }
  if (currentAgeInYears) return formattedAgeString;
};

// WRÓĆ DOKOŃCZ AKTUALNIE STUDIUJĘ PRACUJĘ - DO OSOBNEJ FUNKCJI + ZROBIĆ UNIWERSALNYM

listBtnExpand.forEach((btnExpand) => {
  btnExpand.addEventListener('click', () => {
    const sectionConfigHeaderEl = btnExpand.parentElement;
    const sectionConfigContentsEl = sectionConfigHeaderEl.nextElementSibling;
    sectionConfigContentsEl.classList.toggle('hidden');
  });
});

listToggleSwitchCheckboxes.forEach((toggleSwitchCheckbox) => {
  toggleSwitchCheckbox.addEventListener('click', () => {
    const switchedSectionHeaderEl =
      toggleSwitchCheckbox.parentElement.parentElement.parentElement;
    for (const sectionName in sectionsMapping) {
      if (switchedSectionHeaderEl.classList.contains(sectionName)) {
        const resumeSection = document.querySelector(
          `.${sectionsMapping[sectionName]}`
        );
        resumeSection.classList.toggle('hidden');
      }
    }
    toggleSwitchSectionVisibilityHandler(toggleSwitchCheckbox);
  });
});

yearsSelectHandler();
