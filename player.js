import { Ball } from "./ball.js";
import { context, width, height, gameHeight } from "./constants.js";
import { board } from "./playboard.js";

export class Player extends Ball{
    constructor(x, y){
        super(x, y);
        this.color = "rgba(255, 255, 255, 1.0)";
        this.marked = false;
        this.score = 0;
    }
    getColor(){
        return this.color;
    }
    addscore(inScore){
        this.score += inScore;
    }
    getScore(){
        return this.score;
    }
    addPositionX(inPos){
        let newPos = this.x + inPos;
        if(newPos < 0 || newPos > width){   //cannot go out of bounds
            return;
        }
        this.x += inPos;
    }
    addPositionY(inPos){
        let newPos = this.y + inPos;
        if(newPos < 0 || newPos > height){  //cannot go out of bounds
            return;
        }
        this.y += inPos;
    }
    getPositionX(){return this.x;}
    getPositionY(){return this.y;}
    draw(){
        context.beginPath();    //draw player
        context.fillStyle = this.getColor();
        //console.log("color player: " + this.getColor());
        context.arc(this.x, this.y, 10, 0, 2 * Math.PI);
        context.fill();
    }
}

export function keyInput(event){
    if(event.repeat){
        console.log("repeatevent");
    return;
    }

    if(this.marked){
        let playerIndex = findPlayerIndex();
        switch(event.key){
            case "s":
                setAnimateSwap(playerIndex, playerIndex + 1);
                this.marked = false;
            break;
            case "w":
                setAnimateSwap(playerIndex, playerIndex - 1);
                this.marked = false;
            break;
            case "a":
                this.marked = false;
                setAnimateSwap(playerIndex, playerIndex - gameHeight);
            break;
            case "d":
                setAnimateSwap(playerIndex, playerIndex + gameHeight);
                this.marked = false;
            break;
        }
        
    }
    else{
        switch(event.key){
            case "s":
                board.player.addPositionY(100);
            break;
            case "w":
                board.player.addPositionY(-100);
                //console.log("up");
            break;
            case "a":
                board.player.addPositionX(-100);
                //console.log("left");
            break;
            case "d":
                board.player.addPositionX(100);
                //console.log("right");
            break;
            case " ":
                console.log("space");
                this.marked = true;     //for upper part of this function to work instead
                markAdjacent();     //will make adjacent balls "glow"
            break;
            case "z":
                board.checkBoard();
                board.player.addscore(-100);
            break;
        }
        board.player.addscore(-50);
    }
}

function setAnimateSwap(playerIndex, checkIndex){
/*     console.log("playerX: " + board.field[playerIndex].getX() + "   checkX: " + board.field[checkIndex].getX());
    console.log("playerY: " + board.field[playerIndex].getY() + "   checkY: " + board.field[checkIndex].getY()); */
    if(board.field[playerIndex].getX() === board.field[checkIndex].getX()){
        board.field[playerIndex].setAnimateSwap(true, board.field[checkIndex].getY(), board.field[checkIndex].getColorNumber(), false);
        board.field[checkIndex].setAnimateSwap(true, board.field[playerIndex].getY(), board.field[playerIndex].getColorNumber(), false);
        console.log("setAnimateSwapX");
        //swapColorIndex(playerIndex, checkIndex);
    }
    else{
        board.field[playerIndex].setAnimateSwap(true, board.field[checkIndex].getX(), board.field[checkIndex].getColorNumber(), true);
        board.field[checkIndex].setAnimateSwap(true, board.field[playerIndex].getX(), board.field[playerIndex].getColorNumber(), true);
        console.log("setAnimateSwapY");
        //swapColorIndex(playerIndex, checkIndex);
    }
    for(let i = 0; i < board.glowing.length; i++){  //turn off the glow
        board.glowing[i].setGlowing(false);
    }
    //console.log("setAnimateSwap");
}

function markAdjacent(){
    let playerX = board.player.getPositionX();
    let playerY = board.player.getPositionY();
    for(let i = 0; i < board.field.length; i++){
        if((board.field[i].getX()) === playerX && (board.field[i].getY()) === playerY){

            if( board.field[i - gameHeight] !== undefined){
                board.field[i - gameHeight].setGlowing(true);
                //board.field[i - gameHeight].setAnimate(true);
                board.glowing.push(board.field[i - gameHeight]);
            }
            if(board.field[i  + gameHeight] !== undefined){
                board.field[i + gameHeight].setGlowing(true);
                board.glowing.push(board.field[i + gameHeight]);
            }
            if(board.field[i].isAdjacent(board.field[i - 1])){
                board.field[i - 1].setGlowing(true);
                board.glowing.push(board.field[i - 1]);
            }
            if(board.field[i].isAdjacent(board.field[i + 1])){
                board.field[i + 1].setGlowing(true);
                board.glowing.push(board.field[i + 1]);
            }
        }
    }
}

function findPlayerIndex(){  //returns the index of player position
    let playerX = board.player.getPositionX();
    let playerY = board.player.getPositionY();
    for(let i = 0; i < board.field.length; i++){
        if((board.field[i].getX()) === playerX && (board.field[i].getY()) === playerY){
            return i;
        }
    }
}

function swapColorIndex(playerIndex, checkIndex){
    if(board.field[checkIndex] === undefined){
        return;
    }
    let tmpColor = board.field[playerIndex].getColorNumber();
    board.field[playerIndex].setColor(board.field[checkIndex].getColorNumber());
    board.field[checkIndex].setColor(tmpColor);
    //board.field[playerIndex].setGlowing(false);
    //board.field[checkIndex].setGlowing(false);
    for(let i = 0; i < board.glowing.length; i++){
        board.glowing[i].setGlowing(false);
    }
}

//keep this function, can be nice for debugging
/*function findBall(){
    let playerX = board.player.getPositionX();
    let playerY = board.player.getPositionY();
    console.log("x: " + playerX + "y: " + playerY);
    for(let i = 0; i < board.field.length; i++){
        console.log("2x: " + board.field[i].getX() + " 2y: " + board.field[i].getY());
        if((board.field[i].getX()) === playerX && (board.field[i].getY()) === playerY){
            //board.field[i].setColor(1);
            //board.field[i].setGlowing(true);
            board.marked.push(board.field[i]);
            if(board.marked.length === 2){
                swapColor(board.marked[0], board.marked[1]);
                board.marked = [];
            }

            //console.log("findball2");
            //console.log("marked " + board.marked.length);
            return;
        }
    }
}*/

function swapColor(inBall1, inBall2){
    if(inBall2 === undefined){
        return;
    }

    console.log("swap");
    let tmpColor = inBall1.getColorNumber();     //int
    inBall1.setColor(inBall2.getColorNumber());
    inBall2.setColor(tmpColor);
    inBall1.setGlowing(false);
    inBall2.setGlowing(false);
}