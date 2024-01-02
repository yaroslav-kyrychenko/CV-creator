'use strict';

import { inputItemsMapping } from './mappings.js';
import {
  listenForChangeInResumeText,
  degreeYearsSelectHandler,
} from './handlers.js';

let subsectionsClonesQuantities = {
  'form-item-social-media-links': 1,
  'config-section-content-education': 1,
  'config-section-content-experience': 1,
  'form-hard-skills': 1,
  'form-soft-skills': 1,
  'form-item-certificates': 1,
};

export const addNewEducationSection = function () {
  const btnAddNewEducation = document.querySelector('.btn-add-new-education');
  const btnRemoveEducation = document.querySelector(
    '.btn-remove-last-education-item'
  );
  const resumeEducationSection = document.querySelector('.resume-education');
  const resumeEducationContent = document.querySelector(
    '.resume-education-content'
  );
  const inputEducationContent = document.querySelector(
    '.config-section-content-education'
  );
  let educationCloneNum =
    subsectionsClonesQuantities['config-section-content-education'];

  btnAddNewEducation.addEventListener('click', () => {
    const formEl = inputEducationContent.children[0];
    const clonedInputSubsection = formEl.cloneNode(true);
    const clonedResumeSubsection = resumeEducationContent.cloneNode(true);
    subsectionsClonesQuantities['config-section-content-education'] += 1;
    educationCloneNum += 1;
    clonedInputSubsection.classList.add(
      `input-cloned-education-section-${subsectionsClonesQuantities['config-section-content-education']}`
    );
    clonedResumeSubsection.classList.add(
      `resume-cloned-education-section-${subsectionsClonesQuantities['config-section-content-education']}`
    );

    inputEducationContent.appendChild(clonedInputSubsection);
    resumeEducationSection.appendChild(clonedResumeSubsection);
    updateResumeFromClonedInputFields(
      clonedInputSubsection,
      clonedResumeSubsection,
      educationCloneNum
    );
    degreeYearsSelectHandler(educationCloneNum);
  });
  removeLastClone(inputEducationContent, resumeEducationSection);
};

const updateResumeFromClonedInputFields = function (
  clonedInputSubsection,
  clonedResumeSubsection,
  cloneNum
) {
  const listClonedInputElements =
    clonedInputSubsection.querySelectorAll('.input-element');
  listClonedInputElements.forEach((inputClonedElement) => {
    const inputClasslist = inputClonedElement.classList;
    for (const inputElClass in inputItemsMapping) {
      if (inputClasslist.contains(inputElClass)) {
        const resumeClonedElement = updateResumeFromClonedInputEducationHandler(
          inputClasslist,
          inputElClass,
          clonedResumeSubsection,
          cloneNum
        );
        listenForChangeInResumeText(
          inputClonedElement,
          resumeClonedElement,
          cloneNum
        );
        break;
      }
    }
  });
};

const updateResumeFromClonedInputEducationHandler = function (
  inputClasslist,
  inputElClass,
  clonedResumeSubsection,
  cloneNum
) {
  if (!inputClasslist.contains('input-currently')) {
    inputClasslist.replace(inputElClass, `${inputElClass}-${cloneNum}`);
    const resumeElClass = inputItemsMapping[inputElClass];
    const resumeClonedElement = clonedResumeSubsection.querySelector(
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
    const resumeClonedElement = clonedResumeSubsection.querySelector(
      `.resume-degree-end-year-${cloneNum}`
    );
    return resumeClonedElement;
  }
};

// wróć przerobić, żeby była wielorazowa
const removeLastClone = function (inputParentEl, resumeParentEl) {
  const removeLastCloneBtn = document.querySelector(
    '.btn-remove-last-education-item'
  );
  removeLastCloneBtn.addEventListener('click', () => {
    const inputLastClonedIndex = getLastClonedChild(inputParentEl);
    const resumeLastClonedIndex = getLastClonedChild(resumeParentEl);
    const lastInputClone = inputParentEl.children[inputLastClonedIndex];
    const lastResumeClone = resumeParentEl.children[resumeLastClonedIndex];
    if (
      inputLastClonedIndex ===
      subsectionsClonesQuantities['config-section-content-education']
    ) {
      inputParentEl.removeChild(lastInputClone);
      resumeParentEl.removeChild(lastResumeClone);
      subsectionsClonesQuantities['config-section-content-education'] -= 1;
    } else {
      return;
    }
  });
};

const getLastClonedChild = function (parentEl) {
  const childrenQuantity = parentEl.children.length;
  if (childrenQuantity > 2) {
    const indexOfLastClonedChild = childrenQuantity - 1;
    return indexOfLastClonedChild;
  }
};

// wróć działa dla konkretnie nazwanych elementów, trzeba przerobić tak, żeby działało dla najbliższych
export const toggleRemoveSubsectionBtn = function () {
  const btnAddNewEducation = document.querySelector('.btn-add-new-education');
  const btnRemoveEducation = document.querySelector(
    '.btn-remove-last-education-item'
  );
  btnAddNewEducation.addEventListener('click', () => {
    if (subsectionsClonesQuantities['config-section-content-education'] > 1) {
      btnRemoveEducation.classList.remove('hidden');
    }
  });
  btnRemoveEducation.addEventListener('click', () => {
    if (subsectionsClonesQuantities['config-section-content-education'] === 1) {
      btnRemoveEducation.classList.add('hidden');
    }
  });
};

export const toggleRemove = function () {
  const removeBtnList = document.querySelectorAll('.btn-remove');
  removeBtnList.forEach((btn) => {
    const removeBtnClasslist = Array.from(btn.classList);
    const removeBtnSpecificClass = removeBtnClasslist.filter((btnClass) =>
      btnClass.startsWith('btn-remove-last-')
    )[0];
    const removeBtn = document.querySelector(`.${removeBtnSpecificClass}`);
    const parentElClasslist = removeBtn.parentElement.parentElement.classList;
    let clonesQuantitiesMappingClass;
    for (const clonesClass in subsectionsClonesQuantities) {
      if (parentElClasslist.contains(clonesClass))
        clonesQuantitiesMappingClass = clonesClass;
    }
  });
};
