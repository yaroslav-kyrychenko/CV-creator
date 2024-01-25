// This file contains methods, which contain additional event listeners not engaged in the main.js or generally operate based on query selectors.

'use strict';

import {
  sectionsMapping,
  updateResumeTextHandlerMapping,
  tooltipMapping,
  printingOptions,
} from './mappings.js';

import {
  debounce,
  getCloneNumOptionalSelector,
  populateInputDegreeYears,
  validateDates,
  getFormattedDate,
  calculateCurrentAge,
} from './helpers.js';

const listToggleSwitchCheckboxes = document.querySelectorAll(
  '.toggle-switch-checkbox'
);
const listBtnExpand = document.querySelectorAll('.btn-expand');

export const listenForChangeInInputFields = function (
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

  inputElement.addEventListener('focusout', () => {
    resumeElement.classList.remove('active-resume-element');
  });
};

export const updateResumeText = function (
  inputElement,
  resumeElement,
  cloneNum
) {
  const inputElementClasslist = inputElement.classList;
  for (const className of inputElementClasslist) {
    if (updateResumeTextHandlerMapping.hasOwnProperty(className)) {
      updateResumeTextHandlerMapping[className];
      updateResumeTextHandlerMapping[className](
        inputElement,
        resumeElement,
        cloneNum
      );
      return;
    } else {
      resumeElement.textContent = inputElement.value;
    }
  }
};

const debouncedUpdateResumeTextHandler = debounce(updateResumeText, 400);

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

listBtnExpand.forEach((btnExpand) => {
  btnExpand.addEventListener('click', () => {
    const sectionConfigHeaderEl = btnExpand.parentElement;
    const sectionConfigContentsEl = sectionConfigHeaderEl.nextElementSibling;
    sectionConfigContentsEl.classList.toggle('hidden');
  });
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

export const uploadResumePhotoHandler = function () {
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

export const currentlyStudyingOrWorkingHandler = function (
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

export const degreeYearsSelectHandler = function (cloneOptionalNum) {
  const cloneNum = getCloneNumOptionalSelector(cloneOptionalNum);
  const inputDegreeStartYear = document.querySelector(
    `.input-degree-start-year${cloneNum}`
  );
  const inputDegreeEndYear = document.querySelector(
    `.input-degree-end-year${cloneNum}`
  );
  const inputIsCurrentlyStudying = document.querySelector(
    `.input-degree-currently-studying${cloneNum}`
  );

  populateInputDegreeYears();
  addEventListenersToDates(
    inputDegreeStartYear,
    inputDegreeEndYear,
    inputIsCurrentlyStudying
  );
};

export const jobYearsSelectHandler = function (cloneOptionalNum) {
  const cloneNum = getCloneNumOptionalSelector(cloneOptionalNum);
  const inputJobStartYear = document.querySelector(
    `.input-job-start-date${cloneNum}`
  );
  const inputJobEndYear = document.querySelector(
    `.input-job-end-date${cloneNum}`
  );
  const inputIsCurrentlyWorking = document.querySelector(
    `.input-job-currently-working${cloneNum}`
  );

  addEventListenersToDates(
    inputJobStartYear,
    inputJobEndYear,
    inputIsCurrentlyWorking
  );
};

const addEventListenersToDates = function (
  inputStartYear,
  inputEndYear,
  inputIsCurrentlyStudyingOrWorking
) {
  inputStartYear.addEventListener('input', () => {
    validateDates(
      inputStartYear,
      inputEndYear,
      inputIsCurrentlyStudyingOrWorking
    );
  });
  inputEndYear.addEventListener('input', () => {
    validateDates(
      inputStartYear,
      inputEndYear,
      inputIsCurrentlyStudyingOrWorking
    );
  });
  inputIsCurrentlyStudyingOrWorking.addEventListener('input', () => {
    validateDates(
      inputStartYear,
      inputEndYear,
      inputIsCurrentlyStudyingOrWorking
    );
  });
};

export const jobDatesSelectHandler = function () {
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

export const tooltipDisplayToggleHandler = function () {
  const listBtnAdd = document.querySelectorAll('.btn-add-new');
  const listBtnRemove = document.querySelectorAll('.btn-remove');
  const listBtnAddRemove = [...listBtnAdd, ...listBtnRemove];
  listBtnAddRemove.forEach((btn) => {
    let tooltip;
    for (const btnClass in tooltipMapping) {
      if (btn.classList.contains(btnClass)) {
        tooltip = document.querySelector(`.${tooltipMapping[btnClass]}`);
      }
    }
    btn.addEventListener('mouseenter', () => {
      tooltip.classList.remove('hidden');
    });
    btn.addEventListener('mouseleave', () => {
      tooltip.classList.add('hidden');
    });
  });
};

export const printResume = function () {
  const btnPrint = document.querySelector('.btn-print');
  const previewContainer = document.querySelector('.container-preview-window');

  btnPrint.addEventListener('click', () => {
    html2pdf(previewContainer, printingOptions);
  });
};
