"use strict";
const grassColor = "#AFE1AF";
const boatColor = "#C19A6C";
const flagColor = "#FF0000";
const oceanColor = "#c4f4fc";
const rockColor = "#3a3232";

/* global XXH */

function p3_preload() {}

function p3_setup() {}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return 32;
}
function p3_tileHeight() {
  return 32;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
  console.log(i, j);
}

function p3_drawBefore() {}

function p3_drawTile(i, j) {
  noStroke();
  
  fill(noise(i, j) * 255)

  push();

  drawFlag();

  let random = noise(i,j);
  if(random <= 0.2){
    drawIsland();
  }
  else if(random <= 0.4 && random >=0.3){
    drawBoat();
  }
  else{
    drawOcean();
  }
  let n = clicks[[i, j]] | 0;
  if (n % 2 == 1) {
    drawFlag();
  }

  pop();
}

function p3_drawSelectedTile(i, j) {
  noFill();
  stroke(0, 255, 0, 128);

  beginShape();
  vertex(0, 0);
  vertex(0, tw);
  vertex(th, tw);
  vertex(th, 0);
  endShape(CLOSE);

  noStroke();
  text("(" + [i, j] + ")", 0, 0);
}

function drawFlag(){

  beginShape();
  fill(flagColor);
  vertex(th/3*2,tw/3);
  vertex(th/3*2,tw/8);
  vertex(th/4,tw/5);
  stroke(20);
  endShape(CLOSE);

  line(th/3*2,tw/3, th/3*2, tw/2);

  stroke(127);

}

function drawOcean(){
  fill("#0099FF");
  noStroke();
  rect(0, 0, th, tw);
}

function drawBoat(){
  fill("#0099FF");

  noStroke();
  rect(0,0,th,tw);

  // boat
  fill(boatColor);
  beginShape();
  vertex(th/20, tw/2);
  vertex(th, tw/2);
  vertex(th/10*7, tw/7*5);
  vertex(th/10*3, tw/7*5);
  stroke(20);
  endShape(CLOSE);
  stroke(127);
}

function drawIsland(){

  fill("#3399FF");
  noStroke();
  rect(0, 0, th, tw);

  //rock
  fill(rockColor);
  beginShape();
  vertex(th/7, tw/3);
  vertex(th/7*3, tw/6);
  vertex(th/7*4, tw/6);
  vertex(th/7*5, tw/4);
  vertex(th/9*8, tw/7*5);
  vertex(th/11, tw/7*5);
  stroke(20);
  endShape(CLOSE);

  stroke(127);

}

function p3_drawAfter() {}
