import { context, contextScore, canvas, canvas2, gameHeight, gameWidth } from "./constants.js";
import { Ball, randomColor } from "./ball.js";
import { Player } from "./player.js";

function buildBoard(theField){
    for (let i = 0; i < theField.length; i++) { //check to randomize new color so we dont get 3 in a row at start
        //console.log("i: " + i + " first check" + "colorNumber: " + theField[i].getColor());
        if( i > 1 && //check index -1 and -2
            theField[i].colorNumber === theField[i - 1].colorNumber   && 
            theField[i].colorNumber === theField[i - 2].colorNumber){
                while(theField[i].colorNumber === theField[i - 2].colorNumber){ //keep generating random color until we dont get the same
                    theField[i].setColor(randomColor());
                    //console.log("in IF- statement i: " + i + " first check" + "colorNumber: " + theField[i].getColor());
                }
        }
        if( i >= (gameHeight * 2) &&    //check on left side of current
            theField[i].colorNumber === theField[i - gameHeight].colorNumber &&
            theField[i].colorNumber === theField[i - (gameHeight * 2)].colorNumber){

            while(  theField[i].colorNumber === theField[i - gameHeight].colorNumber || //keep generating random color until we dont get the same
                    theField[i].colorNumber === theField[i - 2].colorNumber){
                theField[i].setColor(randomColor());
                //console.log("in IF-statement i: " + i + " second check" + "colorNumber: " + theField[i].getColor());
            }
        }
    }
}

export class theBoard{
    constructor(){
        this.field = [];    //array with the balls
        this.glowing = [];
        this.animating = [];

        this.removeArray = [];
        this.removeArrayCounter = 0;

        this.deltaTime = 0;
        this.lastTime = Date.now();
        this.player = new Player(50, 50);
        for (let i = 0; i < gameWidth; i++) {   //creates the board with balls
            for (let j = 0; j < gameHeight; j++) {
                this.field.push(new Ball(i * 50 * 2 + 50, j * 50 * 2 + 50));
            }
        }
        buildBoard(this.field);

        /*console.log("size " + this.field.length);
        for (let i = 0; i < this.field.length; i++) {
            console.log("X " + this.field[i].x);
            console.log("Y " + this.field[i].y);
        }*/
    }

    start(){
        run(this);
    }

    //check for three in a row or more
    checkBoard(){
        for(let i = this.field.length; i > 0; i--){ //checks from bottom to top
            this.removeArrayCounter = 0;    //needs to be reset cause the functions are recursive
            this.checkY(i);
        }

        for(let i = this.field.length - 1; i > -1; i--){    //checks from right to left
            this.removeArrayCounter = 0;    //needs to be rese t cause the functions are recursive
            this.checkX(i);
        }

        this.player.addscore(this.removeArray.length * 100);

        for(let j = 0; j < this.removeArray.length; j++){  
            this.removeArray[j].setColor(randomColor());
        }
        this.removeArray = [];
    }

    checkX(elementNumber){
        if(this.field[elementNumber - 5] === undefined){    //if at the left edge
            return;
        }
        else if(this.field[elementNumber].getColorNumber() === 
                this.field[elementNumber - 5].getColorNumber()){
                this.removeArrayCounter++;
                this.checkX(elementNumber - 5);    //recursive
                if(this.removeArrayCounter >= 2){
                    this.removeArray.push(this.field[elementNumber - 5]);
                }
        }
        else{
            return;
        }
    }

    checkY(elementNumber){
        if((elementNumber % gameHeight) === 0){ //if at top, maybe have to redo to make compatible with bigger maps
            return;
        }
        else if(this.field[elementNumber].getColorNumber() === 
                this.field[elementNumber - 1].getColorNumber()){
                this.removeArrayCounter++;
                this.checkY(elementNumber - 1);    //recursive
                if(this.removeArrayCounter >= 2){
                    this.removeArray.push(this.field[elementNumber - 1]);
                }
        }
        else{
            return;
        }
    }

    draw(){

        context.fillStyle = 'rgb(255, 255, 255)';           //repaint in white
        context.fillRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < this.field.length; i++) {       //draw all balls
            this.field[i].draw();
           /* context.beginPath();
            context.fillStyle = this.field[i].getColor();
            context.arc(this.field[i].x * 50 * 2 + 50, this.field[i].y * 50 * 2 + 50, radius, 0, 2 * Math.PI);
            context.fill();*/

            context.font = "20px Comic Sans MS";  //show numbers on balls, keep this
            context.fillStyle = "white";
            context.textAlign = "center";
            context.fillText(i, this.field[i].x, this.field[i].y);
        }
        this.player.draw();
        drawScore(this.player.getScore());
    }
}

export let board = new theBoard();

function drawScore(inScore){ 
    contextScore.fillStyle = 'rgb(255, 255, 255)';
    contextScore.fillRect(0, 0, canvas.width, canvas.height);

    contextScore.font = "20px Comic Sans MS";
    contextScore.fillStyle = "black";
    contextScore.textAlign = "center";
    contextScore.fillText("Score " + inScore, canvas2.width/2, canvas2.height/2 + 5);
}

function run(){
    /*let currentTime = Date.now();
    board.deltaTime = (currentTime - board.lastTime) / 1000;
    board.lastTime = currentTime;*/
    //board.checkBoard();
    board.draw();
    requestAnimationFrame(run);
}