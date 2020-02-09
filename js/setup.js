'use strict';
var MIN_NAME_LENGTH = 2;
var ESC_KEY = 'Escape';
var ENTER_KEY = 'Enter';

var NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var FIREBALLS_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

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

var setup = document.querySelector('.setup');
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

getWiazardsRandomOptions(wizards, NUMBER_OF_WIZARDS);
addWizardToPage();
setupSimilarBlock.classList.remove('hidden');

var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var userNameInput = setup.querySelector('.setup-user-name');
var wizardCoat = document.querySelector('.setup-wizard .wizard-coat');
var hiddenInputCoat = document.querySelector('input[name=coat-color]');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var hiddenInputEyes = document.querySelector('input[name=eyes-color]');
var wizardFireball = document.querySelector('.setup-fireball-wrap');
var hiddenInputFireball = document.querySelector('.setup-fireball-wrap input');

var changeWizardCoatColor = function () {
  wizardCoat.style.fill = COAT_COLORS[getRandomValue(0, COAT_COLORS.length - 1)];
  hiddenInputCoat.value = wizardCoat.style.fill;
};
var changeWizardEyesColor = function () {
  wizardEyes.style.fill = EYES_COLORS[getRandomValue(0, EYES_COLORS.length - 1)];
  hiddenInputEyes.value = wizardEyes.style.fill;
};
var changeWizardFireballColor = function () {
  var colorNumber = getRandomValue(0, FIREBALLS_COLORS.length - 1);
  wizardFireball.style.background = FIREBALLS_COLORS[colorNumber];
  hiddenInputFireball.value = FIREBALLS_COLORS[colorNumber];
};

var onEnterKeySetupClose = function (evt) {
  if (evt.key === ENTER_KEY) {
    closePopup();
  }
};

setupOpen.addEventListener('click', function () {
  openPopup();
});
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.key === ENTER_KEY) {
    openPopup();
  }
});
var openPopup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
  setupClose.addEventListener('click', closePopup);
  setupClose.addEventListener('keydown', onEnterKeySetupClose);
  wizardCoat.addEventListener('click', changeWizardCoatColor);
  wizardEyes.addEventListener('click', changeWizardEyesColor);
  wizardFireball.addEventListener('click', changeWizardFireballColor);
};

var closePopup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
  setupClose.removeEventListener('click', closePopup);
  setupClose.removeEventListener('keydown', onEnterKeySetupClose);
  wizardCoat.removeEventListener('click', changeWizardCoatColor);
  wizardEyes.removeEventListener('click', changeWizardEyesColor);
  wizardFireball.removeEventListener('click', changeWizardFireballColor);
};

var onPopupEscPress = function (evt) {
  if (evt.key === ESC_KEY && evt.target !== userNameInput) {
    closePopup();
  }
};

userNameInput.addEventListener('invalid', function () {
  if (userNameInput.validity.tooShort) {
    userNameInput.setCustomValidity('Имя должно состоять минимум из 2-х символов');
  } else if (userNameInput.validity.valueMissing) {
    userNameInput.setCustomValidity('Обязательное поле');
  } else {
    userNameInput.setCustomValidity('');
  }
});

userNameInput.addEventListener('input', function (evt) {
  var target = evt.target;
  if (target.value.length < MIN_NAME_LENGTH) {
    target.setCustomValidity(
        'Имя должно состоять минимум из ' +
      MIN_NAME_LENGTH + '-х символов'
    );
  } else {
    target.setCustomValidity('');
  }
});

