let bg = "img/game-background.png"
let interval, frames = 0
let fp = "caveman/caveman-pushing.gif"

let Bo =  'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_bottom.png?raw=true'

let To =  'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_top.png?raw=true'

let obstacles = []


window.onload = () => {
  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d')

  //Clases
  class Board {
    constructor(img){
      this.x = 0
      this.y = 0
      this.img = new Image()
      this.img.src = img
      this.img.onload = () => {
        this.draw()
        this.audio = new Audio()
        this.audio.src = './multimedia/jungle-beat.mp3'
        this.audio.loop = true
      }
    }
    draw(){
      if (this.x < -canvas.width) this.x = 0
      ctx.drawImage(this.img, this.x, this.y, canvas.width, canvas.height)
      ctx.drawImage(this.img, this.x + canvas.width, this.y, canvas.width, canvas.height)
      this.x--
    }
  }

  class Caveman{
    constructor(img, x, y){
      this.x = x
      this.y = y
      this.img = new Image()
      this.img.src = img
      this.img.onload = () => {
        this.draw()
      }
    }
    draw(){
      this.y = 255;
      ctx.drawImage(this.img, this.x, this.y, 135, 135)
    }
    walkRight(){
      this.x += 25
    }
    walkLeft(){
      this.x -= 25
    }
    walkUp(){
      this.y -= 25
    }
    walkDown(){
      this.y += 25
    }
    isTouching(obstacle){
      return  (this.x < obstacle.x + obstacle.width) &&
              (this.x + 15  > obstacle.x) &&
              (this.y < obstacle.y + obstacle.height) &&
              (this.y + 15 > obstacle.y)
    }
  }

   
  // class Pipe {
  //   constructor(y = 0, height = 270, type) {
  //     this.x = canvas.width
  //     this.y = y
  //     this.width = 20
  //     this.height = height
  //     this.type = type
  //     this.img1 = new Image()
  //     this.img2 = new Image()
  //     this.img1.src = Bo
  //     this.img2.src = To
  //   }
  //   draw() {
  //     if (this.type) {
  //       ctx.drawImage(this.img1, this.x, this.y, this.width, this.height)
  //     } else {
  //       ctx.drawImage(this.img2, this.x, this.y, this.width, this.height)
  //     }
  //     this.x--
  //   }
  // }

  // Definiciones
  const board = new Board(bg)
  const caveman = new Caveman(fp, 100, 100)

  // flujo principal
  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    board.draw()
    caveman.draw()
    generatePipes()
    drawPipes()
    checkCollition()
    ctx.fillText(Math.round((frames/1000)* 10), 100, 30)
    frames++
  }

  function startGame() {
    if (interval) return
    interval = setInterval(update, 1000/60) 
  }

  function gameOver() {
    clearInterval(interval)
    ctx.fillText('Perdiste broooo', 50, 50)
  }

  //listeners
  document.addEventListener('keydown', (e) => {
    
    switch (e.keyCode) {
      case 13:
      //board.audio.play()
        startGame()
        break;
      case 39: 
        caveman.walkRight()
        break;
      case 37: 
      caveman.walkLeft()
      break;
      case 38: 
      caveman.walkUp()
      break;
      case 40: 
      caveman.walkDown()
      break;
      default:
        break;
    }
  })

  //helpers

  // function generatePipes(){
  //   let ventanita = 50
  //   let randomHeight = Math.floor(Math.random() * ventanita) + 15
  //   if (frames % 120 === 0) {
  //     let obs1 = new Pipe(0, randomHeight, false)
  //     let obs2 = new Pipe(randomHeight + ventanita, canvas.height - (randomHeight - ventanita), true)
  //     obstacles.push(obs1)
  //     obstacles.push(obs2)
  //   }
  // }

  // function drawPipes() {
  //   obstacles.forEach(obstacle => {
  //     obstacle.draw()
  //   })
  // }

  function checkCollition() {
    obstacles.forEach(obstacle => {
      if (caveman.isTouching(obstacle)) gameOver()
    })
  }
}