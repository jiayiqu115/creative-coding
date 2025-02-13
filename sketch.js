
const CONFIG = {
  LINE_COUNT: 80,       
  TEXT_COUNT: 150,      
  MAX_SPEED: 1.5,       
  HUE_SPEED: 0.7,       
  GLOW_SIZE: 200,       
  PARTICLE_COUNT: 30    
};

// === 全局变量 ===
let linesArray = [];
let words = ["无限", "网络", "意识", "孤独", "随机"];
let hueValue = 0;
let glowBuffer;

// === 初始化 ===
function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100); 
  textAlign(CENTER, CENTER);
  textSize(20);
  glowBuffer = createGraphics(width, height); 
  glowBuffer.blendMode(SCREEN); 
  generateNew();
}


function generateNew() {
  
  linesArray = [];
  for (let i = 0; i < CONFIG.LINE_COUNT; i++) {
    linesArray.push({
      x1: random(width),
      y1: random(height),
      x2: random(width * 0.2, width * 0.8), 
      y2: random(height * 0.2, height * 0.8),
      vx: random(-CONFIG.MAX_SPEED, CONFIG.MAX_SPEED),
      vy: random(-CONFIG.MAX_SPEED, CONFIG.MAX_SPEED)
    });
  }
}


function draw() {
  background(0, 0, 95); 
  
  
  hueValue = (hueValue + CONFIG.HUE_SPEED) % 360;
  
  drawLines();    
  drawText();     
  drawGlow();     
  drawParticles();
}


function drawLines() {
  linesArray.forEach(lineObj => {
    
    if (lineObj.x1 < 0 || lineObj.x1 > width) lineObj.vx *= -1;
    if (lineObj.y1 < 0 || lineObj.y1 > height) lineObj.vy *= -1;
    
    
    lineObj.x1 += lineObj.vx;
    lineObj.y1 += lineObj.vy;
    lineObj.x2 += lineObj.vx * 0.3;
    lineObj.y2 += lineObj.vy * 0.3;
    
    const lineHue = (hueValue + map(lineObj.x1, 0, width, -30, 30)) % 360;
    stroke(lineHue, 80, 70, 50);
    line(lineObj.x1, lineObj.y1, lineObj.x2, lineObj.y2);
  });
}

function drawText() {
  noStroke();
  fill((hueValue + 180) % 360, 50, 100, 80); 
  for (let i = 0; i < CONFIG.TEXT_COUNT; i++) {
    push();
    translate(random(width), random(height));
    rotate(random(-QUARTER_PI, QUARTER_PI));
    textSize(random(15, 40));
    text(random(words), 0, 0);
    pop();
  }
}

// 
function drawGlow() {
  glowBuffer.clear();
  
  
  const glowHue = (hueValue + 60) % 360;
  glowBuffer.fill(glowHue, 30, 100, 20);
  glowBuffer.ellipse(mouseX, mouseY, CONFIG.GLOW_SIZE);
  
  
  for (let i = 0; i < 5; i++) {
    glowBuffer.fill(random(360), 50, 100, 10);
    glowBuffer.ellipse(random(width), random(height), random(50, 150));
  }
  
 
  image(glowBuffer, 0, 0);
}

function drawParticles() {
  noStroke();
  fill(hueValue, 80, 100, 50);
  for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
    ellipse(
      random(width),
      random(height),
      random(2, 5)
    );
  }
}


function mouseMoved() {
  
  linesArray.forEach(lineObj => {
    const distance = dist(mouseX, mouseY, lineObj.x1, lineObj.y1);
    if (distance < 100) {
      lineObj.vx += (mouseX - pmouseX) * 0.1;
      lineObj.vy += (mouseY - pmouseY) * 0.1;
    }
  });
}

function doubleClicked() {
  generateNew(); 
}
function keyPressed() {
  if (key === 's') saveCanvas('generative_art', 'png'); // 
}