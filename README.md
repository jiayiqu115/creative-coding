## research
# URL：https://jiayiqu115.github.io/creative-coding/



## note and result
# first work 

<img width="400"  src="https://github.com/jiayiqu115/final/blob/main/0c5b2909cfb8ec7b50102ba00439b5d.jpg" />
<img width="600"  src="https://github.com/jiayiqu115/final/blob/main/404ed603efbf47aab96df58a4b06c45.png" />

# second work
<img width="600"  src="https://github.com/jiayiqu115/final/blob/main/8b15e6bbf0d2b8653ac58df672363ba.png" /> 
# improving 
i asked chat gpt how to improve it
chatgpt told me to add:
1.Color flow: Line and text colors change over time and maintain complementary color relationships
2.Organic movement: Lines drift slowly like water plants, and interact when the mouse approaches
3.Ambient glow: There is a soft colored glow around the mouse, and superimposed particles enhance details
4.Depth level: Create depth of field effect through translucent superposition
<img width="600"  src="https://github.com/jiayiqu115/final/blob/main/1285c803da756554549fd80b526e4ea.png" /> 
code that i add 

you can change the numbers to see differnt changings on the canvas
```
const CONFIG = {
  LINE_COUNT: 80,         
  TEXT_COUNT: 150,        
  MAX_SPEED: 2,          
  GLOW_SIZE: 200,         
  COLOR_SPEED: 0.7        
};
```

hsb colour( this is from chat gpt)
Using hue values in p5.js is a powerful way to create vibrant and dynamic color schemes. In p5.js, the colorMode() function allows you to switch to HSB (Hue, Saturation, Brightness) mode, which is more intuitive for working with colors in creative coding. Here's a detailed guide on how to use hue values effectively:
1. Setting Up HSB Mode
By default, p5.js uses RGB (Red, Green, Blue) mode. To switch to HSB mode, use the colorMode()

```
let hueValue = 0; /

function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100); 
  strokeWeight(2);
}

function draw() {
  background(0, 0, 95); 
  
  
  hueValue = (hueValue + 0.5) % 360;
  
  
  linesArray.forEach(lineObj => {
    let lineHue = (hueValue + random(-30, 30)) % 360;
    stroke(lineHue, 80, 70, 50); 
    line(lineObj.x1, lineObj.y1, lineObj.x2, lineObj.y2);
  });

 
  fill((hueValue + 180) % 360, 50, 100, 80); 
  // 
}
```
Make lines and text flow:

```
// 在 generateNew() 
function generateNew() {
  linesArray = [];
  for (let i = 0; i < 50; i++) { 
    linesArray.push({
      x1: random(width),
      y1: random(height),
      x2: random(width),
      y2: random(height),
      vx: random(-1, 1), // 
      vy: random(-1, 1)  // 
    });
  }
}

// 在 draw() 
function draw() {
 
  
 
  linesArray.forEach(lineObj => {
    lineObj.x1 += lineObj.vx;
    lineObj.y1 += lineObj.vy;
    lineObj.x2 += lineObj.vx * 0.5; 
    lineObj.y2 += lineObj.vy * 0.5;
    
    // 边界反弹
    if (lineObj.x1 < 0 || lineObj.x1 > width) lineObj.vx *= -1;
    if (lineObj.y1 < 0 || lineObj.y1 > height) lineObj.vy *= -1;
  });
}
```

mouth control

```
function mouseMoved() {
 
  linesArray.forEach(lineObj => {
    let d = dist(mouseX, mouseY, lineObj.x1, lineObj.y1);
    if (d < 100) {
      lineObj.vx += (mouseX - lineObj.x1) * 0.01;
      lineObj.vy += (mouseY - lineObj.y1) * 0.01;
    }
  });
}

function doubleClicked() {
  generateNew();
}
```










