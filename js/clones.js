'use strict';

import { inputItemsMapping, toggleRemoveBtnMapping } from './mappings.js';
import {
  listenForChangeInInputFields,
  degreeYearsSelectHandler,
} from './handlers.js';

let subsectionsClonesQuantities = {
  'input-social-media-link': 1,
  'config-section-content-education': 1,
  'config-section-content-experience': 1,
  'form-hard-skills': 1,
  'form-soft-skills': 1,
  'form-item-certificates': 1,
};

export const addNewEducationSection = function () {
  const btnAddNewEducation = document.querySelector('.btn-add-new-education');
  const btnRemoveLastEducation = document.querySelector(
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
    subsectionsClonesQuantities['config-section-content-education']++;
    educationCloneNum++;
    clonedInputSubsection.classList.add(
      `input-cloned-education-section-${subsectionsClonesQuantities['config-section-content-education']}`
    );
    clonedResumeSubsection.classList.add(
      `resume-cloned-education-section-${subsectionsClonesQuantities['config-section-content-education']}`
    );

    inputEducationContent.appendChild(clonedInputSubsection);
    resumeEducationSection.appendChild(clonedResumeSubsection);
    updateResumeFromClonedSubsections(
      clonedInputSubsection,
      clonedResumeSubsection,
      educationCloneNum
    );
    degreeYearsSelectHandler(educationCloneNum);
  });
  removeLastClone(
    btnRemoveLastEducation,
    inputEducationContent,
    resumeEducationSection
  );
};

export const addNewSocialMediaLink = function () {
  const btnAddNewSocialMediaLink = document.querySelector('.btn-add-new-link');
  const btnRemoveLastSocialMediaLink = document.querySelector(
    '.btn-remove-last-link'
  );
  const resumePersonalDetailsSection = document.querySelector(
    '.resume-personal-details'
  );
  const resumeSocialMediaLink = document.querySelector(
    '.resume-social-media-link'
  );
  const inputSocialMediaLinkContainer = document.querySelector(
    '.social-media-links-container'
  );
  let socialMediaLinksCloneNum =
    subsectionsClonesQuantities['input-social-media-link'];

  btnAddNewSocialMediaLink.addEventListener('click', (e) => {
    const inputFieldSocialMediaLink = inputSocialMediaLinkContainer.children[0];
    const clonedLinkInputField = inputFieldSocialMediaLink.cloneNode(true);
    const clonedResumeSocialMediaLink = resumeSocialMediaLink.cloneNode(true);
    subsectionsClonesQuantities['input-social-media-link']++;
    socialMediaLinksCloneNum++;

    clonedLinkInputField.classList.add(
      `input-cloned-social-media-link-${subsectionsClonesQuantities['input-social-media-link']}`
    );
    clonedResumeSocialMediaLink.classList.add(
      `resume-cloned-social-media-link-${subsectionsClonesQuantities['input-social-media-link']}`
    );

    inputSocialMediaLinkContainer.appendChild(clonedLinkInputField);
    resumePersonalDetailsSection.appendChild(clonedResumeSocialMediaLink);
    updateResumeFromClonedInputFields(
      clonedLinkInputField,
      clonedResumeSocialMediaLink,
      socialMediaLinksCloneNum
    );
  });

  removeLastClone(
    btnRemoveLastSocialMediaLink,
    inputSocialMediaLinkContainer,
    resumePersonalDetailsSection
  );
};

const updateResumeFromClonedSubsections = function (
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
        listenForChangeInInputFields(
          inputClonedElement,
          resumeClonedElement,
          cloneNum
        );
        break;
      }
    }
  });
};

const updateResumeFromClonedInputFields = function (
  inputClonedField,
  resumeClonedElement,
  cloneNum
) {
  for (const inputElClass in inputItemsMapping) {
    if (inputClonedField.classList.contains(inputElClass)) {
      listenForChangeInInputFields(
        inputClonedField,
        resumeClonedElement,
        cloneNum
      );
      break;
    }
  }
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

const removeLastClone = function (
  removeLastCloneBtn,
  inputParentEl,
  resumeParentEl
) {
  removeLastCloneBtn.addEventListener('click', () => {
    const inputLastClonedIndex = getLastClonedChild(inputParentEl);
    const resumeLastClonedIndex = getLastClonedChild(resumeParentEl);
    const lastInputClone = inputParentEl.children[inputLastClonedIndex];
    const lastResumeClone = resumeParentEl.children[resumeLastClonedIndex];
    const removeBtnMapping = getRemoveBtnMapping(removeLastCloneBtn);
    if (
      inputLastClonedIndex ===
      subsectionsClonesQuantities[removeBtnMapping.clonedEl]
    ) {
      inputParentEl.removeChild(lastInputClone);
      resumeParentEl.removeChild(lastResumeClone);
      subsectionsClonesQuantities[removeBtnMapping.clonedEl] -= 1;
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

export const toggleRemove = function () {
  const removeBtnList = document.querySelectorAll('.btn-remove');
  removeBtnList.forEach((removeBtn) => {
    const removeBtnMapping = getRemoveBtnMapping(removeBtn);

    const clonedElClass = removeBtnMapping.clonedEl;

    const addBtnClass = removeBtnMapping.addBtn;
    const btnAddItem = document.querySelector(`.${addBtnClass}`);

    // wróć po dodaniu "dodawania" dla pozostałych sekcji czy działa
    btnAddItem.addEventListener('click', () => {
      if (subsectionsClonesQuantities[clonedElClass] > 1) {
        removeBtn.classList.remove('hidden');
      }
    });
    removeBtn.addEventListener('click', () => {
      if (subsectionsClonesQuantities[clonedElClass] === 1) {
        removeBtn.classList.add('hidden');
      }
    });
  });
};

const getRemoveBtnMapping = function (removeBtn) {
  const removeBtnClasslist = Array.from(removeBtn.classList);
  const removeBtnSpecificClass = removeBtnClasslist.filter((btnClass) =>
    btnClass.startsWith('btn-remove-last-')
  )[0];
  const removeBtnMapping = toggleRemoveBtnMapping[removeBtnSpecificClass];
  return removeBtnMapping;
};
