import { canvas ,ctx} from "./canvas.js"
const image=new Image()
image.src='./img/platform.png'
console.log(image)
class Platform{
    constructor(x,y,width,height){
        this.x=x
        this.y=y
        this.width=width
        this.height=height
        this.velocity=0
    }
    drawPlatform(){
       // ctx.fillStyle="blue"
        ctx.drawImage(image,this.x,this.y,this.width,this.height)
        //ctx.fillRect(this.x,this.y,this.width,this.height)
        //ctx.fill()
    }
    updatePlatform(){
      this.drawPlatform()
      this.x+=this.velocity
     // this.x-=this.velocity
    }
    
}
//const platform=new Platform(0,canvas.width,50)
let platforms=[]

let totalWidth=0
for(let i=0;i<50;i++){
    let gap=Math.floor(Math.random()*(500-100+1))+100
    let width=Math.floor(Math.random()*(600-300+1))+300
    platforms.push(new Platform(totalWidth,canvas.height-50,width,50))
    if(gap>=250){
        platforms.push(new Platform(totalWidth+width+gap/4,canvas.height-(Math.floor(Math.random()*(250-100+1))+80),Math.floor(Math.random()*(300-100+1))+100,40))
      }
    totalWidth+=(width+gap)
}
export {platforms,totalWidth}