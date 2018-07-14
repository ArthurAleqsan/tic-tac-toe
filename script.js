let arr_X = [];
let arr_O = [];
const board = [];
let val;
let indicator = false;
let turn = true;
let inputVal;
let winComb = [];

function whoStart(player) {
    inputVal = document.querySelector('#num').value;
    if(typeof inputVal !== 'number' && inputVal < 3 || inputVal > 50) {
        const msgContainer = document.querySelector('.err-msg');
        msgContainer.style.display = 'block';
        return
    }
    _paintBoard();
    if (player.id === 'computer') {
        aiPlayer();
    }else {
        turn = !turn;
        if(turn) aiPlayer();
    }
    closeModal();
}

function _paintBoard() {
    const container  = document.querySelector('#container');
    createWinCombs();
    closeModal();
    container.style.display = 'flex';

    for(let i = 1; i < inputVal * inputVal + 1; i++) {

        board.push(`${i}`);
        const item = document.createElement('div');
        container.appendChild(item);
        item.setAttribute('id', `${i}`);
        item.classList.add('main-container-item');
        item.style.width = `${100 / inputVal}%`;
        item.style.height = `${100 / inputVal}%`;
        item.addEventListener('click', () => {
            addChar(item);
        });

    }
}
function aiPlayer() {
    const boardRandomElem = board[Math.floor(Math.random() * board.length )];
    const item = document.getElementById(boardRandomElem);
    if(!board.length) return;
    addChar(item);
}
function addChar(item) {

    const lineNum = Math.ceil(+item.id / inputVal);
    if (!board.includes(item.id)) return;
    if((arr_O.length + arr_X.length) % 2 === 0) {
        val = 'X';

        arr_X.push(+item.id);
        board.splice(board.indexOf(item.id),1);
        if(indicator) return;
        item.innerHTML = val;
        arr_X.sort((a, b) => a - b );
        arr_X = arr_X.map(elem => +elem);

        _check(arr_X, val);
        turn = !turn;
        if(turn) aiPlayer();

    }else {
        val = 'O';
        arr_O.push(+item.id);
        board.splice(board.indexOf(item.id),1);
        if(indicator) return;
        item.innerHTML = val;
        _check(arr_O, val);
        turn = !turn;
        if(turn) aiPlayer();

    }
}
function createWinCombs() {
    inputVal = +inputVal;
    const horizontalCombs = [];
    const verticalCombs = [];
    const a_to_z = new Array();
    const z_to_a = [];
    // Horizontal
    for(let i = 0; i < inputVal; i++) {
        horizontalCombs.push(new Array());
        for(let row = 1; row < inputVal + 1; row++) {
            horizontalCombs[i].push(i * inputVal + row)
        }
    }

    //vertical
    for(let i = 0; i < inputVal; i ++) {
        verticalCombs.push(new Array());
        for(let line = 1; line < inputVal * inputVal; line += inputVal) {
            verticalCombs[i].push(line + i);
        }
    }

    //diagonal A to Z
    for(let i = 1; i < inputVal * inputVal + 1; i += inputVal + 1 ) {
        a_to_z.push(i);
    }

    //diagonal Z to A
    for( let i = inputVal; i < inputVal * inputVal; i += inputVal - 1) {
        z_to_a.push(i);
    }

    winComb = winComb.concat(horizontalCombs);
    winComb = winComb.concat(verticalCombs);
    winComb.push(a_to_z);
    winComb.push(z_to_a);

}
function _check(targetArr , player) {

    for(let i = 0; i < winComb.length; i++) {
        if(winComb[i].every(elem => targetArr.indexOf(elem) > -1)) {
            indicator = true;
            _win(player);
        }
    }

}
function _win(winner) {

    alert(winner + ' is win');
    location.reload();
}
function closeModal() {
    const modal = document.querySelector('#myModal');
    modal.style.display = "none";
}
