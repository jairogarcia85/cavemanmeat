let bg = "img/game-background.png"
let interval, frames = 0
let cmr = "caveman/caveman-sprite.png"
let cml = "caveman/caveman-sprite-left.png"
let Bo =  'img/rock.png'
let rick = 'rick-sanchez/rick-dicking.gif'

//let To =  'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_top.png?raw=true'

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
      this.y = 255
      this.img = new Image()
      this.img.src = img
      this.sx = 0
      this.sy = 0
      this.img.onload = () => {
        this.draw()
      }
    }
    draw(){

      //ctx.drawImage(this.img, this.x, this.y, 135, 135)
      if (this.sx > 3228) this.sx = 0
        ctx.drawImage(
          this.img,
          this.sx,
          this.sy,
          269,
          350,
          this.x,
          this.y,
          135,
          135
        )
        this.sx += 270;
    }

    walkRight(){
      if(this.x > 660){
        this.x = 660
      }
      this.x += 25
    }
    walkLeft(){
      if(this.x < 15){
        this.x = -10
      }
      this.x -= 25
    }
    walkUp(){
      this.y -= 25
    }
    walkDown(){
      
      if(this.y < 250){
        this.y += 25
         }
    }

    gravity() {
      if(this.y < 250){
        this.y++
      }
    }

    isTouching(obstacle){
      return  (this.x < obstacle.x + obstacle.width) &&
              (this.x + 75  > obstacle.x) 
              //  &&
              //  (this.y < obstacle.y + obstacle.height) &&
              //  (this.y + 15 > obstacle.y)
    }
  }

   
  class Pipe {
    constructor(y = canvas.height, height = 50, type) {
      this.x = canvas.width
      this.y = y
      this.width = 100
      this.height = height
      this.type = type
      this.img1 = new Image()
      //this.img2 = new Image()
      this.img1.src = Bo
      //this.img2.src = To
      this.img1.onload = () => {this.draw ()
      }
    }
    draw() {
      if (this.type) {
        ctx.drawImage(this.img1, this.x, this.y, this.width, this.height)
      } 
      // else {
      //   ctx.drawImage(this.img2, this.x, this.y, this.width, this.height)
      // }
      this.x--
    }
  }

  // Definiciones
  const board = new Board(bg)
  const caveman = new Caveman(cmr, 100, 100)

  // flujo principal
  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    board.draw()
    caveman.draw()
    generatePipes()
    drawPipes()
    caveman.gravity()
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
    //ctx.fillText('Perdiste broooo', 50, 50)
    const img = new Image()
    img.src = rick
    img.onload = () => {
    ctx.drawImage(img, 155, 65, 480, 269)
    }
  }


  //listeners
  document.addEventListener('keydown', (e) => {
    e.preventDefault()
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

  function generatePipes(){
    //let alt = 20 
    //let randomHeight = Math.floor(Math.random() * alt) + 10
      let randomCreation = Math.floor(Math.random() * 900)
    if (frames % randomCreation === 0) {
      let obs1 = new Pipe(350, 50, true)
      //let obs1 = new Pipe(350, randomHeight, true)
      //let obs2 = new Pipe(randomHeight + ventanita, canvas.height - (randomHeight - ventanita), true)
      obstacles.push(obs1)
      //obstacles.push(obs2)
    }
  }

  function drawPipes() {
    obstacles.forEach(obstacle => {
      obstacle.draw()
    })
  }

  function checkCollition() {
    obstacles.forEach(obstacle => {
      if (caveman.isTouching(obstacle)) gameOver()
    })
  }
}