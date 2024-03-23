// Abstract Shape Class

export class Shape {
  constructor(x, y, color)
  {
    this.x = x
    this.y = y
    this.color = color

    this.vx = Math.random() * 5
    this.vy = Math.random() * 5
  }
}
