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
var COLORS = {
  CLOUD: '#fff',
  SHADOW: 'rgba(0, 0, 0, 0.7)',
  MAIN_PLAYER_BAR: 'rgba(255, 0, 0, 1)',
  TEXT: '#000'
};
var FONT_STYLE = '16px PT Mono';
var MAIN_PLAYER_NAME = 'Вы';

var renderText = function (ctx, x, y, text, font, color) {
  ctx.font = font;
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
};

var renderCloud = function (ctx, x, y, color, shadowColor, gap) {
  ctx.fillStyle = shadowColor;
  ctx.fillRect(x + gap, y + gap, CLOUD_WIDTH, CLOUD_HIGHT);
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HIGHT);
};

var getMaxTime = function (times) {
  var maxResult = 0;
  for (var i = 0; i < times.length; i++) {
    if (maxResult < times[i]) {
      maxResult = times[i];
    }
  }
  return maxResult;
};

var getBarColor = function (name) {
  var fillColor = name === MAIN_PLAYER_NAME ? COLORS.MAIN_PLAYER_BAR : 'hsl(255, ' + Math.floor(Math.random() * 100) + '%, 50%)';
  return fillColor;
};

var renderPlayerBar = function (ctx, name, number, time, maxTime) {
  var barHeight = time * MAX_BAR_HEIGHT / maxTime;
  var playerBarX = CLOUD_X + GAP + (BAR_WIDTH * (number - 1) + GAP_BETWEN_BAR * number);
  var playerNameY = CLOUD_Y + CLOUD_HIGHT - GAP;
  var playerBarY = playerNameY - FONT_GAP - barHeight;
  var playerTimeY = playerNameY - GAP - FONT_GAP - barHeight;
  renderText(ctx, playerBarX, playerNameY, name, FONT_STYLE, COLORS.TEXT);
  renderText(ctx, playerBarX, playerTimeY, Math.round(time), FONT_STYLE, COLORS.TEXT);
  ctx.fillStyle = getBarColor(name);
  ctx.fillRect(playerBarX, playerBarY, BAR_WIDTH, barHeight);
};

var renderTitle = function (ctx) {
  var titleX = CLOUD_X + GAP + FONT_GAP;
  var titleYLine1 = CLOUD_Y + GAP + FONT_GAP;
  var titleYLine2 = titleYLine1 + FONT_GAP;
  renderText(ctx, titleX, titleYLine1, 'Вы победили!', FONT_STYLE, COLORS.TEXT);
  renderText(ctx, titleX, titleYLine2, 'Список результатов:', FONT_STYLE, COLORS.TEXT);
};

window.renderStatistics = function (ctx, names, times) {
  var maxTime = getMaxTime(times);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, COLORS.CLOUD, COLORS.SHADOW, GAP);
  renderTitle(ctx);
  for (var j = 0; j < names.length; j++) {
    renderPlayerBar(ctx, names[j], j + 1, times[j], maxTime);
  }
};

