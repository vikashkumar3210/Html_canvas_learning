const canvas=document.getElementById('canvas1')
const ctx=canvas.getContext('2d')
canvas.width=window.innerWidth
canvas.height=window.innerHeight
window.addEventListener('resize',function(){
    canvas.width=this.innerWidth
    canvas.height=this.innerHeight
})
//calculate distance between two balls
function getDistance(x1,y1,x2,y2){
    let xDistance=x1-x2
    let yDistance=y1-y2
    return Math.sqrt(Math.pow(xDistance,2)+Math.pow(yDistance,2))
}
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
        this.dx=1
        this.dy=1
    }
    drawBall(){
        ctx.beginPath()
        ctx.fillStyle=this.colour
        ctx.arc(this.x,this.y,this.radius,0,2*(Math.PI))
        ctx.fill()
    }
    update(){
       // this.colour='hsl('+Math.floor(Math.random()*360)+',100%,50%)'
       
       if(this.x+this.radius>canvas.width||this.x-this.radius<0){
        this.dx=-this.dx
       }
       if(this.y+this.radius>canvas.height||this.y-this.radius<0){
        this.dy=-this.dy
       }
       this.x+=this.dx
       this.y+=this.dy
        this.drawBall()
    }
}
for(let i=1;i<=50;i++){
    let x=Math.floor(Math.random()*(canvas.width-50))+20
    let y=Math.floor(Math.random()*(canvas.height-50))+20
    let radius=10
    let colour='hsl('+Math.floor(Math.random()*360)+',100%,50%)'
    particleArray.push(new Ball(x,y,1,radius,colour))
}
function handle(){
    for(let i=0;i<particleArray.length;i++){
        particleArray[i].update()
        for(let j=i+1;j<particleArray.length;j++){
            if(getDistance(particleArray[i].x,particleArray[i].y,particleArray[j].x,particleArray[j].y)<particleArray[i].radius+particleArray[j].radius){
                 particleArray[i].dx=-particleArray[i].dx
                 particleArray[j].dx=-particleArray[j].dx
                 particleArray[i].dy=-particleArray[i].dy
                 particleArray[j].dy=-particleArray[j].dy
                 particleArray[j].colour='hsl('+Math.floor(Math.random()*360)+',100%,50%)'
                  particleArray[i].colour='hsl('+Math.floor(Math.random()*360)+',100%,50%)'
            }
        }
    }
}
///animation
function animation(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    handle()
    requestAnimationFrame(animation)
}
animation()