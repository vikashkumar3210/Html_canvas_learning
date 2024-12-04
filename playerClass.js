import { ctx,canvas } from "./canvas.js"
const keyPressed={
    right:false,
    left:false,
    up:false,
}
addEventListener('resize',function(){
    canvas.width=innerWidth*0.8
canvas.height=innerHeight*0.7
})
const playerImage=new Image()
class Player{
    constructor(x,y,width,height,imageSrc){
        this.position={
            x,
            y
        }
        this.width=width
        this.height=height
        this.velocity={
            x:0,
            y:1
        }
        this.gravity=1
        this.imageSrc=imageSrc
        this.frame=0
        this.sWidth=177
    }
    drawPlayer(){
       // ctx.fillStyle="red"
       playerImage.src=this.imageSrc
       ctx.drawImage(playerImage,this.sWidth*this.frame,0,this.sWidth,400,this.position.x,this.position.y,this.width,this.height)
       // ctx.fillRect()
    // ctx.fill()
    }
    updatePlayer(){
        //console.log(keyPressed)
        if(this.frame>29){
            this.frame=0
        }
        else{
            this.frame++
        }
        if(keyPressed.right&&this.position.x<=400){
            this.velocity.x=5
        }
        else if(keyPressed.left&&this.position.x>=1){
            this.velocity.x=-5
        }
        else{
          this.velocity.x=0
        }
        this.position.x+=this.velocity.x
        this.position.y+=this.velocity.y
    }
}
const player=new Player(1,0,50,150,'./img/spriteStandRight.png')
addEventListener('keydown',function({key}){
    console.log(key)
    switch(key){
        //W key press for jump
   case 'w':
    keyPressed.up=true
    break;
    //D key press for right movement
   case 'd':
    player.imageSrc='./img/spriteRunRight.png'
    player.sWidth=341
    player.width=127.875
    keyPressed.right=true
    player.frame=0
    break;
    //A key press for left movement
   case 'a':
    player.imageSrc='./img/spriteRunLeft.png'
    player.sWidth=341
    player.width=127.875
    player.frame=0
    keyPressed.left=true
    break;
    default:
        break;
    }
})
addEventListener('keyup',function({key}){
    console.log(key)
    switch(key){
        //W key press for jump
   case 'w':
    keyPressed.up=false
    break;
    //D key press for right movement
   case'd':
   player.imageSrc='./img/spriteStandRight.png'
   player.sWidth=177
   player.width=50
    player.frame=0
    keyPressed.right=false
    break;
    //A key press for left movement
   case 'a':
    keyPressed.left=false
    player.imageSrc='./img/spriteStandLeft.png'
    player.sWidth=177
    player.width=50
     player.frame=0
    break;
    default:
        break;
    }
})
export {player,keyPressed}