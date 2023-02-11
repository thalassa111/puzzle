export const colors = [ "rgba(0, 0, 200, 1)",
                        "rgba(200, 0, 0, 1)", 
                        "rgba(0, 128, 0, 1)"];

export let canvas = document.getElementById('canvas');
export let context = canvas.getContext('2d');

export let canvas2 = document.getElementById('score');
export let contextScore = canvas2.getContext('2d');

export const width = canvas.width;
export const height = canvas.height;

export const gameWidth = 7;
export const gameHeight = 5;