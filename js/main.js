// This file contains the main flow of the web app, i.e. main function calls.

'use strict';

import { inputItemsMapping } from './mappings.js';
import {
  listenForChangeInInputFields,
  uploadResumePhotoHandler,
  degreeYearsSelectHandler,
  jobDatesSelectHandler,
} from './handlers.js';
import {
  addNewEducationSection,
  addNewSocialMediaLink,
  toggleRemove,
} from './clones.js';

const updateResumeFromInputFields = function () {
  const listInputElements = document.querySelectorAll('.input-element');
  listInputElements.forEach((inputElement) => {
    const inputClasslist = inputElement.classList;
    for (const inputElClass in inputItemsMapping) {
      if (inputClasslist.contains(inputElClass)) {
        const resumeElement = document.querySelector(
          `.${inputItemsMapping[inputElClass]}`
        );
        listenForChangeInInputFields(inputElement, resumeElement);
        break;
      }
    }
  });
};

degreeYearsSelectHandler();
jobDatesSelectHandler();
uploadResumePhotoHandler();
addNewEducationSection();
addNewSocialMediaLink();
updateResumeFromInputFields();
toggleRemove();
