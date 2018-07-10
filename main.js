const arr_X = [];
const arr_O = [];
const board = ["0","1","2","3","4","5","6","7","8"];
const winComb = [
  ["0","1","2"],
  ["3","4","5"],
  ["6","7","8"],
  ["0","3","6"],
  ["1","4","7"],
  ["2","5","8"],
  ["0","4","8"],
  ["2","4","6"]
];
let val;
let indicator = false;
let turn = true;


function whoStart(player) {
    // debugger
    if (player.id === 'computer') {
        aiPlayer();
    }else {
        turn = !turn;
        if(turn) aiPlayer();
    }
    closeModal();
}
function aiPlayer() {
    const boardRandomElem = board[Math.floor(Math.random() * board.length )];
    const item = document.getElementById(boardRandomElem);
    if(!board.length) return;
    addChar(item);
}
function addChar(item) {
    if (!board.includes(item.id)) return;
    if((arr_O.length + arr_X.length) % 2 === 0) {
        val = 'X';
        arr_X.push(item.id);
        board.splice(board.indexOf(item.id),1);
        if(indicator) return;
        item.innerHTML = val;
        _check(arr_X, val);
        turn = !turn;
        if(turn) aiPlayer();

    }else {
        val = 'O';
        arr_O.push(item.id);
        board.splice(board.indexOf(item.id),1);

        if(indicator) return;
        item.innerHTML = val;
        _check(arr_O, val);
        turn = !turn;
        if(turn) aiPlayer();
    }
}
function _check(targetArr, player) {
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