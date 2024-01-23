// This file contains mapping objects, which are used in main.js and handlers.js.

'use strict';

import { currentlyStudyingOrWorkingHandler } from './handlers.js';
import { getFormattedDate, calculateCurrentAge } from './helpers.js';

export const sectionsMapping = {
  'config-section-personal-details': 'resume-personal-details',
  'config-section-education': 'resume-education',
  'config-section-experience': 'resume-job',
  'config-section-skills': 'resume-skills',
  'config-section-certificates': 'resume-certificates',
};

export const inputItemsMapping = {
  'input-name': 'resume-name',
  'input-birthdate': 'resume-birthdate',
  'input-phone-number': 'resume-phone-number',
  'input-email': 'resume-email',
  'input-social-media-link': 'resume-social-media-link',
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

export const toggleRemoveBtnMapping = {
  'btn-remove-last-link': {
    clonedEl: 'input-social-media-link',
    addBtn: 'btn-add-new-link',
  },
  'btn-remove-last-education-item': {
    clonedEl: 'config-section-content-education',
    addBtn: 'btn-add-new-education',
  },
  'btn-remove-last-job-item': {
    clonedEl: 'config-section-content-job',
    addBtn: 'btn-add-new-job',
  },
  'btn-remove-last-hard-skill': {
    clonedEl: 'input-hard-skill',
    addBtn: 'btn-add-new-hard-skill',
  },
  'btn-remove-last-soft-skill': {
    clonedEl: 'input-soft-skill',
    addBtn: 'btn-add-new-soft-skill',
  },
  'btn-remove-last-certificate': {
    clonedEl: 'input-certificate',
    addBtn: 'btn-add-new-certificate',
  },
};

export const updateResumeTextHandlerMapping = {
  'input-start-date-format': (inputElement, resumeElement) => {
    console.log('test');
    resumeElement.textContent = getFormattedDate(inputElement.value, 'month');
  },
  'input-specialisation-format': (inputElement, resumeElement) => {
    resumeElement.textContent = `Specjalność: ${inputElement.value}`;
  },
  'input-birthdate': (inputElement, resumeElement) => {
    const currentAge = calculateCurrentAge(inputElement);
    resumeElement.textContent = `${getFormattedDate(
      inputElement.value,
      'fullDate'
    )} (${currentAge})`;
  },
  'input-social-media-link': (inputElement, resumeElement) => {
    resumeElement.setAttribute('href', inputElement.value);
    resumeElement.textContent = inputElement.value;
  },
  'input-end-date-format': (inputElement, resumeElement, cloneNum) => {
    currentlyStudyingOrWorkingHandler(inputElement, resumeElement, cloneNum);
  },
  'input-currently-format': (inputElement, resumeElement, cloneNum) => {
    currentlyStudyingOrWorkingHandler(inputElement, resumeElement, cloneNum);
  },
};

export const tooltipMapping = {
  'btn-add-new-link': 'tooltip-add-new-link',
  'btn-remove-last-link': 'tooltip-remove-last-link',
  'btn-add-new-education': 'tooltip-add-new-education',
  'btn-remove-last-education-item': 'tooltip-remove-last-education',
  'btn-add-new-job': 'tooltip-add-new-job',
  'btn-remove-last-job-item': 'tooltip-remove-last-job',
  'btn-add-new-hard-skill': 'tooltip-add-new-hard-skill',
  'btn-remove-last-hard-skill': 'tooltip-remove-last-hard-skill',
  'btn-add-new-soft-skill': 'tooltip-add-new-soft-skill',
  'btn-remove-last-soft-skill': 'tooltip-remove-last-soft-skill',
  'btn-add-new-certificate': 'tooltip-add-new-certificate',
  'btn-remove-last-certificate': 'tooltip-remove-last-certificate',
};
