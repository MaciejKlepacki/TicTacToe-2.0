'use strict'

// defining arrays
const cells = [];
let game = [];
let freeCells = [];
let whereX = [];
let whereO = [];
let win = false;

// getting elements by ID
for (let i = 0; i <= 8; i++) {
    const cell = document.getElementById(`child_${i}`);
    cells.push(cell);
}
const reset = document.querySelector('#restartButton')
const h1 = document.querySelector('h1')


//Restarting
const restarting = function () {
    cells.forEach(function(cell) {
        cell.innerHTML ='';
        cell.style.color = 'black';
    });
    game = new Array(9).fill(false);
    whereX = [];
    whereO = [];
    freeCells = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    win = false;
    h1.innerHTML = 'Tic Tac Toe'
}

const replay = function () {
    const i = Math.floor(Math.random() * freeCells.length);
    const x = freeCells[i];
    freeCells.splice(i, 1)
    cells[x].innerHTML = 'O'
    game[x] = true;
    whereO.push(x);
    whereO.sort();
    for (const winCombo of winning) {
        if (winCombo.every((element) => whereO.includes(element))) {
            cells[winCombo[0]].style.color = 'yellow';
            cells[winCombo[1]].style.color = 'yellow';
            cells[winCombo[2]].style.color = 'yellow';
            freeCells = [];
            game = new Array(9).fill(true);
            win = true;
            h1.innerHTML = 'You have lost! 😭'
        }
    }
}

restarting();

// EvenetListeners
reset.addEventListener('click', restarting)

cells.forEach(cell => {
    cell.addEventListener('click', function () {
        const i = cells.indexOf(cell);
        if (freeCells.length != 0) {
            if (!game[i]) {
                cell.innerHTML = 'X'
                game[i] = true;
                whereX.push(i)
                whereX.sort();
                const x = freeCells.indexOf(i);
                freeCells.splice(x, 1);
                checkTheWin();
                if (win == false) replay();
            }
        }
    })
})
const winning = [[0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6]]

const newFeature = function() {
    console.log('welcome');
}

newFeature();
const checkTheWin = function () {
    for (const winCombo of winning) {
        if (winCombo.every((element) => whereX.includes(element))) {
            cells[winCombo[0]].style.color = 'yellow';
            cells[winCombo[1]].style.color = 'yellow';
            cells[winCombo[2]].style.color = 'yellow';
            freeCells = [];
            game = new Array(9).fill(true);
            win = true;
            h1.innerHTML = 'You won! 😁'
            break;
        } 
        if (freeCells.length == 0){
            h1.innerHTML = `That's a draw. 🫤`
            win = true;
        } 
    }
};