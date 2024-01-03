// This file contains additional methods, which are used in event listeners for additional tasks, e.g. calculating or formatting something

'use strict';

export const debounce = function (functionDebounced, delayInMilliseconds) {
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

export const getCloneNumOptionalSelector = function (cloneNumOptional) {
  const cloneNumOptionalSelector = cloneNumOptional
    ? `-${cloneNumOptional}`
    : '';
  return cloneNumOptionalSelector;
};

export const populateInputDegreeYears = function () {
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

export const validateDates = function (
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

export const getFormattedDate = function (stringDate, type) {
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

export const calculateCurrentAge = function (inputBirthdate) {
  const currentDate = new Date();
  const birthDate = new Date(inputBirthdate.value);

  const currentAgeInMilliseconds = currentDate - birthDate;
  const currentAgeInYears = Math.floor(
    currentAgeInMilliseconds / (365 * 24 * 60 * 60 * 1000)
  );
  const currentAgeLastDigit = String(currentAgeInYears).at(-1);
  let formattedAgeString;
  if (currentAgeInYears < 0) {
    alert('Została wybrana przyszła data. Wybierz właściwą datę.');
    return '';
  }
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
