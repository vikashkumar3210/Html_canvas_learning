const canvas=document.getElementById('canvas1')   //get canvas element refference
const ctx=canvas.getContext('2d')   
let particleArray=[]
let hue=0
//hue saturation lightness(hsl) is colur unit we can use to set colour like hexa value aur rgba . syntax= hsl(angle(in number),saturation(in percentage(0-100%)),lightness(in percentage(0-100%)))
canvas.width=window.innerWidth
    canvas.height=window.innerHeight
//     ctx.fillStyle='white'
//     ctx.fillRect(10,20,150,50)
//     ctx.beginPath() //it is use tell javascript that   shape drawn using lines and different fron others 
//     ctx.arc(100,200,50,0,2*(Math.PI)) //its take arc(x(in number),y(in number),radius(in number),startAngle(in radian),endAngle(in radian))
//     ctx.fillStyle='red' //it use to fill background colour
//     ctx.strokeStyle='green' //it is use to set outline colour
//     //ctx.fill() //it make background colour to be visible
//     ctx.stroke()//it make outline colur to be visible
//     ctx.lineWidth=15
window.addEventListener('resize',function(){
    canvas.width=window.innerWidth
    canvas.height=window.innerHeight
})
//     ctx.fillStyle='white'
//     ctx.fillRect(10,20,150,50)
//     ctx.beginPath() //it is use tell javascript that   shape drawn using lines and different fron others 
//     ctx.arc(100,200,50,0,2*(Math.PI)) //its take arc(x(in number),y(in number),radius(in number),startAngle(in radian),endAngle(in radian))
//     ctx.fillStyle='red' //it use to fill background colour
//     ctx.strokeStyle='green' //it is use to set outline colour
//     ctx.fill() //it make background colour to be visible
//     ctx.stroke()//it make outline colur to be visible
//     ctx.lineWidth=10
// })
//adding paint brush functionality

const coordinates={
    x:undefined,  
    y:undefined
}
const mousemove={
    x:undefined,
    y:undefined
}
// function drawCircle(){
//     ctx.beginPath()
//     ctx.fillStyle='blue'
//     ctx.arc(coordinates?.x,coordinates?.y,20,0,2*(Math.PI))
//     ctx.fill()
    
// }
const x=canvas.addEventListener('click',function(event){
    coordinates.x=event.x //event.x gives current mouse position x coordinate
    coordinates.y=event.y //event.y gives current mouse position y coordinate
    for(let i=1;i<=10;i++){
   particleArray.push(new Particle())
    }
    //drawCircle()
})
canvas.addEventListener('mouseover',function(event){
     mousemove.x=event.x
     mousemove.y=event.y
})
class Particle{
    constructor(){
        this.x=coordinates.x
        this.y=coordinates.y
        this.speedX=Math.random()*3-1.5
        this.speedY=Math.random()*3-1.5
        this.size=Math.random()*15
        this.colour='hsl('+hue+',100%,50%)'
    }
    update(){
        this.x+=this.speedX
        this.y+=this.speedY
       if(this.x+this.size>canvas.width){
        this.speedX=-Math.random()*2
       }
       if(this.x-this.size<0){
        this.speedX=Math.random()*2
       }
      if(this.y-this.size<0){
        this.speedY=Math.random()*2
      }
       if(this.y+this.size>canvas.height){
        this.speedY=-Math.random()*2
       }
       if((mousemove.x+this.x<50&&mousemove.x-this.x>-50)&&(mousemove.y+this.y<50&&mousemove.y-this.y>-50)){
        if(this.size<50){
            this.size+=2
        }
       }
       else{
        if(this.size>3){
            this.size-=2
        }
       }
    }
    drawCircle(){
        ctx.beginPath()
        ctx.fillStyle=this.colour
        ctx.arc(this.x,this.y,this.size,0,2*(Math.PI))
        ctx.fill()
    }
}

// function init(){for(let i=1;i<=100;i++){
//     const particle=new Particle()
// particleArray.push(particle)
// }
// }
// init()
function handle(){
    for(let i=0;i<particleArray.length;i++){
        particleArray[i].update()
        particleArray[i].drawCircle()
        //for constellation effect
        for(let j=i;j<particleArray.length;j++){
            let dx=particleArray[i].x-particleArray[j].x
            let dy=particleArray[i].y-particleArray[j].y
            let distance=Math.sqrt(dx*dx+dy*dy)
            if(distance<50){
                ctx.beginPath()
                ctx.lineWidth=0.5
                ctx.strokeStyle=particleArray[i].colour
                ctx.moveTo(particleArray[i].x,particleArray[i].y)
                ctx.lineTo(particleArray[j].x,particleArray[j].y)
                ctx.stroke()
            }
        }
        
        // if(particleArray[i].size<=0.3){
        //     particleArray.splice(i,1)
        // i--
        // }
    }
}
function animate(){
   ctx.clearRect(0,0,canvas.width,canvas.height) //it clear the previous graphics of given dimension
 //ctx.fillStyle='rgba(0,0,0,0.02)'
 //ctx.fillRect(0,0,canvas.width,canvas.height)
   //ctx.fill()
    handle()
hue++
    requestAnimationFrame(animate) //it is act like recursion ,simply it takes function and run in browser again and again
}

animate()