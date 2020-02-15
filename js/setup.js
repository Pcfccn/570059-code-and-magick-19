'use strict';

(function () {
  window.setup = {
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
    NUMBER_OF_WIZARDS: 4,
    wizards: [],

    getRandomValue: function (min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  };

  var getWiazardsRandomOptions = function (wizardsList, numberOfWizards) {
    for (var i = 0; i < numberOfWizards; i++) {
      wizardsList.push({name: window.setup.NAMES[window.setup.getRandomValue(0, window.setup.NAMES.length - 1)]
        + ' ' + window.setup.SURNAMES[window.setup.getRandomValue(0, window.setup.SURNAMES.length - 1)],
      eyesColor: window.setup.EYES_COLORS[window.setup.getRandomValue(0, window.setup.EYES_COLORS.length - 1)],
      coatColor: window.setup.COAT_COLORS[window.setup.getRandomValue(0, window.setup.COAT_COLORS.length - 1)]});
    }
    return wizardsList;
  };


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
    for (var j = 0; j < window.setup.wizards.length; j++) {
      fragment.appendChild(createWizardClones(window.setup.wizards[j]));
    }
    similarListElement.appendChild(fragment);
  };

  getWiazardsRandomOptions(window.setup.wizards, window.setup.NUMBER_OF_WIZARDS);
  addWizardToPage();
  setupSimilarBlock.classList.remove('hidden');
})();
