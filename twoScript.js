import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js'
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-storage.js";
import { Circle, createRandomCircle } from './Circle.js';
import { Triangle, createRandomTriangle } from './Triangle.js';
import { firebaseConfig } from './firebaseConfig.js';

(
  function () {

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

// i'm going to assume this is necessary for each window
addEventListener("resize", () => {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
})


const shapes = JSON.parse(localStorage.getItem("shapes")) || [];
const parsedShapes = shapes.map(shape => {
  if (shape.split(":")[0] === "Circle") {
    let x = parseInt(shape.split(", ")[0].split("=")[1])
    let y = parseInt(shape.split(", ")[1].split("=")[1])
    let radius = parseInt(shape.split(", ")[2].split("=")[1])
    let color = shape.split("color=")[1]
    return new Circle(x, y, radius, color)
  }
  else {
    let x = parseInt(shape.split(", ")[0].split("=")[1])
    let y = parseInt(shape.split(", ")[1].split("=")[1])
    let sideLength = parseInt(shape.split(", ")[2].split("=")[1])
    let color = shape.split("color=")[1]
    return new Triangle(x, y, sideLength, color)
  }
})

for (let i = 0; i < parsedShapes.length; i++) {

  // circles[i].draw()
  // circles[i].radius = dataArray[i]
  parsedShapes[i].draw(ctx)
  // triangles[i].sideLength = dataArray[i]
}

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
  
  
    
  
    
    
    
  
    const FPS = 60
  
    const numShapes = count
    // LocalStorage can be called from HTML or JavaScript
  
    if (shapes.length === 0) {
      for (let i = 0; i < numShapes; i++) {
        const shapeProb = Math.round(Math.random()) * 2
  
        if (shapeProb === 0) {
          var circle = createRandomCircle()
          circle.draw(ctx)
          shapes.push(circle)
        }
        else {
          var triangle = createRandomTriangle()
          triangle.draw(ctx)
          shapes.push(triangle)
        }
      }
    }
    
    setInterval(() => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      analyser.getByteFrequencyData(dataArray);
      for (let i = 0; i < parsedShapes.length; i++) {
        // circles[i].draw()
        // circles[i].radius = dataArray[i]
        if (parsedShapes[i].constructor.name === "Circle") {
          parsedShapes[i].radius = dataArray[i]
        }
        else {
          parsedShapes[i].sideLength = dataArray[i]
        }
        parsedShapes[i].draw(ctx)
        // triangles[i].sideLength = dataArray[i]
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