import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js'
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";
    
(
  function () {
    // put firebase config HERE:
    
    const app = initializeApp(firebaseConfig);
    const storage = getStorage(app);
    
    window.addEventListener("click", () => {
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
            
                
          const FREQUENCY_BIN_COUNT = 64;
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
  
        this.vx = Math.random() * 10
        this.vy = Math.random() * 10
      }
      draw()
      {

      }
    }

    class Triangle extends Shape{
      constructor(x, y, sideLength, color){
        // Calls shape constructor and replicates assignments
        super(x, y, color)
        super.draw()
        // x and y will be 
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
    
        const colors = ["rgba(255, 0, 0, " + opacity + ")", "rgba(255, 0, 255, " + opacity + ")", "rgba(0, 0, 255, " + opacity + ")", "rgba(0, 255, 0, " + opacity + ")"];
        const color = colors[Math.floor(Math.random() * colors.length)];
    
        return new Circle(x, y, radius, color, opacity);
    }
    
  
    const FPS = 30
  
    const numCircles = 64
    const circles = []
  
    for (let i = 0; i < numCircles; i++) {
      circles.push(createRandomCircle())
    }
    
    setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      analyser.getByteFrequencyData(dataArray);
      for (let i = 0; i < circles.length; i++) {
        circles[i].draw()
        circles[i].radius = dataArray[i]
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