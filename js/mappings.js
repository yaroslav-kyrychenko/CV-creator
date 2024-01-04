// This file contains mapping objects, which are used in main.js and handlers.js.

'use strict';

export const sectionsMapping = {
  'config-section-personal-details': 'resume-personal-details',
  'config-section-education': 'resume-education',
  'config-section-experience': 'resume-experience',
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
    parent: 'social-media-links-container',
    addBtn: 'btn-add-new-link',
  },
  'btn-remove-last-education-item': {
    parent: 'config-section-content-education',
    addBtn: 'btn-add-new-education',
  },
  'btn-remove-last-job-item': {
    parent: 'config-section-content-experience',
    addBtn: 'btn-add-new-job',
  },
  'btn-remove-last-hard-skill': {
    parent: 'form-hard-skills',
    addBtn: 'btn-add-new-hard-skill',
  },
  'btn-remove-last-soft-skill': {
    parent: 'form-soft-skills',
    addBtn: 'btn-add-new-soft-skill',
  },
  'btn-remove-last-certificate': {
    parent: 'form-item-certificates',
    addBtn: 'btn-add-new-certificate',
  },
};
