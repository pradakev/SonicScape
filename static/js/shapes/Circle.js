import { Shape } from './Shape.js'

// Create a class to work with and modify
export class Circle extends Shape {
  constructor(x, y, radius, color) {
    super(x, y, color)
    this.radius = radius
  }

  // Draw function is abstract and user defined
  // This function helps to actually render a shape onto the screen
  //
  draw(ctx) {
    // fillstyle to set color
    // this is an inline method 
    ctx.beginPath()
    ctx.fillStyle = this.color
    // this I'm assuming is what draws the actual things
    ctx.arc(this.x, this.y, this.radius,0, 2 * Math.PI, false)
    ctx.fill()
    ctx.closePath()
    // x and y positions are going to be affected
    // these rely on velocity values set before

    this.x += this.vx
    this.y += this.vy

    // bounce property of shapes
    if (this.x >= canvas.width - this.radius || this.x <= 0) {
      this.vx *= -1
    }
    if (this.y >= canvas.height - this.radius || this.y <= 0) {
      this.vy *= -1
    }
  }

  stringify() {
    return `Circle: x=${this.x}, y=${this.y}, radius=${this.radius}, color=${this.color}`;
  }

  parse(str) {
    const props = str.split(', ');
    this.x = parseInt(props[0].split('=')[1]);
    this.y = parseInt(props[1].split('=')[1]);
    this.radius = parseInt(props[2].split('=')[1]);
    this.color = props[3].split('=')[1];
  }
}


//   Export keyword allows use of function within other files

// separate function to create random squares within screen
export function createRandomCircle() {
  // coordinates of random circles should lie within canvas
  const xRange = canvas.width - 100;
  const yRange = canvas.height - 100;

  const x = Math.floor(Math.random() * xRange);
  const y = Math.floor(Math.random() * yRange);

  const radius = 50 + Math.floor(Math.random() * 50); // Random radius between 50 and 100

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

  return new Circle(x, y, radius, color);
}
