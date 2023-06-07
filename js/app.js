


var currentArray;
var currentlySorting = false;
const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');




function drawLine(begin, end, stroke = 'black', width = 1) {
    if (stroke !== undefined) {
        ctx.strokeStyle = stroke;
    }

    if (width !== undefined) {
        ctx.lineWidth = width;
    }

    ctx.beginPath();
    ctx.moveTo(...begin);
    ctx.lineTo(...end);
    ctx.stroke();
}

function drawList(array, isSorted = false, currentMovingElement) {
    var canvas_width = ctx.canvas.clientWidth;
    var canvas_height = ctx.canvas.clientHeight;
    
    const step = canvas_width / (array.length + 1);
    const bottomStep = 3;
    
    var currentY = canvas_height - bottomStep
    var currentX = step;

    var currentColor;
    for (var i = 0; i < array.length; i++) {
        const element = array[i];
        currentColor = isSorted || i !== currentMovingElement ? "green" : "red";
        drawLine([currentX, currentY], [currentX, currentY - element], currentColor, 5);
        currentX += step;
    }

    currentArray = array;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

async function bubbleSort(array) {
    for (var step = 0; step < array.length; step++) {
        for (var i = 0; i < array.length - step; i++) {
            if (array[i] > array[i+1]) {
                if (!currentlySorting) {
                    return;
                }
                var el = array[i];
                array[i] = array[i+1];
                array[i+1] = el;
                
                clearCanvas();
                drawList(array, false, i+1);
                await delay(1); // Задержка в 0.05 сек
            }
        }
    }
}

async function insertionSort(array) {
    for (let step = 1; step < array.length; step++) {
      let i = step;
      while (i > 0 && array[i - 1] > array[i]) {
        if (!currentlySorting) {
            return;
        }
        let temp = array[i];
        array[i] = array[i - 1];
        array[i - 1] = temp;
        i--;
        clearCanvas();
        drawList(array, false, i);
        await delay(1); // Задержка в 0.05 сек
      }
    }
}



function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function startSorting(sortCallback) {
    if (!currentlySorting) {
        currentlySorting = true;
        await sortCallback(currentArray);
        currentlySorting = false;
        drawList(currentArray, true)
    }
}

function generateRandomList(length, min, max) {
    var list = [];
    for (var i = 0; i < length; i++) {
        var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
        list.push(randomNumber);
    }
    return list;
}

function generateNewList() {
    currentlySorting = false;
    var array = generateRandomList(150, 5, 394);
    currentArray = array;
    clearCanvas();
    drawList(array);
}

function stopSorting() {
    currentlySorting = false;
    clearCanvas();
    drawList(currentArray);
}