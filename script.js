(function () {
  // why do you need to grab this element?
  // what is 2d context?
  const canvas = document.getElementById("canvas")
  const ctx = canvas.getContext("2d")

  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  // i'm going to assume this is necessary for each window
  addEventListener("resize", () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  })

  // Create a class to work with and modify
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

    // Draw function is abstract and user defined
    // This function helps to actually render a shape onto the screen
    //
    draw() {
      // fillstyle to set color
      // this is an inline method 
      ctx.fillStyle = this.color
      // this I'm assuming is what draws the actual things
      ctx.fillRect(this.x, this.y, this.width, this.height)

      // x and y positions are going to be affected
      // these rely on velocity values set before

      this.x += this.vx
      this.y += this.vy

      // bounce property of shapes
      if (this.x >= canvas.width - this.width || this.x <= 0) {
        this.vx *= -1
      }
      if (this.y >= canvas.height - this.height || this.y <= 0) {
        this.vy *= -1
      }
    }
  }

  // separate function to create random squares within screen
  function createRandomSquare() {
    // coordinates of random squares should lie within canvas
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
