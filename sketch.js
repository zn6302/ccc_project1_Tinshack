const CANVAS_WIDTH = 2000;
const CANVAS_HEIGHT = 1400;
const PANEL_PADDING = 200;

const COLOR_THEMES = [
  {
    name: "rusty-blue",
    colors: ["#9DADBE", "#5D759A", "#222837", "#945031", "#945031", "#945031"],
    backgrounds: ["#945031"],
  },
  {
    name: "blue",
    colors: ["#9DADBE", "#5D759A", "#222837", "#945031"],
    backgrounds: ["#78ADE5", "#465365"],
  },
  {
    name: "light-blue",
    colors: ["#AACDEF", "#9DADBE", "#EDDBB3", "#5D759A", "#699BE5", "#DFDCD2"],
    backgrounds: ["#78ADE5", "#465365"],
  },
  {
    name: "warm-terracotta",
    colors: ["#C97B4A", "#8C4A3B", "#E8D5B5", "#3A3844", "#D98E5B"],
    backgrounds: ["#C97B4A", "#3A3844"],
  },
  {
    name: "sage-forest",
    colors: ["#8A9A82", "#4F5D4A", "#D9D4C0", "#2E3328", "#B5A98C"],
    backgrounds: ["#8A9A82", "#2E3328"],
  },
  {
    name: "dusty-mauve",
    colors: ["#B98C8C", "#8C7385", "#E6D9CC", "#4A3F42", "#C9A9A6"],
    backgrounds: ["#B98C8C", "#4A3F42"],
  },
];

let isRendering = false;

function setup() {
  const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  canvas.parent("sketch-container");
  pixelDensity(1);
  noLoop();
  generateArtwork();
}

async function generateArtwork() {
  if (isRendering) return;

  isRendering = true;
  cursor("progress");

  const theme = random(COLOR_THEMES);
  background(random(theme.backgrounds));

  let xOffset = 0;

  // 底層：連續排列的大面積浪板。
  for (let i = 0; i < 20; i += 1) {
    const columnCount = floor(random(5, 20));
    const rowCount = 350;
    const dotRadius = 4;
    const xSpacing = dotRadius + random(2, 5);
    const ySpacing = dotRadius + random(3);

    drawCorrugatedPanel(
      xOffset,
      0,
      columnCount,
      rowCount,
      xSpacing,
      ySpacing,
      dotRadius,
      theme.colors,
    );

    xOffset += columnCount * xSpacing;
    await delay(8);
  }

  // 中間層：散落並互相覆蓋的鐵皮片段。
  for (let i = 0; i < 200; i += 1) {
    const x = random(-PANEL_PADDING, width);
    const y = random(-PANEL_PADDING, height);
    const columnCount = floor(random(5, 20));
    const rowCount = floor(random(20, 200));
    const dotRadius = 4;
    const xSpacing = dotRadius + random(2, 5);
    const ySpacing = dotRadius + random(3);

    drawCorrugatedPanel(
      x,
      y,
      columnCount,
      rowCount,
      xSpacing,
      ySpacing,
      dotRadius,
      theme.colors,
    );

    await delay(8);
  }

  cursor("pointer");
  isRendering = false;
}

function drawCorrugatedPanel(
  startX,
  startY,
  columnCount,
  rowCount,
  xSpacing,
  ySpacing,
  dotRadius,
  palette,
) {
  const mainColor = color(random(palette));
  const lightColor = lerpColor(mainColor, color("#FFFFFF"), 0.45);
  const fadeAmount = random();
  const waveScale = random();

  for (let column = 0; column < columnCount; column += 1) {
    const x = startX + column * xSpacing;

    for (let row = 0; row < rowCount; row += 1) {
      const y = startY + row * ySpacing;
      const fadeRate = map(row / rowCount, 0, 1, 0, fadeAmount);

      if (random() <= fadeRate) continue;

      const stripeFrequency = waveScale < 0.3 ? 10 : waveScale < 0.7 ? 5 : 25;
      const isHighlight = abs(sin(x / stripeFrequency)) < 0.3;
      const radius = dotRadius * random(0.8, 1.5) + random(0.6, 0.8);

      noStroke();
      fill(isHighlight ? lightColor : mainColor);
      circle(x, y, radius);
    }
  }
}

function mousePressed() {
  const pointerIsInsideCanvas =
    mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height;

  if (pointerIsInsideCanvas && !isRendering) {
    generateArtwork();
  }
}

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}
