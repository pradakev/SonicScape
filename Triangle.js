import { Shape } from './Shape.js';

export class Triangle extends Shape {
  constructor(x, y, sideLength, color){
    // Calls shape constructor and replicates assignments
    super(x, y, color)
    this.sideLength = sideLength
  }

  draw(ctx) {
    // Save the current canvas state
    ctx.save();

    // Set the fill color
    ctx.fillStyle = this.color;

    // Calculate the coordinates of the triangle vertices
    const x1 = this.x;
    const y1 = this.y - (Math.sqrt(3) / 2) * this.sideLength;
    const x2 = this.x - this.sideLength / 2;
    const y2 = this.y + (Math.sqrt(3) / 2) * this.sideLength;
    const x3 = this.x + this.sideLength / 2;
    const y3 = y2;

    // Draw the triangle
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fill();
    // Move the triangle based on its velocity
    this.x += this.vx;
    this.y += this.vy;

    // Check for collision with the canvas boundaries
    if (this.x >= canvas.width - this.sideLength / 2 || this.x <= this.sideLength / 2) {
      this.vx *= -1; // Reverse the horizontal velocity
    }
    if (this.y >= canvas.height - (Math.sqrt(3) / 2) * this.sideLength || this.y <= (Math.sqrt(3) / 2) * this.sideLength) {
      this.vy *= -1; // Reverse the vertical velocity
    }
    // Restore the canvas state
    ctx.restore();
  }

  stringify() {
    return `Triangle: x=${this.x}, y=${this.y}, sideLength=${this.sideLength}, color=${this.color}`;
  }

  parse(str) {
    const props = str.split(', ');
    this.x = parseInt(props[0].split('=')[1]);
    this.y = parseInt(props[1].split('=')[1]);
    this.sideLength = parseInt(props[2].split('=')[1]);
    this.color = props[3].split('=')[1];
  }
}

// separate function to create random squares within screen
export function createRandomTriangle() {
    // coordinates of random circles should lie within canvas
    const xRange = canvas.width - 100;
    const yRange = canvas.height - 100;

    const x = Math.floor(Math.random() * xRange);
    const y = Math.floor(Math.random() * yRange);

    const sideLength = 50 + Math.floor(Math.random() * 50); // Random radius between 50 and 100

    const opacity = Math.random();

    const colors = [
      "rgba(255, 50, 100, " + opacity + ")",    // Coral Pink
      "rgba(30, 144, 255, " + opacity + ")",    // Dodger Blue
      "rgba(218, 112, 214, " + opacity + ")",   // Orchid
      "rgba(255, 215, 0, " + opacity + ")",     // Gold
      "rgba(0, 206, 209, " + opacity + ")",     // Dark Turquoise
      "rgba(255, 105, 180, " + opacity + ")",   // Hot Pink
      "rgba(127, 255, 0, " + opacity + ")",     // Chartreuse
      "rgba(0, 255, 127, " + opacity + ")",     // Spring Green
      "rgba(255, 192, 203, " + opacity + ")",   // Pink
      "rgba(46, 139, 87, " + opacity + ")",     // Sea Green
      "rgba(255, 99, 71, " + opacity + ")",     // Tomato
      "rgba(70, 130, 180, " + opacity + ")",    // Steel Blue
      "rgba(255, 20, 147, " + opacity + ")"     // Deep Pink
    ];

    const color = colors[Math.floor(Math.random() * colors.length)];

    return new Triangle(x, y, sideLength, color);
}
