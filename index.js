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


function index(x, y) {
  return x + y * cols;
}

const grid = [];
for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
        //grid[i + (j*400)] = Math.round(Math.random());
        grid[x + (y*cols)] = (y < (rows/2)) && Math.round(Math.random());
    }
}
for (let i = 0; i < rows*cols; i++) {
    setPixel(i, 205, 170, 109, 255);
}

function loop() {
    grid[index(cols/2,0)] = 1;
    grid[index(cols/2+1,0)] = 1;

    for (let y = rows-2; y >= 0; y--) {
        for (let x = 0; x < cols; x++) {
            const i = index(x, y);
            if (grid[i]== 1) {
                const dir = (2*(x%2))-1; 
                const below = index(x, y+1)
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
        }
    }


    for (let i = 0; i < rows*cols; i++) {
        setAlpha(i, grid[i]*255);
    }
    ctx.putImageData(imageData, 0, 0);

    requestAnimationFrame(loop);
}

requestAnimationFrame(loop);