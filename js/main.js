'use strict';

const listBtnExpand = document.querySelectorAll('.btn-expand');
const listToggleSwitchCheckboxes = document.querySelectorAll(
  '.toggle-switch-checkbox'
);

const inputName = document.querySelector('.input-name');
const resumeName = document.querySelector('.resume-name');

let sectionsQuantityForCloningMapping = {
  links: 1,
  education: 1,
  experience: 1,
  hardSkills: 1,
  softSkills: 1,
  certificates: 1,
};

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
  inputElement,
  resumeElement,
  cloneNum
) {
  inputElement.addEventListener('focusin', () => {
    resumeElement.classList.add('active-resume-element');
  });

  inputElement.addEventListener('input', () => {
    debouncedUpdateResumeTextHandler(inputElement, resumeElement, cloneNum);
  });

  inputElement.addEventListener('change', () => {
    updateResumeText(inputElement, resumeElement, cloneNum);
  });

  inputElement.addEventListener('focusout', () => {
    resumeElement.classList.remove('active-resume-element');
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

const updateResumeText = function (inputElement, resumeElement, cloneNum) {
  if (inputElement.classList.contains('input-job-start-date')) {
    resumeElement.textContent = getFormattedDate(inputElement.value, 'month');
  } else if (inputElement.classList.contains('input-specialisation-name')) {
    resumeElement.textContent = `Specjalność: ${inputElement.value}`;
  } else if (inputElement.classList.contains('input-birthdate')) {
    const currentAge = calculateCurrentAge(inputElement);
    resumeElement.textContent = `${getFormattedDate(
      inputElement.value,
      'fullDate'
    )} (${currentAge})`;
  } else if (inputElement.classList.contains('input-social-media-links')) {
    resumeElement.setAttribute('href', inputElement.value);
    resumeElement.textContent = inputElement.value;
  } else if (
    inputElement.classList.contains('input-end-date') ||
    inputElement.classList.contains('input-currently')
  ) {
    currentlyStudyingOrWorkingHandler(inputElement, resumeElement, cloneNum);
  } else {
    resumeElement.textContent = inputElement.value;
  }
};

const uploadResumePhotoHandler = function () {
  const inputPhoto = document.querySelector('.input-user-photo');
  const resumePhoto = document.querySelector('.resume-img-user-photo');

  inputPhoto.addEventListener('change', (e) => {
    const photo = e.target.files[0];
    const reader = new FileReader();

    if (photo) reader.readAsDataURL(photo);
    reader.addEventListener('load', (e) => {
      resumePhoto.src = e.target.result;
    });
  });
};

const currentlyStudyingOrWorkingHandler = function (
  inputElement,
  resumeElement,
  cloneNum
) {
  const cloneNumOptionalSelector = getCloneNumOptionalSelector(cloneNum);
  const isDegreeInput =
    inputElement.getAttribute('name') === 'degree-end-year' ||
    inputElement.getAttribute('name') === 'degree-currently-studying';

  const isJobInput =
    inputElement.getAttribute('name') === 'job-end-date' ||
    inputElement.getAttribute('name') === 'job-currently-working';

  if (isDegreeInput || isJobInput) {
    const endDateInput = isDegreeInput
      ? document.querySelector(
          `.input-degree-end-year${cloneNumOptionalSelector}`
        )
      : document.querySelector(
          `.input-job-end-date${cloneNumOptionalSelector}`
        );

    const currentlyCheckbox = isDegreeInput
      ? document.querySelector(
          `.input-degree-currently-studying${cloneNumOptionalSelector}`
        )
      : document.querySelector(
          `.input-job-currently-working${cloneNumOptionalSelector}`
        );
    if (inputElement === endDateInput) {
      currentlyCheckbox.checked = false;
      resumeElement.textContent = isDegreeInput
        ? inputElement.value
        : getFormattedDate(inputElement.value, 'month');
    }

    if (inputElement === currentlyCheckbox && !currentlyCheckbox.checked)
      return;

    if (inputElement === currentlyCheckbox && currentlyCheckbox.checked) {
      resumeElement.textContent = inputElement.value;
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

const updateResumeFromInputFields = function () {
  const listInputElements = document.querySelectorAll('.input-element');
  listInputElements.forEach((inputElement) => {
    const inputClasslist = inputElement.classList;
    for (const inputElClass in subsectionsMapping) {
      if (inputClasslist.contains(inputElClass)) {
        const resumeElement = document.querySelector(
          `.${subsectionsMapping[inputElClass]}`
        );
        listenForChangeInResumeText(inputElement, resumeElement);
        break;
      }
    }
  });
};

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

const degreeYearsSelectHandler = function (cloneNum) {
  // const cloneNumOptionalSelector = getCloneNumOptionalSelector(cloneNum);
  // const inputDegreeStartYear = document.querySelector(
  //   `.input-degree-start-year${cloneNumOptionalSelector}`
  // );
  // const inputDegreeEndYear = document.querySelector(
  //   `.input-degree-end-year${cloneNumOptionalSelector}`
  // );
  // const inputIsCurrentlyStudying = document.querySelector(
  //   `.input-degree-currently-studying${cloneNumOptionalSelector}`
  // );
  const inputDegreeStartYear = document.querySelector(
    `.input-degree-start-year`
  );
  const inputDegreeEndYear = document.querySelector(`.input-degree-end-year`);
  const inputIsCurrentlyStudying = document.querySelector(
    `.input-degree-currently-studying`
  );
  // wróć nie działa dynamiczne dodawanie numerku - podejrzewam, że problem jest w dodawaniu listenerów, spróbuj przenieść do osobnej funkcji i użyć potem tylko na sklonowanej

  populateInputDegreeYears();
  inputDegreeStartYear.addEventListener('input', () => {
    validateDates(
      inputDegreeStartYear,
      inputDegreeEndYear,
      inputIsCurrentlyStudying
    );
  });
  inputDegreeEndYear.addEventListener('input', () => {
    validateDates(
      inputDegreeStartYear,
      inputDegreeEndYear,
      inputIsCurrentlyStudying
    );
  });
  inputIsCurrentlyStudying.addEventListener('input', () => {
    validateDates(
      inputDegreeStartYear,
      inputDegreeEndYear,
      inputIsCurrentlyStudying
    );
  });
};

const populateInputDegreeYears = function () {
  const inputDegreeStartYear = document.querySelector(
    `.input-degree-start-year`
  );
  const inputDegreeEndYear = document.querySelector(`.input-degree-end-year`);
  const currentYear = new Date().getFullYear();
  const maxYearsInThePast = 100;
  for (let i = currentYear; i >= currentYear - maxYearsInThePast; i--) {
    const yearOption = document.createElement('option');
    yearOption.value = i;
    yearOption.text = i;
    inputDegreeStartYear.appendChild(yearOption.cloneNode(true));
    inputDegreeEndYear.appendChild(yearOption.cloneNode(true));
  }
};

const jobDatesSelectHandler = function () {
  const inputJobStartDate = document.querySelector('.input-job-start-date');
  const inputJobEndDate = document.querySelector('.input-job-end-date');
  const inputIsCurrentlyWorking = document.querySelector(
    '.input-job-currently-working'
  );

  inputJobStartDate.addEventListener('input', () => {
    validateDates(inputJobStartDate, inputJobEndDate, inputIsCurrentlyWorking);
  });
  inputJobEndDate.addEventListener('input', () => {
    validateDates(inputJobStartDate, inputJobEndDate, inputIsCurrentlyWorking);
  });
  inputIsCurrentlyWorking.addEventListener('input', () => {
    validateDates(inputJobStartDate, inputJobEndDate, inputIsCurrentlyWorking);
  });
};

// wróć nie działa dla sklonowanych
const validateDates = function (
  inputStartDateEl,
  inputEndDateEl,
  inputIsCurrentlyWorkingOrStudying
) {
  const startYearValue = inputStartDateEl?.value;
  const endYearValue = inputEndDateEl?.value;

  if (
    endYearValue &&
    startYearValue > endYearValue &&
    !inputIsCurrentlyWorkingOrStudying.checked
  ) {
    inputStartDateEl.classList.add('invalid-date-alert');
    inputEndDateEl.classList.add('invalid-date-alert');
    alert('Data początku nie powinna przekraczać daty końca!');
  }
  if (
    (startYearValue <= endYearValue ||
      inputIsCurrentlyWorkingOrStudying.checked) &&
    inputStartDateEl.classList.contains('invalid-date-alert')
  ) {
    inputStartDateEl.classList.remove('invalid-date-alert');
    inputEndDateEl.classList.remove('invalid-date-alert');
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
  if (currentAgeInYears === 0) return '0 lat';
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

const addNewEducationSection = function () {
  const btnAddNewEducation = document.querySelector('.btn-add-new-education');
  const resumeEducationSection = document.querySelector('.resume-education');
  const resumeEducationContent = document.querySelector(
    '.resume-education-content'
  );
  btnAddNewEducation.addEventListener('click', () => {
    const parentEl = btnAddNewEducation.parentElement;
    const formEl = parentEl.children[0];
    const clonedInputSection = formEl.cloneNode(true);
    const clonedResumeSection = resumeEducationContent.cloneNode(true);
    sectionsQuantityForCloningMapping.education += 1;
    clonedInputSection.classList.add(
      `input-cloned-education-section-${sectionsQuantityForCloningMapping.education}`
    );
    clonedResumeSection.classList.add(
      `resume-cloned-education-section-${sectionsQuantityForCloningMapping.education}`
    );
    updateResumeFromClonedInputFields(
      clonedInputSection,
      clonedResumeSection,
      sectionsQuantityForCloningMapping.education
    );
    console.log(sectionsQuantityForCloningMapping.education);
    degreeYearsSelectHandler(sectionsQuantityForCloningMapping.education);
    parentEl.appendChild(clonedInputSection);
    resumeEducationSection.appendChild(clonedResumeSection);
  });
};

const updateResumeFromClonedInputFields = function (
  clonedInputSection,
  clonedResumeSection,
  cloneNum
) {
  const listClonedInputElements =
    clonedInputSection.querySelectorAll('.input-element');
  listClonedInputElements.forEach((inputClonedElement) => {
    const inputClasslist = inputClonedElement.classList;
    for (const inputElClass in subsectionsMapping) {
      if (inputClasslist.contains(inputElClass)) {
        const resumeClonedElement = updateResumeFromClonedInputEducationHandler(
          inputClasslist,
          inputElClass,
          clonedResumeSection,
          cloneNum
        );
        listenForChangeInResumeText(
          inputClonedElement,
          resumeClonedElement,
          cloneNum
        );
        // degreeYearsSelectHandler(cloneNum);
        break;
      }
    }
  });
};

const updateResumeFromClonedInputEducationHandler = function (
  inputClasslist,
  inputElClass,
  clonedResumeSection,
  cloneNum
) {
  if (!inputClasslist.contains('input-currently')) {
    inputClasslist.replace(inputElClass, `${inputElClass}-${cloneNum}`);
    const resumeElClass = subsectionsMapping[inputElClass];
    const resumeClonedElement = clonedResumeSection.querySelector(
      `.${resumeElClass}`
    );
    resumeClonedElement.classList.replace(
      resumeElClass,
      `${resumeElClass}-${cloneNum}`
    );
    return resumeClonedElement;
  }

  if (inputClasslist.contains('input-degree-currently-studying')) {
    inputClasslist.replace(inputElClass, `${inputElClass}-${cloneNum}`);
    const resumeClonedElement = clonedResumeSection.querySelector(
      `.resume-degree-end-year-${cloneNum}`
    );
    return resumeClonedElement;
  }
};

const getCloneNumOptionalSelector = function (cloneNumOptional) {
  const cloneNumOptionalSelector = cloneNumOptional
    ? `-${cloneNumOptional}`
    : '';
  return cloneNumOptionalSelector;
};

// wróć dodaj też guzik do usunięcia - usuwaj ostatniego childa

degreeYearsSelectHandler();
jobDatesSelectHandler();
uploadResumePhotoHandler();
addNewEducationSection();
updateResumeFromInputFields();
