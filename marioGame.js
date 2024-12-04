import {canvas,ctx} from './canvas.js'
import {platforms} from './platformClass.js'
import { keyPressed, player } from './playerClass.js'
function animate(){
   
    ctx.clearRect(0,0,canvas.width,canvas.height)
    for(let i=0;i<platforms.length;i++){
        platforms[i].updatePlatform()
    }
    player.drawPlayer()
    if(keyPressed.right&&player.position.x>=400){
        for(let i=0;i<platforms.length;i++){
            platforms[i].velocity=-5
        } 
    }
    else{
        for(let i=0;i<platforms.length;i++){
            platforms[i].velocity=0
        } 
    }
    if(keyPressed.up){
        player.velocity.y=-10
    
   }
   else{
    player.velocity.y=5
   }
   //collision detection
    for(let i=0;i<platforms.length;i++){
      //  alert(player.position.x+" "+platforms[i].x+" "+Boolean(player.position.x>=platforms[i].x))
        if(player.position.y+player.height<=platforms[i].y&&player.position.y+player.height+player.velocity.y>platforms[i].y&&player.position.x+player.width>=platforms[i].x&&player.position.x<=platforms[i].x+platforms[i].width){
            player.velocity.y=0
        }
    }
player.updatePlayer()
const requestId=requestAnimationFrame(animate)
if(player.position.y>canvas.height||player.position.x>platforms[platforms.length-3].x){
    cancelAnimationFrame(requestId)
   let text=""
   if(player.position.x>platforms[platforms.length-3].x){
    text="You Won"
   }
   else{
     text="Game Over"
   }
   ctx.beginPath()
   ctx.fillStyle="white"
   ctx.font="48px serif"
   ctx.fillText(text,canvas.width/2,canvas.height/2)
   ctx.fill()
   ctx.closePath()
   ctx.beginPath()
    ctx.font="10px serif"
   ctx.strokeText("Press any key to restart game",canvas.width/1.8,canvas.height/1.8)
   //ctx.stroke()
   ctx.closePath()
   window.addEventListener('keydown',function(e){
    this.window.location.reload()
})

}
}
animate()
 