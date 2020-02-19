'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var setupSimilarBlock = document.querySelector('.setup-similar');
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
    wizardCoat.style.fill = window.setup.CONST.COAT_COLORS[window.setup.getRandomValue(0, window.setup.CONST.COAT_COLORS.length - 1)];
    hiddenInputCoat.value = wizardCoat.style.fill;
  };
  var changeWizardEyesColor = function () {
    wizardEyes.style.fill = window.setup.CONST.EYES_COLORS[window.setup.getRandomValue(0, window.setup.CONST.EYES_COLORS.length - 1)];
    hiddenInputEyes.value = wizardEyes.style.fill;
  };
  var changeWizardFireballColor = function () {
    var colorNumber = window.setup.getRandomValue(0, window.setup.CONST.FIREBALLS_COLORS.length - 1);
    wizardFireball.style.background = window.setup.CONST.FIREBALLS_COLORS[colorNumber];
    hiddenInputFireball.value = window.setup.CONST.FIREBALLS_COLORS[colorNumber];
  };

  var onEnterKeySetupClose = function (evt) {
    if (evt.key === window.setup.CONST.ENTER_KEY) {
      closePopup();
    }
  };

  setupOpen.addEventListener('click', function () {
    openPopup();
  });
  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.key === window.setup.CONST.ENTER_KEY) {
      openPopup();
    }
  });
  var openPopup = function () {
    window.backend.load(function (wiz) {
      if (!document.querySelector('.setup-similar-item')) {
        window.setup.addWizardToPage(wiz);
        setupSimilarBlock.classList.remove('hidden');
      }
    });
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
    setup.style.top = '80px';
    setup.style.left = (innerWidth / 2 - setup.style.width / 2) + 'px';
    document.removeEventListener('keydown', onPopupEscPress);
    setupClose.removeEventListener('click', closePopup);
    setupClose.removeEventListener('keydown', onEnterKeySetupClose);
    wizardCoat.removeEventListener('click', changeWizardCoatColor);
    wizardEyes.removeEventListener('click', changeWizardEyesColor);
    wizardFireball.removeEventListener('click', changeWizardFireballColor);
  };

  var onPopupEscPress = function (evt) {
    if (evt.key === window.setup.CONST.ESC_KEY && evt.target !== userNameInput) {
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
    if (target.value.length < window.setup.CONST.MIN_NAME_LENGTH) {
      target.setCustomValidity(
          'Имя должно состоять минимум из ' +
          window.setup.CONST.MIN_NAME_LENGTH + '-х символов'
      );
    } else {
      target.setCustomValidity('');
    }
  });

  var form = setup.querySelector('.setup-wizard-form');
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function (response) {
      setup.classList.add('hidden');
      console.log('Данные успешно загружены');
    });
    evt.preventDefault();
  });

})();
