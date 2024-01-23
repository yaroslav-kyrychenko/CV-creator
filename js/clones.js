'use strict';

import { inputItemsMapping, toggleRemoveBtnMapping } from './mappings.js';
import {
  listenForChangeInInputFields,
  degreeYearsSelectHandler,
  jobYearsSelectHandler,
} from './handlers.js';

let subsectionsClonesQuantities = {
  'input-social-media-link': 1,
  'config-section-content-education': 1,
  'config-section-content-job': 1,
  'input-hard-skill': 1,
  'input-soft-skill': 1,
  'input-certificate': 1,
};

const addNewSocialMediaLink = function () {
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
  const inputItemClass = 'input-social-media-link';
  let socialMediaLinksCloneNum = subsectionsClonesQuantities[inputItemClass];

  btnAddNewSocialMediaLink.addEventListener('click', () => {
    const inputFieldSocialMediaLink = inputSocialMediaLinkContainer.children[0];
    const clonedLinkInputField = inputFieldSocialMediaLink.cloneNode();
    clonedLinkInputField.value = '';

    const clonedResumeSocialMediaLink = resumeSocialMediaLink.cloneNode();
    clonedResumeSocialMediaLink.textContent = 'Link';

    subsectionsClonesQuantities[inputItemClass]++;
    socialMediaLinksCloneNum++;

    clonedLinkInputField.classList.add(
      `input-cloned-social-media-link-${subsectionsClonesQuantities[inputItemClass]}`
    );
    clonedResumeSocialMediaLink.classList.add(
      `resume-cloned-social-media-link-${subsectionsClonesQuantities[inputItemClass]}`
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

const addNewHardSkill = function () {
  const btnAddNewHardSkill = document.querySelector('.btn-add-new-hard-skill');
  const btnRemoveLastHardSkill = document.querySelector(
    '.btn-remove-last-hard-skill'
  );
  const resumeHardSkillsSection = document.querySelector(
    '.resume-list-hard-skills'
  );
  const resumeHardSkill = document.querySelector(
    '.resume-list-item-hard-skills'
  );
  const inputHardSkillsContainer = document.querySelector(
    '.hard-skills-container'
  );
  const inputItemClass = 'input-hard-skill';

  btnAddNewHardSkill.addEventListener('click', () => {
    const inputFieldHardSkill = inputHardSkillsContainer.children[0];
    const clonedInputHardSkill = inputFieldHardSkill.cloneNode();
    clonedInputHardSkill.value = '';

    const clonedResumeHardSkill = resumeHardSkill.cloneNode();
    clonedResumeHardSkill.textContent = 'Umiejętność twarda';

    subsectionsClonesQuantities[inputItemClass]++;
    // hardSkillsCloneNum++;

    clonedInputHardSkill.classList.add(
      `input-cloned-hard-skill-${subsectionsClonesQuantities[inputItemClass]}`
    );
    clonedResumeHardSkill.classList.add(
      `resume-cloned-hard-skill-${subsectionsClonesQuantities[inputItemClass]}`
    );

    inputHardSkillsContainer.appendChild(clonedInputHardSkill);
    resumeHardSkillsSection.appendChild(clonedResumeHardSkill);
    updateResumeFromClonedInputFields(
      clonedInputHardSkill,
      clonedResumeHardSkill,
      subsectionsClonesQuantities[inputItemClass]
    );
  });

  removeLastClone(
    btnRemoveLastHardSkill,
    inputHardSkillsContainer,
    resumeHardSkillsSection
  );
};

const addNewSoftSkill = function () {
  const btnAddNewSoftSkill = document.querySelector('.btn-add-new-soft-skill');
  const btnRemoveLastSoftSkill = document.querySelector(
    '.btn-remove-last-soft-skill'
  );
  const resumeSoftSkillsSection = document.querySelector(
    '.resume-list-soft-skills'
  );
  const resumeSoftSkill = document.querySelector(
    '.resume-list-item-soft-skills'
  );
  const inputSoftSkillsContainer = document.querySelector(
    '.soft-skills-container'
  );
  const inputItemClass = 'input-soft-skill';

  btnAddNewSoftSkill.addEventListener('click', () => {
    const inputFieldSoftSkill = inputSoftSkillsContainer.children[0];
    const clonedInputSoftSkill = inputFieldSoftSkill.cloneNode();
    clonedInputSoftSkill.value = '';

    const clonedResumeSoftSkill = resumeSoftSkill.cloneNode();
    clonedResumeSoftSkill.textContent = 'Umiejętność miękka';

    subsectionsClonesQuantities[inputItemClass]++;

    clonedInputSoftSkill.classList.add(
      `input-cloned-soft-skill-${subsectionsClonesQuantities[inputItemClass]}`
    );
    clonedResumeSoftSkill.classList.add(
      `resume-cloned-soft-skill-${subsectionsClonesQuantities[inputItemClass]}`
    );

    inputSoftSkillsContainer.appendChild(clonedInputSoftSkill);
    resumeSoftSkillsSection.appendChild(clonedResumeSoftSkill);
    updateResumeFromClonedInputFields(
      clonedInputSoftSkill,
      clonedResumeSoftSkill,
      subsectionsClonesQuantities[inputItemClass]
    );
  });

  removeLastClone(
    btnRemoveLastSoftSkill,
    inputSoftSkillsContainer,
    resumeSoftSkillsSection
  );
};

const addNewCertificate = function () {
  const btnAddNewCertificate = document.querySelector(
    '.btn-add-new-certificate'
  );
  const btnRemoveLastCertificate = document.querySelector(
    '.btn-remove-last-certificate'
  );
  const resumeCertificatesSection = document.querySelector(
    '.resume-list-certificates'
  );
  const resumeCertificate = document.querySelector(
    '.resume-list-item-certificate'
  );
  const inputCertificatesContainer = document.querySelector(
    '.certificates-container'
  );
  const inputItemClass = 'input-certificate';

  btnAddNewCertificate.addEventListener('click', () => {
    const inputFieldCertificate = inputCertificatesContainer.children[0];
    const clonedInputCertificate = inputFieldCertificate.cloneNode();
    clonedInputCertificate.value = '';

    const clonedResumeCertificate = resumeCertificate.cloneNode();
    clonedResumeCertificate.textContent = 'Certyfikat';

    subsectionsClonesQuantities[inputItemClass]++;

    clonedInputCertificate.classList.add(
      `input-cloned-certificate-${subsectionsClonesQuantities[inputItemClass]}`
    );
    clonedResumeCertificate.classList.add(
      `resume-cloned-certificate-${subsectionsClonesQuantities[inputItemClass]}`
    );

    inputCertificatesContainer.appendChild(clonedInputCertificate);
    resumeCertificatesSection.appendChild(clonedResumeCertificate);
    updateResumeFromClonedInputFields(
      clonedInputCertificate,
      clonedResumeCertificate,
      subsectionsClonesQuantities[inputItemClass]
    );
  });

  removeLastClone(
    btnRemoveLastCertificate,
    inputCertificatesContainer,
    resumeCertificatesSection
  );
};

const addNewEducationSection = function () {
  const btnAddNewEducation = document.querySelector('.btn-add-new-education');
  const btnRemoveLastEducation = document.querySelector(
    '.btn-remove-last-education-item'
  );
  const resumeEducationSection = document.querySelector('.resume-education');
  const resumeEducationContent = document.querySelector(
    '.resume-education-content'
  );
  const inputContentSectionClass = 'config-section-content-education';
  const inputEducationContent = document.querySelector(
    `.${inputContentSectionClass}`
  );

  btnAddNewEducation.addEventListener('click', () => {
    const formEl = inputEducationContent.children[0];
    const clonedInputSubsection = formEl.cloneNode(true);
    const clonedResumeSubsection = resumeEducationContent.cloneNode(true);
    subsectionsClonesQuantities[inputContentSectionClass]++;
    clearClonesValuesAndText(clonedInputSubsection, clonedResumeSubsection);
    clonedInputSubsection.classList.add(
      `input-cloned-education-section-${subsectionsClonesQuantities[inputContentSectionClass]}`
    );
    clonedResumeSubsection.classList.add(
      `resume-cloned-education-section-${subsectionsClonesQuantities[inputContentSectionClass]}`
    );

    inputEducationContent.appendChild(clonedInputSubsection);
    resumeEducationSection.appendChild(clonedResumeSubsection);
    updateResumeFromClonedSubsections(
      clonedInputSubsection,
      clonedResumeSubsection,
      subsectionsClonesQuantities[inputContentSectionClass]
    );
    degreeYearsSelectHandler(
      subsectionsClonesQuantities[inputContentSectionClass]
    );
  });
  removeLastClone(
    btnRemoveLastEducation,
    inputEducationContent,
    resumeEducationSection
  );
};

const addNewJobSection = function () {
  const btnAddNewJob = document.querySelector('.btn-add-new-job');
  const btnRemoveLastJob = document.querySelector('.btn-remove-last-job-item');
  const resumeJobSection = document.querySelector('.resume-job');
  const resumeJobContent = document.querySelector('.resume-job-content');
  const inputContentSectionClass = 'config-section-content-job';
  const inputJobContent = document.querySelector(
    `.${inputContentSectionClass}`
  );
  let jobCloneNum = subsectionsClonesQuantities[inputContentSectionClass];

  btnAddNewJob.addEventListener('click', () => {
    const formEl = inputJobContent.children[0];
    const clonedInputSubsection = formEl.cloneNode(true);
    const clonedResumeSubsection = resumeJobContent.cloneNode(true);
    subsectionsClonesQuantities[inputContentSectionClass]++;
    jobCloneNum++;
    clonedInputSubsection.classList.add(
      `input-cloned-job-section-${subsectionsClonesQuantities[inputContentSectionClass]}`
    );
    clonedResumeSubsection.classList.add(
      `resume-cloned-job-section-${subsectionsClonesQuantities[inputContentSectionClass]}`
    );

    inputJobContent.appendChild(clonedInputSubsection);
    resumeJobSection.appendChild(clonedResumeSubsection);
    updateResumeFromClonedSubsections(
      clonedInputSubsection,
      clonedResumeSubsection,
      jobCloneNum
    );
    jobYearsSelectHandler(jobCloneNum);
    // wróć dokończyć years select handler
  });

  removeLastClone(btnRemoveLastJob, inputJobContent, resumeJobSection);
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
        const resumeClonedElement = replaceClassOfClonedEl(
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

const replaceClassOfClonedEl = function (
  inputClasslist,
  inputElClass,
  clonedResumeSubsection,
  cloneNum
) {
  if (!inputClasslist.contains('input-currently-format')) {
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

  if (inputClasslist.contains('input-job-currently-working')) {
    inputClasslist.replace(inputElClass, `${inputElClass}-${cloneNum}`);
    const resumeClonedElement = clonedResumeSubsection.querySelector(
      `.resume-job-end-date-${cloneNum}`
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
  if (childrenQuantity >= 2) {
    const indexOfLastClonedChild = childrenQuantity - 1;
    return indexOfLastClonedChild;
  }
};

const toggleRemove = function () {
  const removeBtnList = document.querySelectorAll('.btn-remove');
  removeBtnList.forEach((removeBtn) => {
    const removeBtnMapping = getRemoveBtnMapping(removeBtn);

    const clonedElClass = removeBtnMapping.clonedEl;

    const addBtnClass = removeBtnMapping.addBtn;
    const btnAddItem = document.querySelector(`.${addBtnClass}`);

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

const clearClonesValuesAndText = function (inputSubsection, resumeSubsection) {
  console.log(inputSubsection);
  console.log(resumeSubsection);
};

export const cloneInitFunction = function () {
  addNewSocialMediaLink();
  addNewJobSection();
  addNewEducationSection();
  addNewHardSkill();
  addNewSoftSkill();
  addNewCertificate();
  toggleRemove();
};
