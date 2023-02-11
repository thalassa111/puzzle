import { colors, context } from "./constants.js";

export function randomColor(){
    return Math.floor(Math.random() * colors.length);
}

export class Ball{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.oldX;
        this.oldY;

        this.colorNumber = randomColor();    //a random color number
        this.tmpColorNumber;
        
        this.opacity = 1.0;
        this.swapOpacity = true;
        this.glowing = false;

        this.radius = 48;
        this.swapSize = true;
        this.animating = false;

        this.animateSwap = false;
        this.goalValue = 0;
        this.isXaxis = true;
    }
    getX(){return this.x;}
    getY(){return this.y;}
    getColor(){     //returns a "string"
        return colors[this.colorNumber];
    }
    getColorNumber(){
        return this.colorNumber;
    }
    setColor(inColor){
        this.colorNumber = inColor;
    }
    onOpacity(){
        let color = this.getColor[this.colorNumber];
    }
    setGlowing(inGlow){
        this.glowing = inGlow;
    }
    setAnimate(inAnimate){
        this.animating = inAnimate;
        console.log("setanimate");
    }
    setAnimateSwap(inAnimateSwap, inGoalValue, inColorNumber, inIsXaxis){
        this.animateSwap = inAnimateSwap;
        this.goalValue = inGoalValue;
        this.tmpColorNumber = inColorNumber;
        this.isXaxis = inIsXaxis;
        this.oldX = this.x; //save old position so the array element is not changed, only color
        this.oldY = this.y;
        console.log("inGoalValue: " + inGoalValue + "  this.oldX: " + this.oldX + "  this.oldY: " + this.oldY);
    }
    animateSwapX(){
        if(this.isXaxis){
            if(this.x < this.goalValue){
                this.x += 2;
            }
            else{
                this.x -= 2;
            }
            if(this.x === this.goalValue){
                this.animateSwap = false;
                this.goalValue = 0;
                this.x = this.oldX;     //put back old values
                this.y = this.oldY;
                this.colorNumber = this.tmpColorNumber;
            }
        }
        else{
            if(this.y < this.goalValue){
                this.y += 2;
            }
            else{
                this.y -= 2;
            }
            if(this.y === this.goalValue){
                this.animateSwap = false;
                this.goalValue = 0;
                this.y = this.oldX;     //put back old values
                this.y = this.oldY;
                this.colorNumber = this.tmpColorNumber;
            }
        }
    }
    animate(){
        if(this.radius <= 48 && this.swapSize){    //to make it animate
            this.radius -= 0.08;
            if(this.radius <= 40){
                this.swapSize = false;
            }
        }
        else{
            this.radius += 0.08;
            if(this.radius >= 48){
                this.swapSize = true;
            }
        }
    }
    isAdjacent(inCompare){
        //console.log("distanceX: " + Math.abs(this.x - inCompare.getX()));
        //console.log("distanceY: " + Math.abs(this.y - inCompare.getY()));
        let distance = Math.sqrt((inCompare.getX() - this.x) ** 2 + (inCompare.getY() - this.y) ** 2);
        if( distance <= 100){
            return true;
            }
        else{
            return false;
        }
    }
    glow(){
        //console.log("glow");
        if(this.opacity <= 1.0 && this.swapOpacity){    //to make it "glow"
            this.opacity -= 0.005;
            if(this.opacity <= 0.4){
                this.swapOpacity = false;
            }
        }
        else{
            this.opacity +=0.005;
            if(this.opacity >= 1.0){
                this.swapOpacity = true;
            }
        }
    }

    draw(){
        let tmpColorString = this.getColor();
        if(this.glowing){
            this.glow();
            tmpColorString = tmpColorString.slice(0, 15) + this.opacity.toString() + ")";
        }
        if(this.animating){
            this.animate();
        }
        if(this.animateSwap){
            this.animateSwapX();
        }
        //console.log("newString " + resultString);
        //console.log("opacity: " + this.opacity);
        //this.changeSize();
        context.beginPath();
        context.fillStyle = tmpColorString;//this.getColor();//resultString;//"rgba(255, 0, 0, 1.0)";
        context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        context.fill();
    }
}

