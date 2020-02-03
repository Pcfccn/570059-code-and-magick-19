'use strict';

var NAMES = ['Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'];

var SURNAMES = ['да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'];

var COAT_COLORS = ['rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'];

var EYES_COLORS = ['black',
  'red',
  'blue',
  'yellow',
  'green'];

var NUMBER_OF_WIZARDS = 4;
var wizards = [];

var getRandomValue = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

var getWiazardsRandomOptions = function (wizardsList, numberOfWizards) {
  for (var i = 0; i < numberOfWizards; i++) {
    wizardsList.push({name: NAMES[getRandomValue(0, NAMES.length - 1)] + ' ' + SURNAMES[getRandomValue(0, SURNAMES.length - 1)],
      eyesColor: EYES_COLORS[getRandomValue(0, EYES_COLORS.length - 1)],
      coatColor: COAT_COLORS[getRandomValue(0, COAT_COLORS.length - 1)]});
  }
  return wizardsList;
};

var setupBlock = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var setupSimilarBlock = document.querySelector('.setup-similar');

var createWizardClones = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var addWizardToPage = function () {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < wizards.length; j++) {
    fragment.appendChild(createWizardClones(wizards[j]));
  }
  similarListElement.appendChild(fragment);
};

setupBlock.classList.remove('hidden');
getWiazardsRandomOptions(wizards, NUMBER_OF_WIZARDS);
addWizardToPage();
setupSimilarBlock.classList.remove('hidden');
