'use strict';

(function () {

  var CONST = {
    MIN_NAME_LENGTH: 2,
    ESC_KEY: 'Escape',
    ENTER_KEY: 'Enter',

    NAMES: [
      'Иван', 'Хуан Себастьян', 'Мария', 'Кристоф',
      'Виктор', 'Юлия', 'Люпита', 'Вашингтон'
    ],

    SURNAMES: [
      'да Марья', 'Верон', 'Мирабелла', 'Вальц',
      'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'
    ],

    COAT_COLORS: [
      'rgb(101, 137, 164)',
      'rgb(241, 43, 107)',
      'rgb(146, 100, 161)',
      'rgb(56, 159, 117)',
      'rgb(215, 210, 55)',
      'rgb(0, 0, 0)'
    ],

    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALLS_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
    NUMBER_OF_WIZARDS: 4
  };

  var getRandomValue = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');


  var createWizardClones = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return wizardElement;
  };

  var addWizardToPage = function (wiz) {
    var fragment = document.createDocumentFragment();
    var startJ = getRandomValue(0, wiz.length - CONST.NUMBER_OF_WIZARDS);
    for (var j = startJ; j < startJ + CONST.NUMBER_OF_WIZARDS; j++) {
      fragment.appendChild(createWizardClones(wiz[j]));
    }
    similarListElement.appendChild(fragment);
  };

  window.setup = {
    CONST: CONST,
    addWizardToPage: addWizardToPage,
    getRandomValue: getRandomValue
  };
})();
