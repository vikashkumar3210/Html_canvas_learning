const canvas=document.getElementById('canvas1')
const ctx=canvas.getContext('2d')
canvas.width=window.innerWidth
canvas.height=window.innerHeight
window.addEventListener('resize',function(){
    canvas.width=this.innerWidth
    canvas.height=this.innerHeight
})
let gravity=1
let friction=0.9
let particleArray=[]
const mouseCoordinates={
    x:undefined,
    y:undefined
}
class Ball{
    constructor(x,y,dy,radius,colour){
        this.x=x
        this.y=y
        this.radius=radius
        this.colour=colour
        this.dy=dy
    }
    drawBall(){
        ctx.beginPath()
        ctx.fillStyle=this.colour
        ctx.arc(this.x,this.y,this.radius,0,2*(Math.PI))
        ctx.fill()
    }
    update(){
       // this.colour='hsl('+Math.floor(Math.random()*360)+',100%,50%)'
        if(this.y+this.radius>canvas.height){
            this.dy=-(this.dy*friction)
        }
        else{
            this.dy+=gravity
        }
        this.y+=this.dy
        this.drawBall()
    }
}
for(let i=1;i<=50;i++){
    let x=Math.floor(Math.random()*canvas.width)-20
    let y=Math.floor(Math.random()*canvas.height)-20
    let radius=Math.floor(Math.random()*20)+10
    let colour='hsl('+Math.floor(Math.random()*360)+',100%,50%)'
    particleArray.push(new Ball(x,y,1,radius,colour))
}
function handle(){
    for(let i=0;i<particleArray.length;i++){
        //particleArray[i].drawBall()
        particleArray[i].update()
    }
}
///animation
function animation(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    handle()
    requestAnimationFrame(animation)
}
animation()