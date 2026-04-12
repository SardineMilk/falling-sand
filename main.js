import { PARTICLES } from "./particles.js";
import { compile } from "./compiler.js";


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const rows = canvas.height;
const cols = canvas.width;


const imageData = ctx.createImageData(cols, rows);
const data = imageData.data;


function setPixel(i, r, g, b, a) {
    i = i*4;
    data[i]     = r;
    data[i + 1] = g;
    data[i + 2] = b;
    data[i + 3] = a;
}

function setAlpha(i, a) {
    i = i*4;
    data[i + 3] = a;
}


function get_index(x, y) {
  return x + y * cols;
}


let grid = [];
for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
        grid[x + (y*cols)] = 0;
    }
}


const values = compile(PARTICLES, cols, rows);
const rules = values.rules;
const colours = values.colours;


// TODO
// Create a buffer grid 
// Move values into it


export function querySimulation(state, index) {

return grid;
}    


function loop() {
    grid[get_index(Math.round(Math.random()*cols),rows-1)] = 1;
    grid[get_index(Math.round(Math.random()*cols),rows-1)] = 2;


    let state = grid;

    //(let y = rows-2; y >= 0; y--) 
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            const index = get_index(x, y);

            //grid = querySimulation(grid, i);

            switch (state[index]) {
                case 0:
                    break;

                case 1:
                    if (((state[index+(-400)]==0)||(state[index+(-400)]==2))&&((state[index+(-400)]!=1))) {let temp = grid[index+(-400)]; grid[index+(-400)] = grid[index]; grid[index] = temp; break;}
                    if (((state[index+(-401)]==0)||(state[index+(-401)]==2))&&((state[index+(-401)]!=1))) {let temp = grid[index+(-401)]; grid[index+(-401)] = grid[index]; grid[index] = temp; break;}
                    if (((state[index+(-399)]==0)||(state[index+(-399)]==2))&&((state[index+(-399)]!=1))) {let temp = grid[index+(-399)]; grid[index+(-399)] = grid[index]; grid[index] = temp; break;}
                    break;

                case 2:
                    if (((state[index+(-400)]==0))&&((state[index+(-400)]!=1)&&(state[index+(-400)]!=2))) {let temp = grid[index+(-400)]; grid[index+(-400)] = grid[index]; grid[index] = temp;}
                    if (((state[index+(-401)]==0))&&((state[index+(-401)]!=1)&&(state[index+(-401)]!=2))) {let temp = grid[index+(-401)]; grid[index+(-401)] = grid[index]; grid[index] = temp;}
                    if (((state[index+(-1)]==0))&&((state[index+(-1)]!=1)&&(state[index+(-1)]!=2))) {let temp = grid[index+(-1)]; grid[index+(-1)] = grid[index]; grid[index] = temp;}
                    if (((state[index+(-399)]==0))&&((state[index+(-399)]!=1)&&(state[index+(-399)]!=2))) {let temp = grid[index+(-399)]; grid[index+(-399)] = grid[index]; grid[index] = temp;}
                    if (((state[index+(1)]==0))&&((state[index+(1)]!=1)&&(state[index+(1)]!=2))) {let temp = grid[index+(1)]; grid[index+(1)] = grid[index]; grid[index] = temp;}
                    break;

                default:
                    break;
            }
                        /*
            if (grid[i]== 1) {
                const dir = (2*(Math.round(Math.random())))-1; 
                const below = get_index(x, y+1)

                if (grid[below] == 0) {
                    grid[i] = 0;
                    grid[below] = 1;
                }
                else if (grid[below+dir] == 0) {
                    grid[i] = 0;
                    grid[below+dir] = 1;
                }
                else if (grid[below-dir] == 0) {
                    grid[i] = 0;
                    grid[below-dir] = 1;
                }   
            }
            */
        }
    }


    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            let i = get_index(x, y);
            let j = get_index(x, (rows-1)-y);

            switch (grid[i]) {
                case 0:
                    setPixel(j, 0, 0, 0, 0);
                    break;
                case 1:
                    setPixel(j, 205, 170, 109, 255);
                    break;
                case 2:
                    setPixel(j, 15, 94, 156, 255);
                    break;
            }
        }
    }
    ctx.putImageData(imageData, 0, 0);

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);