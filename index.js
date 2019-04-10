let bg = "img/game-background.png"
let interval, frames = 0
let cmr = "caveman/caveman-sprite.png"
let cml = "caveman/caveman-sprite-left.png"
let Bo =  'img/flame-line.png'
let carne = 'img/meat-mod2.png'
let lava = 'img/magma-sprite-400.png'
let rick = 'rick-sanchez/rick-dicking.gif'

//let To =  'https://github.com/ironhack-labs/lab-canvas-flappybirds/blob/master/starter_code/images/obstacle_top.png?raw=true'

let obstacles = []
let prizes = []


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
      if(this.y > 0){
        this.y -= 25
         }
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
      return  (this.x  < obstacle.x  + 50) &&
              (this.x +85 > obstacle.x) 
              &&
              (this.y + 95 < obstacle.y + obstacle.height) &&
              (this.y + 110 > obstacle.y)
    }

    getPoints(prize){
      return  (this.x < prize.x + prize.width) &&
              (this.x + 75  > prize.x) 
              &&
               (this.y < prize.y + prize.height) &&
               (this.y + 15 > prize.y)
    }

  }

   
  class Pipe {
    constructor(y = canvas.height, height = 50, type) {
      this.x = canvas.width
      this.y = y
      this.width = 75
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


  class Meat {
    constructor(y = canvas.height, height = 50, type) {
      this.x = canvas.width
      this.y = y
      this.width = 100
      this.height = height
      this.type = type
      this.img2 = new Image()
      //this.img2 = new Image()
      this.img2.src = carne
      //this.img2.src = To
      this.img2.onload = () => {this.draw ()
      }
    }
    draw() {
      if (this.type) {
        ctx.drawImage(this.img2, this.x, this.y, this.width, this.height)
      } 
      // else {
      //   ctx.drawImage(this.img2, this.x, this.y, this.width, this.height)
      // }
      this.x--
    }
  }


  class Magma{
    constructor(img, x, y){
      this.x = -10
      this.y = 250
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
      if (this.sx > 10300) this.sx = 0
        ctx.drawImage(
          this.img,
          this.sx,
          this.sy,
          800,
          600,
          this.x,
          this.y,
          200,
          200
        )
        this.sx += 800;
    } 
  }


  // Definiciones
  const board = new Board(bg)
  const caveman = new Caveman(cmr, 200, 100)
  const meat = new Meat(carne, 150, 150)
  const magma = new Magma(lava, 100, 100)

  // flujo principal
  function update() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    board.draw()
    meat.draw()
    caveman.draw()
    generatePipes()
    drawPipes()
    drawMeat()
    generateMeat()
    magma.draw()
    caveman.gravity()
    eatMeat()
    checkCollition()
    ctx.fillText(Math.round((frames/1000)* 10), 100, 30)
    frames++
  }

  function startGame() {
    if (interval) return
    interval = setInterval(update, 1000/60) 
  }

  function removeMeat(i){
    prizes.splice(i,1)
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
      let randomCreation = Math.floor(Math.random() * 999)
    if (frames % randomCreation === 0) {
      let obs1 = new Pipe(350, 50, true)
      //let obs1 = new Pipe(350, randomHeight, true)
      //let obs2 = new Pipe(randomHeight + ventanita, canvas.height - (randomHeight - ventanita), true)
      obstacles.push(obs1)
      //obstacles.push(obs2)
    }
  }

  function generateMeat(){
    //let alt = 20 
    //let randomHeight = Math.floor(Math.random() * alt) + 10
      let randomCreation = Math.floor(Math.random() * 1900)
    if (frames % randomCreation === 0) {
      let randomHeight = Math.floor(Math.random() * 280)
      let obs2 = new Meat(randomHeight, 50, true)
      //let obs1 = new Pipe(350, randomHeight, true)
      //let obs2 = new Pipe(randomHeight + ventanita, canvas.height - (randomHeight - ventanita), true)
      prizes.push(obs2)
      //obstacles.push(obs2)
    }
  }

  function drawMeat() {
    prizes.forEach(prize => {
      prize.draw()
    })
  }
  
  function eatMeat() {
    prizes.forEach((prize, i) => {
      console.log(caveman.getPoints(prize))
      if (caveman.getPoints(prize)) removeMeat(i)
    })
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