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

var wizards = [
  {
    name: '',
    coatColor: '',
    eyeColor: ''
  },
  {
    name: '',
    coatColor: '',
    eyeColor: ''
  },
  {
    name: '',
    coatColor: '',
    eyeColor: ''
  },
  {
    name: '',
    coatColor: '',
    eyeColor: ''
  }];

var setupBlock = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var setupSimilarBlock = document.querySelector('.setup-similar');

var getWiazardsRandomOptions = function () {

  for (var i = 0; i < wizards.length; i++) {
    wizards[i].name = NAMES[Math.round(Math.random() * (NAMES.length - 1))] + ' ' + SURNAMES[Math.round(Math.random() * (SURNAMES.length - 1))];
    wizards[i].coatColor = COAT_COLORS[Math.round(Math.random() * (COAT_COLORS.length - 1))];
    wizards[i].eyeColor = EYES_COLORS[Math.round(Math.random() * (EYES_COLORS.length - 1))];
  }
  return wizards;
};

var createWizardClones = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyeColor;
  return wizardElement;
};

var createFragment = function () {
  var fragment = document.createDocumentFragment();
  for (var j = 0; j < wizards.length; j++) {
    fragment.appendChild(createWizardClones(wizards[j]));
  }
  return fragment;
};

setupBlock.classList.remove('hidden');
getWiazardsRandomOptions();
similarListElement.appendChild(createFragment());
setupSimilarBlock.classList.remove('hidden');
