'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var BAR_WIDTH = 40;
var GAP_BETWEN_BAR = 50;
var MAX_BAR_HEIGHT = 150;

// var names = ['Вы', 'Кекс', 'Человек', 'Кто-то'];
// var times = [213, 202, 42, 105];

window.renderStatistics = function (ctx, names, times) {

  var renderCloud = function (ctxFromFunction, x, y, color, shadowColor, gap) {
    ctxFromFunction.fillStyle = shadowColor;
    ctxFromFunction.fillRect(x + gap, y + gap, CLOUD_WIDTH, CLOUD_HIGHT);
    ctxFromFunction.fillStyle = color;
    ctxFromFunction.fillRect(x, y, CLOUD_WIDTH, CLOUD_HIGHT);
  };

  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff', 'rgba(0, 0, 0, 0.7)', GAP);

  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000';
  ctx.fillText('Вы победили!', CLOUD_X + GAP + FONT_GAP, CLOUD_Y + GAP + FONT_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + GAP + FONT_GAP, CLOUD_Y + GAP + FONT_GAP * 2);

  var maxResult = 0;
  for (var i = 0; i < times.length; i++) {
    if (maxResult < times[i]) {
      maxResult = times[i];
    }
  }

  var createParticipant = function (name, number, time) {
    var barHeight = time * MAX_BAR_HEIGHT / maxResult;

    ctx.fillStyle = '#000';
    ctx.fillText(name, CLOUD_X + GAP + (BAR_WIDTH * (number - 1) + GAP_BETWEN_BAR * number), CLOUD_Y + CLOUD_HIGHT - GAP);
    ctx.fillText(Math.round(time), CLOUD_X + GAP + (BAR_WIDTH * (number - 1) + GAP_BETWEN_BAR * number), CLOUD_Y + CLOUD_HIGHT - GAP * 2 - FONT_GAP - barHeight);
    var fillColor = 'rgba(255, 0, 0, 1)';
    if (name !== 'Вы') {
      var randomSaturation = Math.floor(Math.random() * 100);
      fillColor = 'hsl(255, ' + randomSaturation + '%, 50%)';
    }
    ctx.fillStyle = fillColor;
    ctx.fillRect(CLOUD_X + GAP + (BAR_WIDTH * (number - 1) + GAP_BETWEN_BAR * number), CLOUD_Y + CLOUD_HIGHT - GAP - FONT_GAP - barHeight, BAR_WIDTH, barHeight);
  };

  for (var j = 0; j < names.length; j++) {
    createParticipant(names[j], j + 1, times[j]);
  }
};

