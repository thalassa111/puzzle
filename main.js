import { board } from "./playboard.js";
import { keyInput } from  "./player.js";

window.addEventListener('keydown', keyInput);

board.start();