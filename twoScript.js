import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js'
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";
    
(
  function () {


    // put firebase config HERE:

    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    

    // Play button
    // Create play button
    const playButton = document.createElement('button');
    playButton.textContent = "Play";
    document.body.appendChild(playButton);

     // Pause button
    // Create play button
    const pauseButton = document.createElement('button');
    pauseButton.textContent = "Pause";
    document.body.appendChild(pauseButton);
    pauseButton.addEventListener("click", () => {
      audio.pause()
    })

    playButton.addEventListener("click", () => {
      // Getting filename from originally uploaded mp3
      const audioName = localStorage.getItem('audioName');
    if (audioName != null) {
      // using filename, get file from storage
      // ref is built in function from firebase
      const audioRef = ref(storage, audioName); // reference to file
      getDownloadURL(audioRef) // retrieve from firebase
      .then((url) => {
  // url is firebase url
        fetch(url)
        .then(response => response.blob())
        .then(blob => {
          // using blob from url
      const audio = document.createElement('audio');
      audio.src = URL.createObjectURL(blob);
      audio.play();  // play audio
     

      // const body = document.querySelector('body');
      // body.appendChild(audio);
      // audio.play();
          
          var count = 32
                
          const FREQUENCY_BIN_COUNT = count;
          let analyser;
          const dataArray = new Uint8Array(FREQUENCY_BIN_COUNT);

          // Create audio context
          const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
          // Initialize analyser
          analyser = audioCtx.createAnalyser();
          analyser.fftSize = 2 * FREQUENCY_BIN_COUNT;


          // Analyser's frequencyBinCount is always half of the fftSize (https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/frequencyBinCount)
          const source = audioCtx.createMediaElementSource(audio);
          // Connect source -> analyser -> destination
          source.connect(analyser);
          analyser.connect(audioCtx.destination);

          // why do you need to grab this element?
    // to manipulate element
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
    // Abstract Shape Class
    class Shape{
      constructor(x, y, color)
      {
        this.x = x
        this.y = y
        this.color = color
  
        this.vx = Math.random() * 5
        this.vy = Math.random() * 5
      }
      draw()
      {

      }
    }

    class Triangle extends Shape{
      constructor(x, y, sideLength, color){
        // Calls shape constructor and replicates assignments
        super(x, y, color)
        this.sideLength = sideLength
 
      }
      draw() {
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

    }
    // Create a class to work with and modify
    class Circle extends Shape {
      constructor(x, y, radius, color) {
        super(x, y, color)
        this.radius = radius
      }
  
      // Draw function is abstract and user defined
      // This function helps to actually render a shape onto the screen
      //
      draw() {
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
    }
  
    // separate function to create random squares within screen
    function createRandomCircle() {
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

        // separate function to create random squares within screen
        function createRandomTriangle() {
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
    
    
  
    const FPS = 60
  
    const numCircles = count
    const circles = []
  
    for (let i = 0; i < numCircles; i++) {
      circles.push(createRandomCircle())
    }

    const triangles = []
    for (let i = 0; i < numCircles; i++) {
      triangles.push(createRandomTriangle())
    }
    
    setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      analyser.getByteFrequencyData(dataArray);
      for (let i = 0; i < circles.length; i++) {
        // circles[i].draw()
        // circles[i].radius = dataArray[i]
        triangles[i].draw()
        triangles[i].sideLength = dataArray[i]
      }
      
      console.log(dataArray);


      // dataArray manipulation
      

      }, 1000 / FPS)

    
        })
          
      })
    }
    
    },{once:true})
    // This makes it so that the click event is only listened to once
    // once:true
  }())