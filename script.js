(function () {
  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  class Square {
    constructor(x, y, width, height, color) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
      this.color = color

      this.vx = Math.random() * 10
      this.vy = Math.random() * 10
    }

    draw() {
      ctx.fillStyle = this.color
      ctx.fillRect(this.x, this.y, this.width, this.height)

      this.x += this.vx
      this.y += this.vy

      if (this.x >= canvas.width - this.width || this.x <= 0) {
        this.vx *= -1
      }
      if (this.y >= canvas.height - this.height || this.y <= 0) {
        this.vy *= -1
      }
    }
  }

  function createRandomSquare() {
    const xRange = canvas.width - 100
    const yRange = canvas.height - 100

    const x = Math.floor(Math.random() * xRange)
    const y = Math.floor(Math.random() * yRange)

    const opacity = Math.random()

    const colors = ["rgba(255, 0, 0, " + opacity + ")", "rgba(255, 0, 255, " + opacity + ")", "rgba(0, 0, 255, " + opacity + ")", "rgba(0, 255, 0, " + opacity + ")"]
    const color = colors[Math.floor(Math.random() * colors.length)]

    return new Square(x, y, 100, 100, color, opacity)
  }

  const FPS = 30

  const numSquares = 500
  const squares = []

  for (let i = 0; i < numSquares; i++) {
    squares.push(createRandomSquare())
  }

  setInterval(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    for (let i = 0; i < squares.length; i++) {
      squares[i].draw()
    }
  }, 1000 / FPS)
}())
